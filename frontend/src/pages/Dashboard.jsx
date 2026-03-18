// import { useState, useEffect } from 'react';
// import { useAuth } from '../context/useAuth';
// import { useNavigate } from 'react-router-dom';
// import api from '../api/axios';
// import toast from 'react-hot-toast';
// import styles from './Dashboard.module.css';

// const Dashboard = () => {
//   const { user, logout } = useAuth();
//   const navigate = useNavigate();
//   const [stats, setStats] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchStats = async () => {
//       try {
//         const res = await api.get('/jobs/stats');
//         setStats(res.data);
//       } catch (err) {
//         toast.error('Failed to load stats');
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchStats();
//   }, []);

//   const handleLogout = () => {
//     logout();
//     navigate('/');
//   };

//   const getCount = (status) => {
//     const found = stats.find((s) => s._id === status);
//     return found ? found.count : 0;
//   };

//   return (
//     <div className={styles.page}>
//       <nav className={styles.nav}>
//         <h1 className={styles.logo}>Swiftware</h1>
//         <div className={styles.navRight}>
//           <span className={styles.greeting}>Hi, {user?.name}</span>
//           <button onClick={() => navigate('/jobs')} className={styles.navBtn}>
//             Jobs
//           </button>
//           <button onClick={handleLogout} className={styles.logoutBtn}>
//             Logout
//           </button>
//         </div>
//       </nav>

//       <div className={styles.container}>
//         <h2 className={styles.title}>Dashboard</h2>
//         <p className={styles.subtitle}>Track your job search progress</p>

//         {loading ? (
//           <p>Loading...</p>
//         ) : (
//           <div className={styles.statsGrid}>
//             <div className={`${styles.statCard} ${styles.applied}`}>
//               <div className={styles.statNumber}>{getCount('applied')}</div>
//               <div className={styles.statLabel}>Applied</div>
//             </div>
//             <div className={`${styles.statCard} ${styles.interview}`}>
//               <div className={styles.statNumber}>{getCount('interview')}</div>
//               <div className={styles.statLabel}>Interviews</div>
//             </div>
//             <div className={`${styles.statCard} ${styles.offer}`}>
//               <div className={styles.statNumber}>{getCount('offer')}</div>
//               <div className={styles.statLabel}>Offers</div>
//             </div>
//             <div className={`${styles.statCard} ${styles.rejected}`}>
//               <div className={styles.statNumber}>{getCount('rejected')}</div>
//               <div className={styles.statLabel}>Rejected</div>
//             </div>
//           </div>
//         )}

//         <button
//           onClick={() => navigate('/jobs')}
//           className={styles.viewJobsBtn}
//         >
//           View All Jobs →
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

import { useState, useEffect } from 'react';
import { useAuth } from '../context/useAuth';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import toast from 'react-hot-toast';
import styles from './Dashboard.module.css';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get('/jobs/stats');
        setStats(res.data);
      } catch (err) {
        toast.error('Failed to load stats');
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getCount = (status) => {
    const found = stats.find((s) => s._id === status);
    return found ? found.count : 0;
  };

  const total = 501;
  const applied = getCount('applied');
  const progressPercent = Math.round((applied / total) * 100);

  return (
    <div className={styles.page}>
      <nav className={styles.nav}>
        <h1 className={styles.logo}>Swiftware</h1>
        <div className={styles.navRight}>
          <span className={styles.greeting}>Hi, {user?.name} 👋</span>
          <button onClick={() => navigate('/jobs')} className={styles.navBtn}>
            View Jobs
          </button>
          <button onClick={handleLogout} className={styles.logoutBtn}>
            Logout
          </button>
        </div>
      </nav>

      <div className={styles.container}>
        <div className={styles.hero}>
          <h2 className={styles.title}>
            Your Job <span>Hunt</span>
          </h2>
          <p className={styles.subtitle}>
            Track every application. Land the right role.
          </p>
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <div className={styles.statsGrid}>
              <div className={`${styles.statCard} ${styles.notApplied}`}>
                <div className={styles.statNumber}>
                  {getCount('not_applied')}
                </div>
                <div className={styles.statLabel}>Not Applied</div>
              </div>
              <div className={`${styles.statCard} ${styles.inProgress}`}>
                <div className={styles.statNumber}>
                  {getCount('in_progress')}
                </div>
                <div className={styles.statLabel}>In Progress</div>
              </div>
              <div className={`${styles.statCard} ${styles.applied}`}>
                <div className={styles.statNumber}>{getCount('applied')}</div>
                <div className={styles.statLabel}>Applied</div>
              </div>
              <div className={`${styles.statCard} ${styles.interview}`}>
                <div className={styles.statNumber}>{getCount('interview')}</div>
                <div className={styles.statLabel}>Interviews</div>
              </div>
              <div className={`${styles.statCard} ${styles.offer}`}>
                <div className={styles.statNumber}>{getCount('offer')}</div>
                <div className={styles.statLabel}>Offers</div>
              </div>
              <div className={`${styles.statCard} ${styles.rejected}`}>
                <div className={styles.statNumber}>{getCount('rejected')}</div>
                <div className={styles.statLabel}>Rejected</div>
              </div>
            </div>

            <div className={styles.progressSection}>
              <p className={styles.progressTitle}>
                Applications Progress — {applied} of {total} companies contacted
              </p>
              <div className={styles.progressBar}>
                <div
                  className={styles.progressFill}
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <p className={styles.progressLabel}>
                {progressPercent}% complete
              </p>
            </div>

            <div className={styles.actions}>
              <button
                onClick={() => navigate('/jobs')}
                className={styles.viewJobsBtn}
              >
                View All 501 Jobs →
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
