import React from "react";
import axios from "axios";
import List from "./list_drugs"
import ProtectedRoutes from "./ProtectedRoutes"
import Qrcode from "./qr_code"
import { BrowserRouter as Router, Route,Routes} from "react-router-dom";
import {Navigation} from './components/Navigation';
import {Login} from './components/Login';
import {Home} from './components/Home';
import {Logout} from './components/Logout';
import Camera from './components/Camera';
import Invoice from "./invoice"
import Payment from "./payment"
import MedicationDeliver from "./medication_delivered"


function App() {
  
  axios.defaults.baseURL = "http://django-env.eba-vaqwfqzd.us-east-1.elasticbeanstalk.com/";
  //axios.defaults.baseURL = "http://127.0.0.1:8000/";
  //axios.defaults.baseURL = 'http://django-react.eba-vaqwfqzd.us-east-1.elasticbeanstalk.com'; 

  return (
    <>
    
      <Router>
      <Navigation/> 
        <Routes>
          <Route path="/login" element={<Login/>}/>
          <Route path="/logout" element={<Logout/>}/>
          <Route element={<ProtectedRoutes/>}>
            <Route path="/" element={<Home/>}/>
            <Route path="/list" element={<List/>}/>
            <Route path="/qrcode" element={<Qrcode/>}/>
            <Route path="/camera" element={<Camera/>}/>
            <Route path="/invoice" element={<Invoice/>}/>
            <Route path="/payment" element={<Payment/>}/>
            <Route path="/medication_delivered" element={<MedicationDeliver/>}/>
          </Route>
        </Routes>
      </Router>
    </>
  
  );
}

export default App;