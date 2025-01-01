import React from 'react'
import './Home.css'
import { Link, Route, Routes, useNavigate } from "react-router-dom";

function Home() {

  const navigate = useNavigate()

  return (
    <main className="hero bg-gradient-to-br from-sky-100 to-cyan-500 dark:bg-gradient-to-br dark:from-sky-600 dark:to-teal-900 bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text flex flex-col items-center justify-center py-20 min-h-screen ">
    <h1 className="text-4xl md:text-6xl font-bold text-center mb-4">
      Capture Your Dreams, Discover Yourself.
    </h1>
    <p className="text-lg text-center mb-8 max-w-xl">
      Log, explore, and reflect on your dreams in a secure and insightful space.
    </p>
    <div className="flex space-x-4">
      <button
        onClick={() => navigate("/SignUP")}
        className="bg-light-primary dark:bg-dark-primary text-light-text dark:text-dark-text px-6 py-3 rounded text-lg"
      >
        Get Started
      </button>
      <button
        onClick={() => navigate("/Explore")}
        className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-6 py-3 rounded text-lg"
      >
        Explore Dreams
      </button>
    </div>
  </main>
  )
}

export default Home