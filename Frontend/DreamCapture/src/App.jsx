import { useState, createContext } from "react";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import Home from "./components/Home/Home";
import SignUP from "./components/SignUP/SignUP";
import Explore from "./components/Explore/Explore.jsx";
import Login from "./components/Login/Login";
import SignOut from "./components/SignOut/SignOut";
import DreamDetails from "./components/DreamDetails/DreamDetails";
import Create from "./components/create/Create";
import Profile from "./components/Profile/Profile";
import Profile2 from "./components/Profile/Profile2.jsx";
import { RiMistFill, RiLoginCircleFill ,RiLogoutCircleFill  } from "react-icons/ri";
import { AiOutlineUserAdd } from "react-icons/ai";
import Contact from "./components/Footer/Contact.jsx";
import About from "./components/Footer/About.jsx";
import PrivacyPolicy from "./components/Footer/Policy.jsx";


export const UserContext = createContext();

function App() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [toggleSearch, settoggleSearch] = useState(false)

  return (
    <UserContext.Provider value={{ token, setToken, setIsLoggedIn ,settoggleSearch, isLoggedIn,user, setUser}}>
      <div className={`${isDarkMode ? "dark" : ""} font-varela`}>
        {/* Navbar */}
        <div class="absolute block sm:hidden sm:flex flex-col justify-center ml-6">
    <input type="checkbox" name="light-switch" class="light-switch sr-only" />
    <label onClick={()=>{setIsDarkMode(!isDarkMode)}} class="relative cursor-pointer p-2" for="light-switch">
        <svg class="dark:hidden" width="16" height="16" xmlns="http://www.w3.org/2000/svg">
        <path class="fill-slate-400" d="M6.2 1C3.2 1.8 1 4.6 1 7.9 1 11.8 4.2 15 8.1 15c3.3 0 6-2.2 6.9-5.2C9.7 11.2 4.8 6.3 6.2 1Z" />
        <path class="fill-slate-500" d="M12.5 5a.625.625 0 0 1-.625-.625 1.252 1.252 0 0 0-1.25-1.25.625.625 0 1 1 0-1.25 1.252 1.252 0 0 0 1.25-1.25.625.625 0 1 1 1.25 0c.001.69.56 1.249 1.25 1.25a.625.625 0 1 1 0 1.25c-.69.001-1.249.56-1.25 1.25A.625.625 0 0 1 12.5 5Z" />
        </svg>
        <svg class="hidden dark:block" width="16" height="16" xmlns="http://www.w3.org/2000/svg">
            
            <path class="fill-slate-300" d="M7 0h2v2H7zM12.88 1.637l1.414 1.415-1.415 1.413-1.413-1.414zM14 7h2v2h-2zM12.95 14.433l-1.414-1.413 1.413-1.415 1.415 1.414zM7 14h2v2H7zM2.98 14.364l-1.413-1.415 1.414-1.414 1.414 1.415zM0 7h2v2H0zM3.05 1.706 4.463 3.12 3.05 4.535 1.636 3.12z" />
            <path class="fill-slate-400" d="M8 4C5.8 4 4 5.8 4 8s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4Z" />
        </svg>
        <span class="sr-only">Switch to light / dark version</span>
    </label>
</div>
        <header className="relative z-10 navbar rea bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text sticky top-0 hidden sm:flex justify-between items-center hidden p-4 shadow-md border-t border-gray-200 dark:border-white-700">
          <div className="logo flex items-center ">
            <img
              src="src/assets/Untitled-7.png"
              alt="Logo"
              className="h-10 cursor-pointer"
              onClick={() => navigate("/")}
            />
            <p
              onClick={() => navigate("/Explore")}
              className="ml-4 cursor-pointer hover:text-light-primary dark:hover:text-dark-primary"
            >
              Explore
            </p>
            {isLoggedIn && (
              <p
                onClick={() => navigate("/Create")}
                className="ml-4 cursor-pointer hover:text-light-primary dark:hover:text-dark-primary"
              >
                Create
              </p>
            )}
          </div>
          
          <div className="flex items-center space-x-4">
          <div class="flex flex-col justify-center ml-3">
    <input type="checkbox" name="light-switch" class="light-switch sr-only" />
    <label onClick={()=>{setIsDarkMode(!isDarkMode)}} class="relative cursor-pointer p-2" for="light-switch">
        <svg class="dark:hidden" width="16" height="16" xmlns="http://www.w3.org/2000/svg">
        <path class="fill-slate-400" d="M6.2 1C3.2 1.8 1 4.6 1 7.9 1 11.8 4.2 15 8.1 15c3.3 0 6-2.2 6.9-5.2C9.7 11.2 4.8 6.3 6.2 1Z" />
        <path class="fill-slate-500" d="M12.5 5a.625.625 0 0 1-.625-.625 1.252 1.252 0 0 0-1.25-1.25.625.625 0 1 1 0-1.25 1.252 1.252 0 0 0 1.25-1.25.625.625 0 1 1 1.25 0c.001.69.56 1.249 1.25 1.25a.625.625 0 1 1 0 1.25c-.69.001-1.249.56-1.25 1.25A.625.625 0 0 1 12.5 5Z" />
        </svg>
        <svg class="hidden dark:block" width="16" height="16" xmlns="http://www.w3.org/2000/svg">
            
            <path class="fill-slate-300" d="M7 0h2v2H7zM12.88 1.637l1.414 1.415-1.415 1.413-1.413-1.414zM14 7h2v2h-2zM12.95 14.433l-1.414-1.413 1.413-1.415 1.415 1.414zM7 14h2v2H7zM2.98 14.364l-1.413-1.415 1.414-1.414 1.414 1.415zM0 7h2v2H0zM3.05 1.706 4.463 3.12 3.05 4.535 1.636 3.12z" />
            <path class="fill-slate-400" d="M8 4C5.8 4 4 5.8 4 8s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4Z" />
        </svg>
        <span class="sr-only">Switch to light / dark version</span>
    </label>
</div>
            {isLoggedIn ? (
              <>
                <button
                  onClick={() => navigate("/Profile")}
                  className="bg-light-primary dark:bg-dark-primary text-light-text dark:text-dark-text hover:text-dark-text dark:hover:text-light-text dark:hover:bg-light-primary hover:bg-dark-primary px-4 py-2 rounded"
                >
                  Profile
                </button>
                <button
                  onClick={() => navigate("/LogOut")}
                  className="bg-light-primary dark:bg-dark-primary text-light-text dark:text-dark-text hover:text-dark-text dark:hover:text-light-text dark:hover:bg-light-primary hover:bg-dark-primary px-4 py-2 rounded"
                >
                  Log Out
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => navigate("/LogIn")}
                  className="bg-light-primary dark:bg-dark-primary text-light-text dark:text-dark-text hover:text-dark-text dark:hover:text-light-text dark:hover:bg-light-primary hover:bg-dark-primary px-4 py-2 rounded"
                >
                  Log In
                </button>
                <button
                  onClick={() => navigate("/SignUP")}
                  className="bg-light-primary dark:bg-dark-primary text-light-text dark:text-dark-text hover:text-dark-text dark:hover:text-light-text dark:hover:bg-light-primary hover:bg-dark-primary px-4 py-2 rounded"
                >
                  Sign Up
                </button>
              </>
            )}
          </div>
        </header>

        
        <Routes>
          <Route path="/LogIn" element={<Login />} />
          <Route path="/Explore" element={<Explore/>} />
          <Route path="/SignUP" element={<SignUP />} />
          <Route path='' element={<Home/>}></Route>
          <Route path="/LogOut" element={<SignOut />} />
          <Route path="/dream/:id" element={<DreamDetails />} />
          <Route path="/Create" element={<Create />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/Profile/:id" element={<Profile2 />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
        </Routes>

        {/* Mobile Navbar */}
<div className="sm:hidden fixed z-50 w-full h-16 max-w-lg -translate-x-1/2 bg-white border border-gray-200 rounded-full bottom-4 left-1/2 dark:bg-gray-700 dark:border-gray-600">
  <div className="grid h-full max-w-lg grid-cols-5 mx-auto">
    {/* Home Button */}
    <button
      onClick={() => navigate("/")}
      className="inline-flex flex-col items-center justify-center px-5 rounded-s-full hover:bg-gray-50 dark:hover:bg-gray-800 group"
    >
      <svg
        className="w-5 h-5 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-light-primary dark:group-hover:text-dark-primary"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
      </svg>
      <span className="sr-only">Home</span>
    </button>

    {/* Explore Button */}
    <button
      onClick={() => navigate("/Explore")}
      className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group"
    >
      <RiMistFill 
      className="w-7 h-7 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-light-primary dark:group-hover:text-dark-primary"/>
      <span className="sr-only">Explore</span>
    </button>

    {/* Create Button */}
    {isLoggedIn && (
      <div className="flex items-center justify-center">
        <button
          onClick={() => navigate("/Create")}
          className="inline-flex items-center justify-center w-10 h-10 font-medium bg-light-primary dark:bg-dark-primary hover:bg-dark-primary rounded-full dark:hover:bg-light-primary group focus:ring-4 focus:ring-blue-300 focus:outline-none dark:focus:ring-blue-800"
        >
          <svg
            className="w-4 h-4 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 18 18"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 1v16M1 9h16"
            />
          </svg>
          <span className="sr-only">Create</span>
        </button>
      </div>
    )}

    {/* Profile Button */}
    {isLoggedIn ? (
      <button
        onClick={() => navigate("/Profile")}
        className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group"
      >
        <svg
          className="w-6 h-6 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-light-primary dark:group-hover:text-dark-primary"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
        </svg>
        <span className="sr-only">Profile</span>
      </button>
    ):(
      <button
      onClick={() => navigate("/login")}
      className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group"
    >
      <RiLoginCircleFill 
          className="w-7 h-7 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-light-primary dark:group-hover:text-dark-primary"
          />
      <span className="sr-only">Profile</span>
    </button> 
    )}
{isLoggedIn ? (
  <button
  onClick={() => navigate("/signup")}
  className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group"
>
 <RiLogoutCircleFill 
    className="w-7 h-7 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-light-primary dark:group-hover:text-dark-primary"

 />
  <span className="sr-only">Profile</span>
</button>
): (
      <button
        onClick={() => navigate("/signup")}
        className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group"
      >
       <AiOutlineUserAdd 
          className="w-7 h-7 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-light-primary dark:group-hover:text-dark-primary"

       />
        <span className="sr-only">Profile</span>
      </button>
    )}
  </div>
</div>


        {/* Footer */}
        <footer className="sm:mb-0 footer bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text py-6 text-center border-t border-gray-200 dark:border-gray-700">
          <p className="mb-2">© 2025 Dream Capture. All rights reserved.</p>
          <div className="pb-20 sm:pb-0 flex justify-center space-x-4">
            <Link to="/about" className="hover:text-light-primary dark:hover:text-dark-primary">
              About
            </Link>
            <Link
              to="/privacy"
              className="hover:text-light-primary dark:hover:text-dark-primary"
            >
              Privacy Policy
            </Link>
            <Link
              to="/contact"
              className="hover:text-light-primary dark:hover:text-dark-primary"
            >
              Contact
            </Link>
          </div>
        </footer>
      </div>
    </UserContext.Provider>
  );
}

export default App;