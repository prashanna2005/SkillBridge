const express = require('express');
const bcrypt = require('bcryptjs');
const Learner = require('../models/Learner');
const Mentor = require('../models/Mentor');
const Both = require('../models/Both');

const router = express.Router();

// Helper function to get model based on role
const getModel = (role) => {
  switch (role) {
    case 'learner':
      return Learner;
    case 'mentor':
      return Mentor;
    case 'both':
      return Both;
    default:
      return null;
  }
};

// Register endpoint
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, role, experience, skills, languages, bio } = req.body;

    // Validate required fields
    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: 'Name, email, password, and role are required' });
    }

    // Validate role
    if (!['learner', 'mentor', 'both'].includes(role)) {
      return res.status(400).json({ message: 'Invalid role' });
    }

    // For mentor and both, additional fields required
    if ((role === 'mentor' || role === 'both') && (!experience || !skills || !languages || !bio)) {
      return res.status(400).json({ message: 'Experience, skills, languages, and bio are required for mentors' });
    }

    const Model = getModel(role);
    if (!Model) {
      return res.status(400).json({ message: 'Invalid role' });
    }

    // Check if user already exists in any collection
    const existingLearner = await Learner.findOne({ email });
    const existingMentor = await Mentor.findOne({ email });
    const existingBoth = await Both.findOne({ email });

    if (existingLearner || existingMentor || existingBoth) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user data
    const userData = {
      name,
      email,
      password: hashedPassword,
      role
    };

    if (role === 'mentor' || role === 'both') {
      userData.experience = experience;
      userData.skills = skills;
      userData.languages = languages;
      userData.bio = bio;
    }

    // Save user
    const user = new Model(userData);
    await user.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Login endpoint
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Check in all collections
    let user = await Learner.findOne({ email });
    let role = 'learner';

    if (!user) {
      user = await Mentor.findOne({ email });
      role = 'mentor';
    }

    if (!user) {
      user = await Both.findOne({ email });
      role = 'both';
    }

    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Return user data (without password)
    const userData = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      ...(role === 'mentor' || role === 'both') && {
        experience: user.experience,
        skills: user.skills,
        languages: user.languages,
        bio: user.bio
      }
    };

    res.json({ message: 'Login successful', user: userData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
