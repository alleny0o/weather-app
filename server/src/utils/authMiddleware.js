const jwt = require('jsonwebtoken');
const User = require('../models/user'); // Import the User model

function authenticateToken(req, res, next) {
  const authHeader = req.header("Authorization");

  // Check if Authorization header is missing
  if (!authHeader) {
    console.error('Authorization header is missing.');
    return res.status(401).json({ message: "Unauthorized" });
  }

  // Check if Authorization header is malformed
  const [bearer, token] = authHeader.split(" ");
  if (bearer !== "Bearer" || !token) {
    console.error('Malformed Authorization header.');
    return res.status(401).json({ message: "Unauthorized" });
  }

  // Verify the token
  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) {
      console.error('Token verification failed:', err.message);
      return res.status(403).json({ message: "Forbidden" });
    }

    try {
      // Fetch the user from the database using the ID from the token
      const user = await User.findById(decoded.id);
      if (!user) {
        console.error('User not found.');
        return res.status(404).json({ message: "User not found." });
      }

      // Attach the user object to the request
      req.user = user;
      next();
    } catch (dbError) {
      console.error('Database error:', dbError);
      res.status(500).json({ message: "Internal server error." });
    }
  });
}

module.exports = { authenticateToken };
