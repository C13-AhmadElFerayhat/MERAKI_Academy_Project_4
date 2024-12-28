import { useState, createContext } from 'react'
import { Link, Route, Routes, useNavigate, useParams } from "react-router-dom";
import './App.css'
import Home from "./components/Home/Home"
import SignUP from './components/SignUP/SignUP';
import Explore from './components/Explore/Explore';
import Login from './components/Login/Login';
import SignOut from './components/SignOut/SignOut';



export const UserContext = createContext();


function App() {

  const [token, setToken] = useState({})
  const [isLoggedIn, setIsLoggedIn] = useState(false)  
  const navigate = useNavigate()
  const [toggleSearch, settoggleSearch] = useState(false)

  return (
    <UserContext.Provider value={{token, setToken,setIsLoggedIn,settoggleSearch}}>
    <>
      <div className='navbar'>
        <div className='logo'>
        <img src='src/assets/Untitled-7.png' onClick={()=>navigate("/")}></img>
        <p onClick={()=>navigate("/Explore")} >Explore</p>
        {isLoggedIn && (<p>Create</p>)}
        </div>
        {toggleSearch && <input type='text' placeholder='Search..'></input>}
        <div className='log'>
        {isLoggedIn ? (
        <div className='log'>
        <p>About</p>
        <button onClick={()=>navigate("/Profile")}>Profile</button>
        <button onClick={()=>navigate("/LogOut")}>Log out</button>
        </div>
        ) : (
          <div className='log'>
          <p>About</p>
          <button onClick={()=>navigate("/LogIn")}>Log in</button>
          <button onClick={()=>navigate("/SignUP")}>Sign up</button>
          </div>
        )}
        </div>
      </div>
      <Routes>
        <Route path='/LogIn' element={<Login/>}></Route>
        <Route path='/Explore' element={<Explore/>}></Route>
        <Route path='' element={<Home/>}></Route>
        <Route path='/SignUP' element={<SignUP/>}></Route>
        <Route path='/LogOut' element={<SignOut/>}></Route>
      </Routes>
      <div>
      <p>!footer!</p>
    </div>
    </>
    </UserContext.Provider>
  )
}

export default App
