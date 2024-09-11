require('dotenv').config({path: 'server/.env' }); 
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const app = express();

app.use(bodyParser.json());
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// MongoDB connection
const uri = process.env.MONGO_URI;
if (!uri) {
    console.error('MONGO_URI is not defined in .env file');
    process.exit(1);
}

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB connected.'))
  .catch(err => console.error('MongoDB connection error:', err));

// Mongoose schema for users
const UserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    linkedln: { type: String, default: '' },
    github: { type: String, default: '' },
    instagram: { type: String, default: '' },
    isVerified: { type: Boolean, default: false },
    verificationToken: { type: String }
});

const User = mongoose.model('User', UserSchema, 'User');
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});
const sendVerificationEmail = (email, token) => {
    const verificationUrl = `http://localhost:3000/reset-password?token=${token}`;

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Email Verification',
        html: `<p>Please verify your email by clicking the link below:</p>
               <a href="${verificationUrl}">Verify Email</a>`
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.error('Error sending verification email:', error);
        } else {
            console.log('Verification email sent:', info.response);
        }
    });
};

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.sendStatus(401);

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

app.post('/register', async (req, res) => {
    const { email, password } = req.body;
    try {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const verificationToken = crypto.randomBytes(32).toString('hex');

        const newUser = new User({
            email,
            password: hashedPassword,
            verificationToken
        });

        await newUser.save();

        sendVerificationEmail(email, verificationToken);

        res.status(201).json({ message: 'Signup successful! Check your email to verify your account.' });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ error: 'Error registering user' });
    }
});

// Email verification route
app.get('/verify-email', async (req, res) => {
    const { token } = req.query;

    try {
        const user = await User.findOne({ verificationToken: token });

        if (!user) {
            return res.status(400).json({ error: 'Invalid or expired verification token' });
        }

        user.isVerified = true;
        user.verificationToken = undefined;
        await user.save();

        res.send('Email verified successfully! You can now log in.');
    } catch (error) {
        console.error('Error verifying email:', error);
        res.status(500).json({ error: 'Error verifying email' });
    }
});

// Login route
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        if (!user.isVerified) {
            return res.status(403).json({ error: 'Please verify your email before logging in.' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const token = jwt.sign({ _id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ error: 'Error logging in' });
    }
});

// Forgot password route
app.post('/forgot-password', async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const resetToken = crypto.randomBytes(32).toString('hex');
        user.verificationToken = resetToken;
        await user.save();

        const resetUrl = `http://localhost:3000/reset-password?token=${resetToken}`;

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Password Reset Request',
            html: `<p>Click the link below to reset your password:</p>
                   <a href="${resetUrl}">Reset Password</a>`
        };
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.error('Error sending password reset email:', error);
                return res.status(500).json({ error: 'Error sending reset email' });
            }
            res.status(200).json({ message: 'Password reset email sent' });
        });
    } catch (error) {
        console.error('Error handling forgot password request:', error);
        res.status(500).json({ error: 'Error handling forgot password request' });
    }
});

// Reset password route
app.post('/reset-password', async (req, res) => {
    const { token, newPassword } = req.body;
    try {
        const user = await User.findOne({ verificationToken: token });
        if (!user) {
            return res.status(400).json({ error: 'Invalid or expired token' });
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

        user.password = hashedPassword;
        user.verificationToken = undefined;
        await user.save();
        res.status(200).json({ message: 'Password reset successfully' });
    } catch (error) {
        console.error('Error resetting password:', error);
        res.status(500).json({ error: 'Error resetting password' });
    }
});

// Get user details route
app.get('/details', authenticateToken, async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select('linkedln github instagram');
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        console.error('Error fetching user details:', error);
        res.status(500).json({ error: 'Error fetching user details' });
    }
});

// Update user details route
app.post('/details', authenticateToken, async (req, res) => {
    const { linkedln, github, instagram } = req.body;
    const userId = req.user._id;
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        user.linkedln = linkedln;
        user.github = github;
        user.instagram = instagram;

        await user.save();
        res.status(201).json({ message: 'Details saved successfully' });
    } catch (error) {
        console.error('Error saving details:', error);
        res.status(500).json({ error: 'Error saving details' });
    }
});

// Server startup
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
