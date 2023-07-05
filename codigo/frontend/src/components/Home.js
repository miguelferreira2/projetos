import {useState} from "react";
import axios from "axios";
//import { useNavigate } from "react-router-dom";


export const Home = () => {
    const [message, setMessage] = useState('');

    ((e) => {
      try {
        axios.get('/home/', {headers: {'Authorization': `Bearer ${localStorage.getItem('access_token')}`}})
            .then((resp) => {
              setMessage(resp.data.message);
            });
            
      } catch (e) {
        console.log('not auth')
      }
    })();

    /*useEffect(() => {
       
    }, []);*/
    return (
       <div className="form-signin mt-5 text-center">
         <h3>Hi {message}</h3>
       </div>
    )
}