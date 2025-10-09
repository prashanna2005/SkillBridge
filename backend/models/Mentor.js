const mongoose = require('mongoose');

const mentorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    default: 'mentor'
  },
  experience: {
    type: Number,
    required: true,
    min: 0
  },
  skills: [{
    type: String,
    required: true
  }],
  languages: [{
    type: String,
    required: true
  }],
  bio: {
    type: String,
    required: true,
    trim: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Mentor', mentorSchema);
