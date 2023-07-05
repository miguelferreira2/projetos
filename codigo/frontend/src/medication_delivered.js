import React from 'react';
//import RobotImage from './robot.png';
import './medication_deliver.css';
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';

const MedicationDeliver = () => {
    

  return (
    <div className="medication-success-container">
      <h1 className="medication-success-title">Order Delivered</h1>
      <div className="medication-success-message">
        <p>Verify the medications.</p>
        
      </div>
    </div>
  );
};

export default MedicationDeliver;