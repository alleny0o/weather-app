const userService = require('../services/signup');

async function createUser(req, res) {
    try {
        const { name, email, password } = req.body;

        // Basic validation
        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Delegate to the service
        const user = await userService.createUser(req.body);
        res.status(201).json({ user, message: "User created successfully" });
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: error.message });
    }
}


module.exports = { createUser };