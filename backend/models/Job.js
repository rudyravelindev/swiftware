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
      enum: [
        'not_applied',
        'in_progress',
        'applied',
        'interview',
        'offer',
        'rejected',
      ],
      default: 'not_applied',
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
    companyType: {
      type: String,
      default: '',
    },
    companySize: {
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
