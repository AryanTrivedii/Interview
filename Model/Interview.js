const mongoose = require('mongoose');

const interviewSchema = new mongoose.Schema({
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  candidate: {
    name: { type: String, required: true },
    email: { type: String, required: true },
  },
  guests: [{ type: String, required: true }], // Array of guest emails
  resumePath: { type: String, required: true }, // Path to the uploaded resume
});

module.exports = mongoose.model('Interview', interviewSchema);
