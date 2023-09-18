const express = require('express');
const router = express.Router();
const multer = require('multer');
const nodemailer = require('nodemailer');
const Interview = require('../Model/Interview');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const destinationPath = 'uploads/'; 
      console.log('Destination Path:', destinationPath);
      cb(null, destinationPath);
    },
    filename: (req, file, cb) => {
      const uniqueFilename = Date.now() + '-' + file.originalname;
      console.log('File to be saved:', uniqueFilename);
      cb(null, uniqueFilename);
    },
  });
  
const upload = multer({ storage: storage });

router.post('/interviews', upload.single('resume'), async (req, res) => {
    try {
      const { startTime, endTime, candidateName, email, guests } = req.body;
  
      if (guests.length < 2) {
        return res.status(400).json({ error: 'You need at least 2 participants for the meeting.' });
      }
  
      const existingInterviews = await Interview.find({
        $or: [
          {
            $and: [
              { startTime: { $lt: endTime } },
              { endTime: { $gt: startTime } },
            ],
          },
          {
            'participants.email': email,
            $and: [
              { startTime: { $lt: endTime } },
              { endTime: { $gt: startTime } },
            ],
          },
        ],
      });
  
      if (existingInterviews.length > 0) {
        return res.status(400).json({ error: 'The slot is already booked.' });
      }
  
      const interview = new Interview({
        startTime,
        endTime,
        candidate: { name: candidateName, email },
        guests,
        resumePath: req.file.path,
      });
  
      await interview.save();
  
  
      res.status(201).json(interview);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  router.get('/interviews', async (req, res) => {
    try {
   const interviews = await Interview.find();
      res.status(200).json(interviews);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });


  router.put('/interviews/:id', async (req, res) => {
    const interviewId = req.params.id;
    const { startTime, endTime, candidateName, email, guests } = req.body;
  
    try {
      const interview = await Interview.findById(interviewId);
  
      if (!interview) {
        return res.status(404).json({ error: 'Interview not found' });
      }
  
      interview.startTime = startTime;
      interview.endTime = endTime;
      interview.candidate.name = candidateName;
      interview.candidate.email = email;
      interview.guests = guests;
  
      await interview.save();
  
      res.status(200).json(interview);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  module.exports = router;
