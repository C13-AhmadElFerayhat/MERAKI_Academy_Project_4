import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../App";
import axios from "axios";

function Profile() {
  const [user, setUser] = useState({});
  const [activeTab, setActiveTab] = useState("Your dreams");
  const { token } = useContext(UserContext);
  const [articles, setArticles] = useState([]);
const [auther, setauther] = useState({})

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const saveId = (x) => {
    setauther({auther: x})
  }

  useEffect(() => {
    
    axios
      .get(`http://localhost:5000/users`, config)
      .then((response) => {
        setUser(response.data.User);
        fecthDreams(response.data.User._id)
      })
      .catch((error) => {
        console.error(error);
      })

      setauther({auther: user._id})

    
  }, []);

  const fecthDreams = (x) => {
  let y = {id: x}
axios
      .get("http://localhost:5000/dreams/search_1" ,{
        params: { id: x }, 
      })
      .then(function (res) {
        setArticles(res.data.articles);
      })
      .catch(function (err) {
        console.log(err);
      })

  }

  const handleShowProfile = () => {
    alert("Show profile functionality goes here!");
  };

  return (
    <div className="min-h-screen bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text p-6 flex justify-center items-center">
      <div className="min-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <div className="flex flex-col items-center mb-6">
          <img
            className="w-20 h-20 rounded-full object-cover mb-4"
            src={user.img || "https://via.placeholder.com/150"} 
            alt="Avatar"
          />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            {user.firstName} {user.lastName}
          </h2>
          <button
            onClick={handleShowProfile}
            className="bg-light-primary text-light-text dark:bg-dark-primary dark:text-dark-text hover:text-dark-text dark:hover:text-light-text dark:hover:bg-light-primary hover:bg-dark-primary mt-4 px-4 py-2 font-medium rounded-lg shadow-md focus:ring-opacity-75"
          >
            Show Profile
          </button>
        </div>
        <div>
          <div className="mb-4 border-b border-gray-200 dark:border-gray-700">
            <ul
              className="flex flex-wrap -mb-px text-sm font-medium text-center"
              role="tablist"
            >
              <li className="me-2" role="presentation">
                <button
                  className={`inline-block p-4 border-b-2 rounded-t-lg ${
                    activeTab === "Your dreams"
                      ? "border-light-primary dark:border-dark-primary text-light-text dark:text-dark-text hover:text-light-primary dark:hover:text-dark-primary"
                      : "border-transparent hover:text-light-primary hover:border-light-primary dark:hover:text-dark-primary dark:hover:border-dark-primary dark:hover:text-dark-primary"
                  }`}
                  onClick={() => setActiveTab("Your dreams")}
                  type="button"
                  role="tab"
                  aria-selected={activeTab === "Your dreams"}
                >
                  Your Dreams
                </button>
              </li>
              <li className="me-2" role="presentation">
                <button
                  className={`inline-block p-4 border-b-2 rounded-t-lg ${
                    activeTab === "Favourite"
                       ? "border-light-primary dark:border-dark-primary text-light-text dark:text-dark-text hover:text-light-primary dark:hover:text-dark-primary"
                      : "border-transparent hover:text-light-primary hover:border-light-primary dark:hover:text-dark-primary dark:hover:border-dark-primary dark:hover:text-dark-primary"
                  }`}
                  onClick={() => setActiveTab("Favourite")}
                  type="button"
                  role="tab"
                  aria-selected={activeTab === "Favourite"}
                >
                  Favourite
                </button>
              </li>
            </ul>
          </div>

          {/* Tab Content */}
          <div>
            {activeTab === "Your dreams" && (
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
            )}
            {activeTab === "Favourite" && (
              <div
                className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800"
                role="tabpanel"
              >
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  This is some placeholder content for the{" "}
                  <strong className="font-medium text-gray-800 dark:text-white">
                    Favourite
                  </strong>{" "}
                  tab.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
