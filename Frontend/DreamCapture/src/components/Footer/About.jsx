import React from "react";

const About = () => {
  return (
    <div className="min-h-screen bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text p-6 sm:p-12">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-6">About Dream Capture</h1>
        <p className="text-lg leading-relaxed">
          Dream Capture is your ultimate platform to document, explore, and share your dreams.
          Whether you want to analyze your dreams, find inspiration, or connect with others,
          Dream Capture makes it simple and accessible. Our mission is to empower individuals to
          embrace their imagination and creativity.
        </p>
        <img
          src="src/assets/Untitled-6.jpg"
          alt="About Dream Capture"
          className="w-full h-auto mt-8 rounded-lg shadow-lg"
        />
        <p className="text-lg mt-6">
          Join thousands of dreamers and make your dreams unforgettable.
        </p>
      </div>
    </div>
  );
};

export default About;
