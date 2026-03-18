const mongoose = require('mongoose');
const xlsx = require('xlsx');
require('dotenv').config();

const Job = require('./models/Job');

const USER_ID = '69b66861a17a3d29914254ff';

const seedJobs = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');

    const workbook = xlsx.readFile(
      './Rudy_Ravelin_500_Tech_Companies_Job_Hunt.xlsx',
    );
    const sheet = workbook.Sheets['500 Companies'];
    const rows = xlsx.utils.sheet_to_json(sheet);

    console.log(`Found ${rows.length} companies`);

    await Job.deleteMany({ user: USER_ID });
    console.log('Cleared existing jobs');

    const jobs = rows.map((row) => ({
      user: USER_ID,
      company: row['Company'] || '',
      position: 'Software Engineer',
      status: 'applied',
      location:
        row['City'] === 'Remote'
          ? 'Remote'
          : `${row['City'] || ''} ${row['State'] || ''}`.trim(),
      salary: '',
      careersUrl: row['Careers Page'] || '',
      companyType: row['Type'] || '',
      companySize: row['Size'] || '',
      notes: row['Notes'] || '',
    }));

    await Job.insertMany(jobs);
    console.log(`Successfully imported ${jobs.length} jobs`);

    process.exit(0);
  } catch (error) {
    console.log('Error:', error);
    process.exit(1);
  }
};

seedJobs();
