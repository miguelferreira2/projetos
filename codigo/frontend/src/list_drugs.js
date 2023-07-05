import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import medications from "./medication"
import "./list.css"

const MedicationList = () => {
  const [selectedMedication, setSelectedMedication] = useState(null);
  const [selectedAlternatives, setSelectedAlternatives] = useState([]);
  const [selectChosenAlternatives, setChosenAlternatives] = useState([]);
  const navigate = useNavigate();
  const routeChange = () => { 
    let path = '/invoice'; 
    navigate(path, { state: { selectChosenAlternatives } });
  }
  
const [isChecked, setIsChecked] = useState({})
  const handleMedicationClick = (medication) => {
    if (medication === selectedMedication) {
      // Clicked on the already selected medication, so close the alternatives
      setSelectedMedication(null);
      setSelectedAlternatives([]);
    } else {
      // Clicked on a different medication, so update the selected medication and alternatives
      setSelectedMedication(medication);
      setSelectedAlternatives(medication.alternatives.map((alternative) => alternative.id));
    }
  };

  const handleAlternativeChange = (alternativeId) => {
    
    setIsChecked((prevState) => {
      const updatedCheckedState = { ...prevState };
      updatedCheckedState[alternativeId] = !prevState[alternativeId];
  
      if (!updatedCheckedState[alternativeId]) {
        // Checkbox is unchecked, so remove the alternative from selectChosenAlternatives
        setChosenAlternatives((prevAlternatives) =>
          prevAlternatives.filter((id) => id !== alternativeId)
        );
      } else {
        // Checkbox is checked, so add the alternative to selectChosenAlternatives if it doesn't exist
        if (!selectChosenAlternatives.includes(alternativeId)) {
          setChosenAlternatives((prevAlternatives) => [
            ...prevAlternatives,
            alternativeId,
          ]);
        }
      }
      
      console.log(selectChosenAlternatives);
      return updatedCheckedState;
    });
  };

  

  return (
    <div>
      <h1>Medication List</h1>
      <ul className="medication-list">
        {medications.map((medication) => (
          <li
            key={medication.id}
            onClick={() => handleMedicationClick(medication)}
          >
            {medication.name}
          </li>
        ))}
      </ul>

      {selectedMedication && (
        <div className="alternatives">
          <ul className="alternatives-list">
            {selectedMedication.alternatives.map((alternative) => (
              <li key={alternative.id}>
                <label>
                  <input
                    className='checkbox-null'
                    type="checkbox"
                    checked={isChecked[alternative.id] || false}
                    onChange={() => handleAlternativeChange(alternative.id)}
                  />
                  {alternative.name} - Price: ${alternative.price}
                </label>
              </li>
            ))}
          </ul>
        </div>
      )}
      <button className="button" onClick={routeChange} type="submit">
        Next
      </button>
    </div>
  );
};

export default MedicationList;