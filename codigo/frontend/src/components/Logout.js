//import {useEffect} from "react"
import axios from "axios";


export const Logout = () => {


    ((e) => {
      try {
          axios.post('/logout/',
              {refresh_token: localStorage.getItem('refresh_token')},
              {headers: {'Authorization': `Bearer ${localStorage.getItem('access_token')}`}})
              .then((resp) => {
                  localStorage.clear();
                  //axios.defaults.headers.common['Authorization'] = null;
                  //routeChange();

                  window.location.href = '/login'
              });

        } catch (e) {
          console.log('logout not working', e)
        }
    })();

    

    /*useEffect(() => {
        
    }, []);*/
    return (
       <div></div>
     )
}