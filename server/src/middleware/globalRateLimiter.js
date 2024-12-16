// middleware/globalRateLimiter.js
const GlobalRateLimit = require('../models/GlobalRateLimit');

const API_LIMIT = 50;

const globalRateLimiter = async (req, res, next) => {
  try {
    const now = new Date();

    const rateLimit = await GlobalRateLimit.findOneAndUpdate(
      { _id: 'global' },
      [
        {
          $set: {
            count: {
              $cond: [
                { $lte: ['$resetAt', now] },
                1, // Reset count to 1
                { $add: ['$count', 1] }, // Increment count
              ],
            },
            resetAt: {
              $cond: [
                { $lte: ['$resetAt', now] },
                new Date(
                  now.getFullYear(),
                  now.getMonth(),
                  now.getDate() + 1,
                  0, 0, 0, 0
                ),
                '$resetAt',
              ],
            },
          },
        },
      ],
      {
        new: true,
        upsert: true,
      }
    );

    if (rateLimit.count > API_LIMIT) {
      const timeUntilReset = rateLimit.resetAt - now;
      const hours = Math.floor((timeUntilReset / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((timeUntilReset / (1000 * 60)) % 60);
      const seconds = Math.floor((timeUntilReset / 1000) % 60);

      return res.status(429).json({
        error: 'API request limit reached',
        retryAfter: `${hours}h ${minutes}m ${seconds}s`,
      });
    }

    next();
  } catch (error) {
    console.error('Global Rate Limiter Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = globalRateLimiter;
