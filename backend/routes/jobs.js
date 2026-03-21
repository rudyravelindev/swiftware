const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Job = require('../models/Job');
const { protect } = require('../middleware/auth');

// Add a job
router.post('/', protect, async (req, res) => {
  const {
    company,
    position,
    status,
    location,
    salary,
    careersUrl,
    notes,
    appliedDate,
    followUpDate,
  } = req.body;

  try {
    const job = await Job.create({
      user: req.user,
      company,
      position,
      status,
      location,
      salary,
      careersUrl,
      notes,
      appliedDate,
      followUpDate,
    });

    res.status(201).json(job);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all jobs for logged in user
router.get('/', protect, async (req, res) => {
  try {
    const jobs = await Job.find({ user: req.user }).sort({ createdAt: -1 });
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Import multiple jobs
router.post('/import', protect, async (req, res) => {
  try {
    const { jobs } = req.body;

    const validStatuses = [
      'not_applied',
      'in_progress',
      'applied',
      'interview',
      'offer',
      'rejected',
    ];
    const jobsWithUser = jobs.map((job) => ({
      ...job,
      user: req.user,
      status: validStatuses.includes(job.status) ? job.status : 'not_applied',
    }));
    const created = await Job.insertMany(jobsWithUser);

    res.status(201).json(created);
  } catch (error) {
    console.log('Import error:', error.message);
    res.status(500).json({ message: error.message });
  }
});
// Update a job
router.put('/:id', protect, async (req, res) => {
  try {
    const job = await Job.findOneAndUpdate(
      { _id: req.params.id, user: req.user },
      req.body,
      { returnDocument: 'after' },
    );
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.json(job);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete a job
router.delete('/:id', protect, async (req, res) => {
  try {
    const job = await Job.findOneAndDelete({
      _id: req.params.id,
      user: req.user,
    });
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.json({ message: 'Job deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get job stats
router.get('/stats', protect, async (req, res) => {
  try {
    const stats = await Job.aggregate([
      { $match: { user: new mongoose.Types.ObjectId(req.user) } },
      { $group: { _id: '$status', count: { $sum: 1 } } },
    ]);
    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
