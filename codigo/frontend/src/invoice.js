import React from 'react';
import { useLocation } from 'react-router-dom';
import medications from './medication';
import { useNavigate } from "react-router-dom";
import "./invoice.css"

const Payment = () => {
  const location = useLocation();
  const selectChosenAlternatives = location?.state?.selectChosenAlternatives || [];
  const navigate = useNavigate();
  const routeChange = () => { 
    let path = '/payment'; 
    navigate(path, { state: { selectChosenAlternatives } });
  }

  const routeChange2 = () => { 
    let path = '/camera'; 
    navigate(path, { state: { selectChosenAlternatives } });
  }

  // Search for alternative information based on IDs
  const selectedAlternatives = medications.reduce((selected, medication) => {
    const alternatives = medication.alternatives.filter((alternative) =>
      selectChosenAlternatives.includes(alternative.id)
    );
    return selected.concat(alternatives);
  }, []);

  // Calculate the total cost
  const totalCost = selectedAlternatives.reduce((total, alternative) => {
    const alternativePrice = alternative?.price || 0;
    return total + alternativePrice;
  }, 0);

  return (
    <div className="payment-container">
      <div className="invoice-container">
        <h1 className="invoice-title">Invoice</h1>
        {selectedAlternatives.length > 0 ? (
          <ul className="invoice-alternatives">
            {selectedAlternatives.map((alternative) => (
              <li key={alternative.id} className="invoice-alternative">
                {alternative.name} - Price: ${alternative.price}
              </li>
            ))}
          </ul>
        ) : (
          <p className="invoice-no-alternatives">No alternatives selected.</p>
        )}
        <p className="invoice-total">Total Cost: ${totalCost.toFixed(2)}</p>
      </div>

      <div className="payment-options">
        <h2 className="payment-options-title">Payment Options</h2>
        <button onClick={routeChange} className="payment-option">Cash/Card</button>
        <button onClick={routeChange2} className="payment-option">Face Recognition</button>
      </div>
    </div>
  );
};

export default Payment;
