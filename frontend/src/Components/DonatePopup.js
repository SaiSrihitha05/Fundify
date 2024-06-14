// DonatePopup.js

import React, { useState } from 'react';
import { axiosWithToken } from '../axiosWithToken';

function DonatePopup({ project, onClose }) {
  const [donationAmount, setDonationAmount] = useState('');
  const [confirmation, setConfirmation] = useState(false);

  const handleDonate = async () => {
    // Perform donation logic here, e.g., send donation amount to server
    try {
      await axiosWithToken.post(`/user-api/project/${project.projectId}/donate`, { amount: donationAmount });
      setConfirmation(true);
    } catch (error) {
      // Handle donation error
      console.error('Error donating:', error);
    }
  };

  return (
    <div className="popup">
      <div className="popup-inner">
        <h2>Donate to Project: {project.title}</h2>
        {!confirmation ? (
          <div>
            <label htmlFor="donationAmount">Enter donation amount:</label>
            <input
              type="number"
              id="donationAmount"
              value={donationAmount}
              onChange={(e) => setDonationAmount(e.target.value)}
            />
            <button onClick={handleDonate}>Confirm</button>
          </div>
        ) : (
          <div>
            <p>Thank you for your donation!</p>
            <button onClick={onClose}>Close</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default DonatePopup;
