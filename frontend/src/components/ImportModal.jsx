import styles from './ImportModal.module.css';

const ImportModal = ({ onClose, onFileSelect, onDownloadTemplate }) => {
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2 className={styles.title}>Import Jobs from Excel</h2>
          <button onClick={onClose} className={styles.closeBtn}>
            ✕
          </button>
        </div>

        <div className={styles.body}>
          <p className={styles.description}>
            Your Excel file must have these exact column headers:
          </p>

          <div className={styles.columns}>
            {[
              'Company',
              'Location',
              'Type',
              'Size',
              'Careers URL',
              'Notes',
              'Status',
            ].map((col) => (
              <span key={col} className={styles.column}>
                {col}
              </span>
            ))}
          </div>

          <div className={styles.statusList}>
            <p className={styles.statusTitle}>Valid Status values:</p>
            <div className={styles.statuses}>
              <span className={styles.status}>not_applied</span>
              <span className={styles.status}>in_progress</span>
              <span className={styles.status}>applied</span>
              <span className={styles.status}>interview</span>
              <span className={styles.status}>offer</span>
              <span className={styles.status}>rejected</span>
            </div>
          </div>

          <div className={styles.tip}>
            💡 Not sure about the format? Download our template first and fill
            it in.
          </div>
        </div>

        <div className={styles.footer}>
          <button onClick={onDownloadTemplate} className={styles.templateBtn}>
            📋 Download Template
          </button>
          <label className={styles.importBtn}>
            📥 Choose File
            <input
              type="file"
              accept=".xlsx"
              onChange={(e) => {
                onFileSelect(e);
                onClose();
              }}
              style={{ display: 'none' }}
            />
          </label>
        </div>
      </div>
    </div>
  );
};

export default ImportModal;
