import { useState } from 'react';
import api from '../api/axios';
import toast from 'react-hot-toast';
import styles from './AddJobModal.module.css';

const AddJobModal = ({ onClose, onJobAdded }) => {
  const [formData, setFormData] = useState({
    company: '',
    position: '',
    location: '',
    companyType: '',
    companySize: '',
    careersUrl: '',
    notes: '',
    status: 'applied',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post('/jobs', formData);
      onJobAdded(res.data);
      toast.success('Job added!');
      onClose();
    } catch (err) {
      toast.error('Failed to add job');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2 className={styles.title}>Add New Job</h2>
          <button onClick={onClose} className={styles.closeBtn}>
            ✕
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className={styles.grid}>
            <div className={styles.field}>
              <label className={styles.label}>Company *</label>
              <input
                name="company"
                placeholder="Company name"
                value={formData.company}
                onChange={handleChange}
                required
                className={styles.input}
              />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Position *</label>
              <input
                name="position"
                placeholder="Job title"
                value={formData.position}
                onChange={handleChange}
                required
                className={styles.input}
              />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Location</label>
              <input
                name="location"
                placeholder="City, State or Remote"
                value={formData.location}
                onChange={handleChange}
                className={styles.input}
              />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Company Type</label>
              <input
                name="companyType"
                placeholder="SaaS, Fintech, etc."
                value={formData.companyType}
                onChange={handleChange}
                className={styles.input}
              />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Company Size</label>
              <input
                name="companySize"
                placeholder="~500, 1000+, etc."
                value={formData.companySize}
                onChange={handleChange}
                className={styles.input}
              />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Careers URL</label>
              <input
                name="careersUrl"
                placeholder="https://..."
                value={formData.careersUrl}
                onChange={handleChange}
                className={styles.input}
              />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className={styles.input}
              >
                <option value="not_applied">Not Applied</option>
                <option value="in_progress">In Progress</option>
                <option value="applied">Applied</option>
                <option value="interview">Interview</option>
                <option value="offer">Offer</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Notes</label>
              <input
                name="notes"
                placeholder="Any notes..."
                value={formData.notes}
                onChange={handleChange}
                className={styles.input}
              />
            </div>
          </div>
          <div className={styles.footer}>
            <button
              type="button"
              onClick={onClose}
              className={styles.cancelBtn}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className={styles.submitBtn}
            >
              {loading ? 'Adding...' : 'Add Job'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddJobModal;
