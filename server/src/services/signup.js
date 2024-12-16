const User = require("../models/user");
const bcrypt = require("bcrypt");

async function createUser(userData) {
    const { name, email, password } = userData;
  
    // Check for existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error("Email already in use");
    }
  
    const hashedPassword = await bcrypt.hash(password, 10);
    const createdUser = new User({
      name,
      email,
      password: hashedPassword,
      cities: [],
    });
  
    const savedUser = await createdUser.save();
    return savedUser;
  }
  

module.exports = { createUser };
