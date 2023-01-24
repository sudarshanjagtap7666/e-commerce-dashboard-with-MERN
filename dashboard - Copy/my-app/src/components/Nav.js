import React from 'react';
import {Link ,useNavigate} from 'react-router-dom';

const Nav =()=>{
    const auth = localStorage.getItem('user');
    const navigate = useNavigate();

    const logout =() =>{
       localStorage.clear();
       navigate('/SignUp')
    }

    return(
        <div>
            <img
            alt='logo'
            className='logo'
             src='https://www.pngfind.com/pngs/m/346-3461182_sj-ab-logo-cdr-sj-logo-png-transparent.png'></img>
            { 
                auth? <ul className="nav-ul">
                    <li><Link to = "/">Products</Link></li>
                    <li><Link to = "/add">Add Products</Link></li>
                    <li><Link to = "/update">Update Products</Link></li>
                    <li><Link to = "/Profile">Profile</Link></li>
                    <li><Link onClick= {logout} to = "/SignUp">Logout ({JSON.parse(auth).name}) </Link></li>
                
                </ul>
                :
                <ul className="nav-ul nav-right">
                    <li><Link to = "/SignUp">SignUp</Link></li>
                    <li><Link to = "/login">Login</Link></li>
                </ul>
            }
        </div>
    )
}

export default Nav;