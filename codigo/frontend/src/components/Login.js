import axios from "axios";
import {useState} from "react";
//import { useNavigate } from "react-router-dom";

export const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    /*const navigate = useNavigate();
    const routeChange = () =>{ 
        let path = '/'; 
        navigate(path);
    }*/

    const usernameHandler = (e) => {
        setUsername(e.target.value);
    };

    const passwordHandler = (e) => {
        setPassword(e.target.value);
    };

    // Create the submit method.
    const submit = (e) => {
        e.preventDefault();
        const user = {
            username: username,
            password: password
        };

        // Create the POST requuest
        axios.post('/token/', user, {headers: {'Content-Type': 'application/json'}})
            .then((resp) => {
                // Initialize the access & refresh token in localstorage.      
                localStorage.clear();
                localStorage.setItem('access_token', resp.data.access);
                localStorage.setItem('refresh_token', resp.data.refresh);

                //axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('access_token')}`;
                window.location.href = '/'

            }).catch((error) => {
                if (error.response && error.response.data) {
                    alert("Wrong Login Credentials!");
                    console.log(error.response.data.Error);
                }
            });

        
   }
   return(
    <div>
        <div className='pads'>
        <form>
            <p className='item'>Username:</p>
            <input required onChange={usernameHandler} type="text" className="user-input input" />
            <p className='item'>Password:</p>
            <input required onChange={passwordHandler} type="password" className="pass-input input" />
            <button onClick={submit} className="todo-button btn_submit" type="submit">Submit</button>
        </form>
        </div>

    </div>
    );
}