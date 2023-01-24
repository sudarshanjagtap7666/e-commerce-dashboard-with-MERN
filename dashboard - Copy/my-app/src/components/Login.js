import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Login =() =>{                         //function to perform Login operation

    const [email,setEmail] = React.useState('');
    const [password,setPassword] = React.useState('');
    const navigate = useNavigate();
    useEffect(() =>{
        const auth = localStorage.getItem('user');
        if(auth){
            navigate("/");
        }
    },[]);
    const handleLogin= async ()=>{                          //use to integrate Login API
        //console.warn(email , password)
        let result = await fetch('http://localhost:5000/login', {
            method:"post",
            body:JSON.stringify({email,password}),
            headers:{
                'Content-Type':'application/json'
            },
        });
        result =await result.json();
        //console.warn(result);                                       
        if(result.auth){
            localStorage.setItem("user" , JSON.stringify(result.user));
            localStorage.setItem("token" , JSON.stringify(result.auth));
            
            navigate("/")

        }else{
            alert("please enter currect details");
        }
    }
    return(
        <div className='register'>
            <h1>Login</h1>
            <input type="text" className='inputBox' placeholder = 'Enter Email' 
            onChange={(e)=>setEmail(e.target.value)} value={email} />
            <input type="password" className='inputBox' placeholder = 'Enter Password' 
            onChange={(e)=>setPassword(e.target.value)} value={password} />
            <button onClick={handleLogin} className="appbutton" type="button">Login</button>
            
        </div>
    )
}

export default Login;