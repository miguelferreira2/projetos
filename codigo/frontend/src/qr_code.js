import React from 'react';

import { useNavigate } from "react-router-dom";
import './styles.css';
import qr from "./qr.jpg"

const App = () => {

  const navigate = useNavigate();
    
  const routeChange = () =>{ 
    let path = '/list';  
    navigate(path);
    }    


  return (
    
    <div className="container">
        
      <img src={qr} className="image" alt="QR Code" />
      <button className="button" onClick={routeChange} type="submit">
        Next
      </button>
    </div>
  );
};

export default App;
