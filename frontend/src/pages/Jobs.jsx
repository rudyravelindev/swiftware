import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';
import api from '../api/axios';
import toast from 'react-hot-toast';
import styles from './Jobs.module.css';
import AddJobModal from '../components/AddJobModal';
import { useTheme } from '../context/useTheme';
import * as XLSX from 'xlsx';
import ImportModal from '../components/ImportModal';

const Jobs = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const { darkMode, toggleDark } = useTheme();
  const jobsPerPage = 20;
  const [showImportModal, setShowImportModal] = useState(false);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await api.get('/jobs');
        setJobs(res.data);
      } catch {
        toast.error('Failed to load jobs');
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const handleStatusChange = async (id, status) => {
    try {
      const res = await api.put(`/jobs/${id}`, { status });
      setJobs(jobs.map((job) => (job._id === id ? res.data : job)));
      toast.success('Status updated');
    } catch {
      toast.error('Failed to update status');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleJobAdded = (newJob) => {
    setJobs([newJob, ...jobs]);
  };

  const handleJobUpdated = (updatedJob) => {
    setJobs(jobs.map((job) => (job._id === updatedJob._id ? updatedJob : job)));
  };

  const handleDownloadTemplate = () => {
    const template = [
      {
        Company: 'Example Company',
        Location: 'Seattle WA',
        Type: 'SaaS',
        Size: '~500',
        'Careers URL': 'https://example.com/careers',
        Notes: 'Any notes here',
        Status: 'not_applied',
      },
    ];
    const worksheet = XLSX.utils.json_to_sheet(template);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Jobs');
    XLSX.writeFile(workbook, 'swiftware-template.xlsx');
  };

  const handleImport = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const data = new Uint8Array(event.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const rows = XLSX.utils.sheet_to_json(worksheet);

        const newJobs = rows.map((row) => ({
          company: row['Company'] || '',
          position: 'Software Engineer',
          location: row['Location'] || '',
          companyType: row['Type'] || '',
          companySize: row['Size'] || '',
          careersUrl: row['Careers URL'] || '',
          notes: row['Notes'] || '',
          status: row['Status'] || 'not_applied',
        }));

        const res = await api.post('/jobs/import', { jobs: newJobs });
        setJobs((prev) => [...res.data, ...prev]);
        toast.success(`${res.data.length} jobs imported!`);
      } catch {
        toast.error('Failed to import jobs');
      }
    };
    reader.readAsArrayBuffer(file);
  };
  const handleExport = () => {
    const exportData = filtered.map((job) => ({
      Company: job.company,
      Location: job.location,
      Type: job.companyType,
      Size: job.companySize,
      'Careers URL': job.careersUrl,
      Notes: job.notes,
      Status: job.status,
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Jobs');
    const filename =
      statusFilter === 'all'
        ? 'swiftware-all-jobs.xlsx'
        : `swiftware-${statusFilter}-jobs.xlsx`;
    XLSX.writeFile(workbook, filename);
  };

  const filtered = jobs.filter((job) => {
    const matchesSearch =
      job.company.toLowerCase().includes(search.toLowerCase()) ||
      job.location.toLowerCase().includes(search.toLowerCase()) ||
      job.companyType.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'all' || job.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filtered.length / jobsPerPage);
  const start = (currentPage - 1) * jobsPerPage;
  const end = currentPage * jobsPerPage;
  const paginated = filtered.slice(start, end);

  return (
    <div className={styles.page}>
      <nav className={styles.nav}>
        <h1 className={styles.logo}>Swiftware</h1>
        <div className={styles.navRight}>
          <button
            onClick={() => navigate('/dashboard')}
            className={styles.navBtn}
          >
            Dashboard
          </button>
          <button onClick={toggleDark} className={styles.themeBtn}>
            {darkMode ? '☀️' : '🌙'}
          </button>
          <button onClick={handleLogout} className={styles.logoutBtn}>
            Logout
          </button>
        </div>
      </nav>

      <div className={styles.container}>
        <div className={styles.header}>
          <div>
            <h2 className={styles.title}>Job Applications</h2>
            <p className={styles.subtitle}>{jobs.length} companies tracked</p>
          </div>
          <div className={styles.headerRight}>
            <input
              type="text"
              placeholder="Search company, location, type..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              className={styles.search}
            />
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
              className={styles.filterSelect}
            >
              <option value="all">All Status</option>
              <option value="not_applied">Not Applied</option>
              <option value="in_progress">In Progress</option>
              <option value="applied">Applied</option>
              <option value="interview">Interview</option>
              <option value="offer">Offer</option>
              <option value="rejected">Rejected</option>
            </select>
            <button
              onClick={handleDownloadTemplate}
              className={styles.templateBtn}
            >
              Template
            </button>
            <button onClick={handleExport} className={styles.exportBtn}>
              Export
            </button>
            <button
              onClick={() => setShowImportModal(true)}
              className={styles.importBtn}
            >
              Import
            </button>
            <button
              onClick={() => setShowModal(true)}
              className={styles.addBtn}
            >
              + Add Job
            </button>
          </div>
        </div>

        {loading ? (
          <p>Loading jobs...</p>
        ) : (
          <div>
            <div className={styles.tableWrapper}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Company</th>
                    <th>Location</th>
                    <th>Type</th>
                    <th>Size</th>
                    <th>Notes</th>
                    <th>Careers</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {paginated.map((job) => (
                    <tr
                      key={job._id}
                      onClick={() => setSelectedJob(job)}
                      className={styles.row}
                    >
                      <td className={styles.company}>{job.company}</td>
                      <td>{job.location}</td>
                      <td className={styles.type}>{job.companyType}</td>
                      <td className={styles.type}>{job.companySize}</td>
                      <td className={styles.type}>{job.notes}</td>
                      <td>
                        {job.careersUrl ? (
                          <a
                            href={job.careersUrl}
                            target="_blank"
                            rel="noreferrer"
                            className={styles.link}
                            onClick={(e) => e.stopPropagation()}
                          >
                            Apply
                          </a>
                        ) : (
                          '—'
                        )}
                      </td>
                      <td>
                        <select
                          value={job.status}
                          onChange={(e) =>
                            handleStatusChange(job._id, e.target.value)
                          }
                          onClick={(e) => e.stopPropagation()}
                          className={`${styles.select} ${styles[job.status]}`}
                        >
                          <option value="not_applied">Not Applied</option>
                          <option value="in_progress">In Progress</option>
                          <option value="applied">Applied</option>
                          <option value="interview">Interview</option>
                          <option value="offer">Offer</option>
                          <option value="rejected">Rejected</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className={styles.pagination}>
              <button
                onClick={() => setCurrentPage((p) => p - 1)}
                disabled={currentPage === 1}
                className={styles.pageBtn}
              >
                ← Previous
              </button>
              <span className={styles.pageInfo}>
                Page {currentPage} — showing {start + 1}-
                {Math.min(end, filtered.length)} of {filtered.length} companies
              </span>
              <button
                onClick={() => setCurrentPage((p) => p + 1)}
                disabled={currentPage === totalPages}
                className={styles.pageBtn}
              >
                Next →
              </button>
            </div>
          </div>
        )}
      </div>

      {showModal && (
        <AddJobModal
          onClose={() => setShowModal(false)}
          onJobAdded={handleJobAdded}
        />
      )}

      {selectedJob && (
        <AddJobModal
          job={selectedJob}
          onClose={() => setSelectedJob(null)}
          onJobUpdated={handleJobUpdated}
          onJobDeleted={(id) => {
            setJobs(jobs.filter((job) => job._id !== id));
            setSelectedJob(null);
          }}
        />
      )}
      {showImportModal && (
        <ImportModal
          onClose={() => setShowImportModal(false)}
          onFileSelect={handleImport}
          onDownloadTemplate={handleDownloadTemplate}
        />
      )}
    </div>
  );
};

export default Jobs;
