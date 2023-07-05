import React from 'react';
//import RobotImage from './robot.png';
import './payment-success.css';
import { useNavigate } from "react-router-dom";
import medications from './medication';
import { useLocation } from 'react-router-dom';

const PaymentSuccess = () => {
    const location = useLocation();
    const selectChosenAlternatives = location?.state?.selectChosenAlternatives || [];
    const navigate = useNavigate();
    const routeChange = () => { 
        let path = '/medication_delivered'; 
        navigate(path, { state: { selectChosenAlternatives } });
    }  
  return (
    <div className="payment-success-container">
      <h1 className="payment-success-title">Payment Successful!</h1>
      <div className="payment-success-message">
        <p>Your payment has been successfully processed.</p>
        <p>The robot will now retrieve your medication.</p>
      </div>
      <button className="button" onClick={routeChange} type="submit">
        Next
      </button>
    </div>
  );
};

export default PaymentSuccess;