import React ,{useState , useEffect} from 'react';
import { useNavigate} from 'react-router-dom'

const SignUp =() =>{                                     //function to perform signup operation
    const [name,setName] = useState("");
    const [password,setpassword] = useState("")
    const [email,setEmail] = useState("");
    const navigate = useNavigate();

    
    useEffect (() =>{
    const auth = localStorage.getItem('user');
    if(auth)
    {
        navigate('/')
    }
},[]);

    const collectData= async()=>{                       //use to integrate register  API
        //console.warn(name,email,password);
        let result =await fetch('http://localhost:5000/register',{ 
            method:'POST',
            body: JSON.stringify({name,email,password}),
            headers:{
                'Content-Type':'application/json'
            },
        });
        result= await result.json()
        //console.warn(result);
        localStorage.setItem("user" , JSON.stringify(result.result));
        localStorage.setItem("token" , JSON.stringify(result.auth));

        
            navigate('/')        // if click on signup then it will redirect on home page
        
    }

    return(
        <div className="register">
            <h1>Register</h1>
            <input className="inputBox" type = "text" 
            value={name} onChange={(e)=>setName(e.target.value)} placeholder="Enter Name"/>

            <input className="inputBox" type = "text" 
            value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Enter Email"/>

            <input className="inputBox" type = "password" 
            value={password} onChange={(e)=>setpassword(e.target.value)} placeholder="Enter Password"/>

            <button onClick={collectData} className="appbutton" type="button">SignUp</button>
        </div>
    )
}

export default SignUp;