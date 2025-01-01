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

export const UserContext = createContext();

function App() {
  const [token, setToken] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [toggleSearch, settoggleSearch] = useState(false)


  return (
    <UserContext.Provider value={{ token, setToken, setIsLoggedIn ,settoggleSearch}}>
      <div className={`${isDarkMode ? "dark" : ""} font-varela`}>
        {/* Navbar */}
        <header className="navbar bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text sticky top-0 flex justify-between items-center p-4 shadow-md border-t border-gray-200 dark:border-white-700">
          <div className="logo flex items-center">
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
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100"
            >
              {isDarkMode ? "Light Mode" : "Dark Mode"}
            </button>
            {isLoggedIn ? (
              <>
                <button
                  onClick={() => navigate("/Profile")}
                  className="bg-light-primary dark:bg-dark-primary text-light-text dark:text-dark-text px-4 py-2 rounded"
                >
                  Profile
                </button>
                <button
                  onClick={() => navigate("/LogOut")}
                  className="bg-light-primary dark:bg-dark-primary text-light-text dark:text-dark-text px-4 py-2 rounded"
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
        </Routes>

        {/* Footer */}
        <footer className="footer bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text py-6 text-center border-t border-gray-200 dark:border-gray-700">
          <p className="mb-2">© 2024 Dream Log. All rights reserved.</p>
          <div className="flex justify-center space-x-4">
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
