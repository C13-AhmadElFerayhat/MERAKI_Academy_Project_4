import React, { useContext, useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { UserContext } from "../../App";
import { useNavigate } from "react-router-dom";

function Explore() {
  const { settoggleSearch } = useContext(UserContext);
  const [articles, setArticles] = useState([]);
  const navigate = useNavigate();

  const fetch = () => {
    axios
      .get("http://localhost:5000/dreams")
      .then(function (res) {
        setArticles(res.data.articles);
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  useEffect(() => {
    fetch();
    settoggleSearch(true);
    return () => {
      settoggleSearch(false);
    };
  }, []);

  return (
    <div className="min-h-screen bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8">Explore Dreams</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {articles && articles.filter(e => e.visibility.toUpperCase() === "Public".toUpperCase()).map((e, i) => {
            
              return (
                <div
                  key={i}
                  className="max-w-sm bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
                >
                  <img
                    className="w-full h-48 object-cover"
                    onClick={()=>navigate(`/dream/${e._id}`)}
                    src={e.img}
                    alt={e.title}
                  />
                  <div className="px-6 py-4">
                    <h2 
                    onClick={()=>navigate(`/dream/${e._id}`)}
                    className="font-bold text-xl mb-2 cursor-pointer hover:text-light-primary dark:hover:text-dark-primary">{e.title}</h2>
                    <div className="flex items-center mb-4">
                      <img
                        className="w-10 h-10 rounded-full mr-4 object-contain"
                        src={e.author.img}
                        alt="Avatar"
                      />
                      <div className="text-sm">
                        <p className="text-gray-900 dark:text-gray-100 leading-none">
                        {e.author.firstName} {e.author.lastName}
                        </p>
                      </div>
                    </div>
                    <div className="text-sm">
                    <p className="text-gray-900 dark:text-gray-100 leading-none">
                      <strong>Date:</strong> {new Date(e.createdAt).toLocaleDateString()}
                    </p>
                      </div>
                    <div className="px-6 pt-4 pb-2">
                      {e.tags?.map((e, i) => (
                        <span
                          key={i}
                          className="inline-block bg-gray-200 dark:bg-gray-600 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 dark:text-gray-300 mr-2 mb-2"
                        >
                          #{e}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default Explore;
