import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function DreamDetails() {
  const [Dream, setDream] = useState(null);

  const { id } = useParams();

  const fetch = () => {
    axios
      .get(`http://localhost:5000/dreams/search_2/${id}`)
      .then(function (res) {
        setDream(res.data.article);
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  useEffect(() => {
    fetch();
  }, []);

  return (
    <div className="min-h-screen bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text">
      {Dream ? (
        <div>
          <div className="w-full h-96 overflow-hidden">
            <img
              className="w-full h-full object-cover"
              src={Dream.img}
              alt={Dream.title}
            />
          </div>
          <div className="max-w-4xl mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold mb-4">{Dream.title}</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              <strong>Date:</strong> {new Date(Dream.createdAt).toLocaleDateString()}
            </p>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              <strong>Mood:</strong> {Dream.mood || "Not Specified"}
            </p>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              <strong>Is Lucid?</strong> {Dream.isLucid ? "Yes" : "No"}
            </p>
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Tags</h2>
              <div className="flex flex-wrap gap-2">
                {Dream.tags?.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-block bg-teal-100 dark:bg-teal-700 text-teal-800 dark:text-teal-200 rounded-full px-3 py-1 text-sm font-semibold"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-2">Description</h2>
              <p className="text-gray-700 dark:text-gray-300">{Dream.description}</p>
            </div>
            <div className="flex space-x-4">
              <button className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded">
                Edit
              </button>
              <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
                Delete
              </button>
            </div>
            
          </div>
          
        </div>
      ) : (
        <div className="flex justify-center items-center h-screen">
          <p className="text-gray-600 dark:text-gray-400">Loading dream details...</p>
        </div>
      )}
    </div>
  );
}

export default DreamDetails;
