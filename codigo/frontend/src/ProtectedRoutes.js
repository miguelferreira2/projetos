import { Outlet } from "react-router"
import {Login} from "./components/Login";

const ProtectedRoutes = () => {
    return localStorage.getItem('access_token') != null ? <Outlet/> : <Login/>;
}

export default ProtectedRoutes;