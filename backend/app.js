// index.js (Combined Express + Stripe + Nodemailer + User Authentication + Comments)
require('dotenv').config(); // Load environment variables
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const session = require('express-session');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const nodemailer = require('nodemailer');
const fs = require('fs'); // Add fs for file operations
const path = require('path'); // For path handling
const authRoutes = require('./routes/authRoutes'); // Import your authentication routes

const app = express();
const PORT = process.env.PORT || 3000;

// Mock database for users (this should be replaced with real database calls)
const users = {
    'testuser@example.com': {  // Key is the email
        username: 'anamarieranoco@yahoo.com',
        password: 'anaquinn' // Use bcrypt to hash actual passwords
    }
};

// CORS configuration
app.use(cors({
    origin: 'http://127.0.0.1:5501/index.html', // frontend URL
    credentials: true // allow sending cookies
}));

// Middleware
app.use(bodyParser.json()); // Use JSON for API
app.use(bodyParser.urlencoded({ extended: true }));

// Session Middleware
// Setup session middleware if needed
app.use(session({
    secret: process.env.SESSION_SECRET, // Use environment variable for secret
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
    }
}));
// Use authentication routes
app.use('/', authRoutes);

// Comments functionality (Load and save comments)
const dataFilePath = path.join(__dirname, 'comments.json'); // Ensure the path is correct

function loadComments() {
    if (fs.existsSync(dataFilePath)) {
        const data = fs.readFileSync(dataFilePath);
        return JSON.parse(data);
    }
    return [];
}

function saveComments(comments) {
    fs.writeFileSync(dataFilePath, JSON.stringify(comments, null, 2));
}

// Get all comments
app.get('/comments', (req, res) => {
    res.json(loadComments());
});

// Submit a new comment
app.post('/comments/submit', (req, res) => {
    const { rating, comment } = req.body;

    // Basic validation (you can enhance this further)
    if (typeof rating !== 'number' || !comment || typeof comment !== 'string') {
        return res.status(400).json({ message: 'Invalid input. Rating must be a number and comment must be a string.' });
    }

    const comments = loadComments();
    comments.push({ rating, comment });
    saveComments(comments);
    res.json({ message: 'Comment submitted successfully!' });
});

// Login Route
app.post('/login', (req, res) => {
    const { email, password } = req.body; // Use 'email' from login form
    const user = users[email]; // Look up user in the mock database

    if (user && bcrypt.compareSync(password, user.password)) { // Check if user exists and password is valid
        req.session.userEmail = email; // Set session variable
        return res.redirect('/profile'); // Redirect to the profile page
    } else {
        return res.status(401).send('Invalid credentials');
    }
});

// Logout Route
app.post('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).send('Server error');
        }
        res.clearCookie('connect.sid'); // Clear session cookie
        res.status(200).json({ message: 'Logout successful' });
    });
});
// Profile Route
app.get('/profile', (req, res) => {
    if (!req.session.userEmail) {
        return res.redirect('/index.logIn.html'); // Redirect to login if not authenticated
    }
    const user = users[req.session.userEmail]; // Get user details from session
    res.send(`Welcome to your profile, ${user.username}`); // Display user profile
});


// Create Payment Intent route
app.post('/create-payment-intent', async (req, res) => {
    const { amount } = req.body;

    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount * 100, // Amount in cents
            currency: 'hkd', // Currency of the payment
        });
        res.send({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

// Send Confirmation Email route
app.post('/send-confirmation', (req, res) => {
    const { email, orderCode } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER, // Use email from .env
            pass: process.env.EMAIL_PASS  // Use password from .env
        }
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: `Order Confirmation - ${orderCode}`,
        text: `Thank you for your order! Your order code is ${orderCode}.`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send(error.toString());
        }
        res.status(200).send('Confirmation email sent: ' + info.response);
    });
});

// Global error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});