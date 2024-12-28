import React , { useContext }from 'react'
import { Link, Route, Routes, useNavigate, useParams } from "react-router-dom";
import { UserContext }  from '../../App';
import { useState } from 'react';
import axios from "axios";

function Login() {

    const [newlogin, setNewlogin] = useState({})
    const [Res, setRes] = useState("")
    const navigate = useNavigate()
    const {token, setToken,setIsLoggedIn} = useContext(UserContext);


    const Login2 = () => {
                       
        axios.post('http://localhost:5000/users/login', newlogin)
          .then(function (rese) {
            setRes(rese.data.message);
            setToken(rese.data.token)
            setIsLoggedIn(true)
            navigate("/")
          })
          .catch(function (err) {
            setRes(err.response.data.message);
          });
    }

  return (
    <div>
        <label>Email</label>
        <input onChange={(e)=> setNewlogin({...newlogin, email:e.target.value})} type= "email" placeholder='Email'></input>
        <label>Password</label>
        <input onChange={(e)=> setNewlogin({...newlogin, password:e.target.value})} type= "password" placeholder='Password'></input>
        <button onClick={()=>Login2()
        }>Login</button>
        <p>{Res}</p>
    </div>
    
  )
}

export default Login