const mongoose = require('mongoose');
const xlsx = require('xlsx');
require('dotenv').config();

const Job = require('./models/Job');

// Your user ID from MongoDB
const USER_ID = '69b66861a17a3d29914254ff';

const seedJobs = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');

    // Read the Excel file
    const workbook = xlsx.readFile(
      './Rudy_Ravelin_500_Tech_Companies_Job_Hunt.xlsx',
    );
    const sheet = workbook.Sheets['500 Companies'];
    const rows = xlsx.utils.sheet_to_json(sheet);

    console.log(`Found ${rows.length} companies`);

    // Delete existing jobs for this user
    await Job.deleteMany({ user: USER_ID });
    console.log('Cleared existing jobs');

    // Build job documents from Excel rows
    const jobs = rows.map((row) => ({
      user: USER_ID,
      company: row['Company'] || '',
      position: 'Software Engineer',
      status: 'applied',
      location: `${row['City'] || ''} ${row['State'] || ''}`.trim(),
      salary: '',
      careersUrl: row['Careers Page'] || '',
      notes: row['Notes'] || '',
    }));

    // Insert all jobs at once
    await Job.insertMany(jobs);
    console.log(`Successfully imported ${jobs.length} jobs`);

    process.exit(0);
  } catch (error) {
    console.log('Error:', error);
    process.exit(1);
  }
};

seedJobs();
