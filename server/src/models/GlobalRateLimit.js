// models/GlobalRateLimit.js
const mongoose = require('mongoose');

const globalRateLimitSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: 'global', // Singleton document
  },
  count: {
    type: Number,
    default: 0,
  },
  resetAt: {
    type: Date,
    default: () => {
      const now = new Date();
      return new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() + 1, // Next midnight
        0, 0, 0, 0
      );
    },
  },
});

// Ensure only one document exists
globalRateLimitSchema.statics.getSingleton = function () {
  return this.findById('global');
};

module.exports = mongoose.model('GlobalRateLimit', globalRateLimitSchema);
