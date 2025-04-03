// authController.js
const { authenticate } = require('../services/authService');

exports.login = (req, res) => {
    const { email, password } = req.body;
    const user = authenticate(email, password); // Your authentication logic

    if (user) {
        // Here you may create a session or token as needed
        return res.json({ id: user.id }); // Send back necessary user information
    } else {
        return res.status(401).send('Invalid credentials'); // Inform the user about the failed login
    }
};