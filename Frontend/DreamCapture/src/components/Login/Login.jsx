import React , { useContext }from 'react'
import { Link, Route, Routes, useNavigate, useParams } from "react-router-dom";
import { UserContext }  from '../../App';
import { useState } from 'react';
import axios from "axios";

function Login() {

    const [newlogin, setNewlogin] = useState({})
    const [Res, setRes] = useState("")
    const navigate = useNavigate()
    const {token, setToken,setIsLoggedIn,setUser} = useContext(UserContext);


    const Login2 = () => {
                       
        axios.post('http://localhost:5000/users/login', newlogin)
          .then(function (rese) {
            setRes(rese.data.message)
            setToken(rese.data.token)
            setIsLoggedIn(true)
            setUser(rese.data.user);            
            navigate("/")
          })
          .catch(function (err) {
            setRes(err.response.data.message);
          });
    }

  return (
    <div className="min-h-screen bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text flex items-center justify-center">
      <div className="max-w-md  w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <img
        src="src/assets/Untitled-7.png"
        alt="Logo"
        className="h-20 cursor-pointer block m-auto mb-8"
        />
        <h2 className="text-2xl font-bold mb-6 text-center">Welcome to Dream Capture</h2>
        
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            value={newlogin.email}
            onChange={(e) => setNewlogin({ ...newlogin, email: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:ring-2 focus:ring-teal-400"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700 dark:text-gray-300 mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            value={newlogin.password}
            onChange={(e) => setNewlogin({ ...newlogin, password: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:ring-2 focus:ring-teal-400"
          />
        </div>

        <button
          onClick={Login2}
          className="w-full bg-light-primary dark:bg-dark-primary text-light-text dark:text-dark-text hover:text-dark-text dark:hover:text-light-text dark:hover:bg-light-primary hover:bg-dark-primary font-bold py-2 px-4 rounded-lg transition duration-200"
        >
          Log in
        </button>

        {Res && (
          <p
            className={`text-center mt-4 ${
              Res.includes("success") ? "text-teal-600" : "text-red-500"
            }`}
          >
            {Res}
          </p>
        )}

        <p className="text-center mt-6 text-gray-600 dark:text-gray-400">
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/SignUP")}
            className="text-teal-500 cursor-pointer hover:underline"
          >
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;
