// DashboardContent.js
import React from 'react';
import '../css/dashboradContent.css';

function DashboardContent() {
  
  return (
    <div className="dashboard-content">
      <div className="stats-card" style={{ backgroundColor: '#e57373' }}>
        <h3>Total Projects</h3>
        <p>50</p>
      </div>
      <div className="stats-card" style={{ backgroundColor: '#fdd835' }}>
        <h3>Total Leads</h3>
        <p>5000</p>
      </div>
      <div className="stats-card" style={{ backgroundColor: '#fdd835' }}>
        <h3>Total Properties</h3>
        <p>50000</p>
      </div>
      <div className="stats-card" style={{ backgroundColor: '#e57373' }}>
        <h3>Total Jobs</h3>
        <p>50000</p>
      </div>
    </div>
  );
}

export default DashboardContent;
