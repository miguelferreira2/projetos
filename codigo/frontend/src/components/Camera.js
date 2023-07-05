import React from 'react';
import Webcam from "react-webcam";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const Camera = () => {
    const navigate = useNavigate();

    const camera = React.useRef(null);
    const takePhoto = React.useCallback( () => {
        const routeChange = () => { 
            let path = '/payment'; 
            navigate(path);
        }  

        const imgSrc = camera.current.getScreenshot();
        const img = new FormData();
        img.append('image', imgSrc);

        axios.post('/camera/', img, {headers: {'Authorization': `Bearer ${localStorage.getItem('access_token')}`}})
            .then((resp) => {
                if(resp.data.CONFIRM) { //sucesso
                    //window.location.href = '/'
                    alert('sucesso')
                    routeChange();
                } else {
                    alert("Take another photo")
                }
            })
    },[camera, navigate]);

    return (
        <>
            <div className='camera'>
                <Webcam
                    height={540}
                    width={540}
                    audio={false}
                    screenshotFormat='image/jpeg'
                    ref={camera}
                />
            </div>
            <button className='photo' onClick={takePhoto}>Click to take the photo</button>
        </>
    )
};

export default Camera;
