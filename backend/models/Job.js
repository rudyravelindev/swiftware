const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    company: {
      type: String,
      required: true,
      trim: true,
    },
    position: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ['applied', 'interview', 'offer', 'rejected'],
      default: 'applied',
    },
    location: {
      type: String,
      default: '',
    },
    salary: {
      type: String,
      default: '',
    },
    careersUrl: {
      type: String,
      default: '',
    },
    notes: {
      type: String,
      default: '',
    },
    appliedDate: {
      type: Date,
    },
    followUpDate: {
      type: Date,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model('Job', jobSchema);
