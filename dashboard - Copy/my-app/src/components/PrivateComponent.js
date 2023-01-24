import React from "react";
import {Navigate,Outlet} from 'react-router-dom';

const PrivateComponent=()=>{    //this is use to access other pages after signup
    const auth = localStorage.getItem('user');     
    return auth?<Outlet /> : <Navigate to ="/SignUp" />
}

export default PrivateComponent;