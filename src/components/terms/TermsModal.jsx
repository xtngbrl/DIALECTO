import React from 'react';
import './terms.css'; // Optional for styling

const TermsModals = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="terms-modal-overlay">
      <div className="terms-modal-content">
        <h2>Terms and Conditions</h2>
        <p><strong>Welcome to Dialecto!</strong> By creating an account, you agree to the following:</p>

        <ul>
          <li>
            <strong>Voice Recording:</strong> We use voice recognition to compare your recordings with system audio to provide feedback on pronunciation accuracy.
          </li>
          <li>
            <strong>Data Usage:</strong> Your game progress, scores, and voice data may be stored for educational tracking and system improvement purposes.
          </li>
          <li>
            <strong>Gamification & Leaderboards:</strong> We track your performance across games. Top scores may appear on our public leaderboard.
          </li>
          <li>
            <strong>Content:</strong> This system is designed to preserve and promote Filipino dialects through interactive learning. You must not misuse the platform for purposes outside of education.
          </li>
          <li>
            <strong>Privacy:</strong> Your personal information will be handled with care and will not be shared without your consent.
          </li>
        </ul>

        <p>By checking the box, you acknowledge that you have read and agree to these terms.</p>

        <button onClick={onClose} className="close-btn">Close</button>
      </div>
    </div>
  );
};

export default TermsModals;
