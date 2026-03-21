import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';

import styles from './Landing.module.css';

const Landing = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  if (user) {
    navigate('/dashboard');
    return null;
  }
  return (
    <div className={styles.page}>
      {/* Navbar */}
      <nav className={styles.nav}>
        <h1 className={styles.logo}>Swiftware</h1>
        <div className={styles.navLinks}>
          <button
            onClick={() => navigate('/login')}
            className={styles.loginBtn}
          >
            Login
          </button>
          <button
            onClick={() => navigate('/register')}
            className={styles.signupBtn}
          >
            Get Started Free
          </button>
        </div>
      </nav>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.badge}>Built for job hunters 🚀</div>
          <h1 className={styles.heroTitle}>
            Never Lose Track of
            <br />
            <span className={styles.highlight}>Your Job Hunt</span>
          </h1>
          <p className={styles.heroSub}>
            Swiftware helps job seekers track every application, follow up on
            time, and land their dream job faster.
          </p>
          <div className={styles.heroBtns}>
            <button
              onClick={() => navigate('/register')}
              className={styles.ctaBtn}
            >
              Start Tracking Free →
            </button>
            <button
              onClick={() => navigate('/login')}
              className={styles.secondaryBtn}
            >
              Sign In
            </button>
          </div>
          <p className={styles.heroNote}>
            Free for a limited time. No credit card required for now.
          </p>
        </div>
      </section>
      {/* Stats */}
      <section className={styles.stats}>
        <div className={styles.statsGrid}>
          <div className={styles.statItem}>
            <div className={styles.statNum}>∞</div>
            <div className={styles.statLabel}>Companies You Can Track</div>
          </div>
          <div className={styles.statItem}>
            <div className={styles.statNum}>6</div>
            <div className={styles.statLabel}>Application Statuses</div>
          </div>
          <div className={styles.statItem}>
            <div className={styles.statNum}>100%</div>
            <div className={styles.statLabel}>Free to Use</div>
          </div>
          <div className={styles.statItem}>
            <div className={styles.statNum}>1</div>
            <div className={styles.statLabel}>Place to Track It All</div>
          </div>
        </div>
      </section>
      {/* Features */}
      <section className={styles.features}>
        <div className={styles.featuresContainer}>
          <h2 className={styles.sectionTitle}>
            Everything you need to land the job
          </h2>
          <p className={styles.sectionSub}>
            Built by a developer for developers
          </p>
          <div className={styles.featuresGrid}>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>➕</div>
              <h3 className={styles.featureTitle}>Add Companies Your Way</h3>
              <p className={styles.featureDesc}>
                Add companies one by one manually or import your entire list
                from Excel in seconds. You are in control.
              </p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>📊</div>
              <h3 className={styles.featureTitle}>Live Dashboard</h3>
              <p className={styles.featureDesc}>
                See your progress at a glance. Track how many companies you
                applied to, how many interviews you have and how many offers.
              </p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>🔄</div>
              <h3 className={styles.featureTitle}>Track Every Status</h3>
              <p className={styles.featureDesc}>
                From Not Applied to Offer — update your application status with
                one click and never lose track of where you stand.
              </p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>📥</div>
              <h3 className={styles.featureTitle}>Import & Export Excel</h3>
              <p className={styles.featureDesc}>
                Already have a spreadsheet of companies? Import it instantly.
                Export your applications anytime to share or back up.
              </p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>🔍</div>
              <h3 className={styles.featureTitle}>Search & Filter</h3>
              <p className={styles.featureDesc}>
                Find any company instantly. Filter by status to focus on what
                needs your attention right now.
              </p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>🌙</div>
              <h3 className={styles.featureTitle}>Dark Mode</h3>
              <p className={styles.featureDesc}>
                Easy on the eyes during those late night job hunting sessions.
                Theme preference saved automatically.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* How it works */}
      <section className={styles.howItWorks}>
        <div className={styles.featuresContainer}>
          <h2 className={styles.sectionTitle}>Get started in 3 steps</h2>
          <p className={styles.sectionSub}>
            From zero to organized in under 2 minutes
          </p>
          <div className={styles.stepsGrid}>
            <div className={styles.step}>
              <div className={styles.stepNum}>1</div>
              <h3 className={styles.stepTitle}>Create your free account</h3>
              <p className={styles.stepDesc}>
                Sign up in seconds. No credit card. No nonsense.
              </p>
            </div>
            <div className={styles.stepArrow}>→</div>
            <div className={styles.step}>
              <div className={styles.stepNum}>2</div>
              <h3 className={styles.stepTitle}>Add your companies</h3>
              <p className={styles.stepDesc}>
                Add companies one by one or import your list from Excel
                instantly.
              </p>
            </div>
            <div className={styles.stepArrow}>→</div>
            <div className={styles.step}>
              <div className={styles.stepNum}>3</div>
              <h3 className={styles.stepTitle}>Track every application</h3>
              <p className={styles.stepDesc}>
                Update statuses, add notes, and never lose track of a follow-up.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* CTA */}
      <section className={styles.cta}>
        <h2 className={styles.ctaTitle}>Ready to land your dream job?</h2>
        <p className={styles.ctaSub}>
          Join developers who are tracking smarter.
        </p>
        <button onClick={() => navigate('/register')} className={styles.ctaBtn}>
          Start Tracking Free →
        </button>
      </section>
      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <h3 className={styles.footerLogo}>Swiftware</h3>
          <div className={styles.footerLinks}>
            <button
              onClick={() => navigate('/login')}
              className={styles.footerLink}
            >
              Login
            </button>
            <button
              onClick={() => navigate('/register')}
              className={styles.footerLink}
            >
              Register
            </button>

            <a
              href="https://github.com/rudyravelindev/swiftware"
              target="_blank"
              rel="noreferrer"
              className={styles.footerLink}
            >
              GitHub
            </a>
          </div>
          <p className={styles.footerNote}>
            Built by Rudy Ravelin — Kirkland, WA
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
