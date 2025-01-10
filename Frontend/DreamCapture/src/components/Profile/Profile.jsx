import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../App";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { RiHeartAdd2Line, RiHeart3Fill  } from "react-icons/ri";

function Profile() {
  const [user, setUser] = useState({});
  const [activeTab, setActiveTab] = useState("Your dreams");
  const { token } = useContext(UserContext);
  const [articles, setArticles] = useState([]);
  const [Refresh, setRefresh] = useState(true)
  const [ToggleUserModal, setToggleUserModal] = useState(false)
  const [ToggleUserModal2, setToggleUserModal2] = useState(false)
const navigate = useNavigate();

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

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


    
  }, [Refresh]);


  const addFav = (idOfUser, idOfPost) => {
    let y = { idOfUser, idOfPost };
    console.log(y);
  axios
        .put("http://localhost:5000/users/fav" ,y)
        .then(function (res) {
          console.log("done");
          
        })
        .catch(function (err) {
          console.log(err);
        })
  
    }

    const removeFav = (idOfUser, idOfPost) => {
      let y = { idOfUser, idOfPost };
    axios
          .put("http://localhost:5000/users/removefav" ,y)
          .then(function (res) {
            console.log("done");
            
          })
          .catch(function (err) {
            console.log(err);
          })
    
      }

  const fecthDreams = (x) => {
axios
      .get("http://localhost:5000/dreams/search_1" ,{
        params: { id: x }, 
      })
      .then(function (res) {
        setArticles(res.data.articles)
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
          <div className="flex gap-10 mt-4">
          <p onClick={()=>{setToggleUserModal2(true)}}
           className="cursor-pointer text-light-text dark:text-dark-text hover:text-light-primary dark:hover:text-dark-primary">{user.Followers?.length} Followers</p> 
          <p className="text-light-text dark:text-dark-text hover:text-light-primary dark:hover:text-dark-primary">.</p>
           <p onClick={()=>{setToggleUserModal(true)}}
           className="cursor-pointer text-light-text dark:text-dark-text hover:text-light-primary dark:hover:text-dark-primary">{user.Following?.length} Following</p>
          </div>
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
              <h1 className="text-4xl font-bold text-center mb-8">Your Dreams</h1>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {articles && articles.map((e, i) => {
                  
                    return (
                      <div
                        key={i}
                        className="max-w-sm bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
                      >
                        <img
                          className="w-full h-48 object-cover cursor-pointer"
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
                          <div className="grid justify-center">
                          {user.Fav.map(e => e._id).includes(e._id) ? (
                          <RiHeart3Fill onClick={()=>{
                            removeFav(user._id,e._id)
                            setRefresh(!Refresh)}}
                          className="w-7 h-7 cursor-pointer hover:text-light-primary dark:hover:text-dark-primary"/>
                          ):(
                          <RiHeartAdd2Line onClick={()=>{
                            console.log(user.Fav._id);
                            addFav(user._id,e._id)
                            setRefresh(!Refresh)
                          }} className="w-7 h-7 cursor-pointer hover:text-light-primary dark:hover:text-dark-primary"/>
                          )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
            )}
            {activeTab === "Favourite" && (
              <div className="container mx-auto px-4">
              <h1 className="text-4xl font-bold text-center mb-8">Your Favourite</h1>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {user.Fav && user.Fav.map((e, i) => {
                    return (
                      <div
                        key={i}
                        className="max-w-sm bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
                      >
                        {console.log(e)}
                        <img
                          className="w-full h-48 object-cover cursor-pointer"
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
                              onClick={()=>navigate(`/profile/${e.author._id}`)}
                              className="w-10 h-10 rounded-full cursor-pointer mr-4 object-contain"
                              src={e.author.img}
                              alt="Avatar"
                            />
                            <div className="text-sm">
                              <p
                              onClick={()=>navigate(`/profile/${e.author._id}`)} 
                              className="text-gray-900 cursor-pointer hover:text-light-primary dark:hover:text-dark-primary dark:text-gray-100 leading-none">
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
                          <div className="grid justify-center">
                          {user.Fav.map(e => e._id).includes(e._id) ? (
                          <RiHeart3Fill onClick={()=>{
                            removeFav(user._id,e._id)
                            setRefresh(!Refresh)}}
                          className="w-7 h-7 cursor-pointer hover:text-light-primary dark:hover:text-dark-primary"/>
                          ):(
                          <RiHeartAdd2Line onClick={()=>{
                            console.log(user.Fav._id);
                            addFav(user._id,e._id)
                            setRefresh(!Refresh)
                          }} className="w-7 h-7 cursor-pointer hover:text-light-primary dark:hover:text-dark-primary"/>
                          )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
            )}
          </div>
        </div>
      </div>
      {ToggleUserModal && (
  <div
    className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full bg-black bg-opacity-50"
    onClick={() => setToggleUserModal(false)}
  >
    <div
      className="relative p-4 w-full max-w-2xl max-h-full bg-white rounded-lg shadow dark:bg-gray-700"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Modal Header */}
      <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
          Following List
        </h3>
        <button
          type="button"
          className="text-gray-400 bg-transparent hover:bg-red-200 hover:text-red-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-red-600 dark:hover:text-white"
          onClick={() => setToggleUserModal(false)}
        >
          <span className="sr-only">Close modal</span>
          ✕
        </button>
      </div>

      {/* Modal Body */}
      <div className="p-4 md:p-5 space-y-4">
      {console.log(user)}
        {user.Following?.length > 0 ? (
          <ul className="space-y-3">
            {user.Following.map((user, index) => (
              <li
                key={user.id || index}
                className="items-center px-2  border rounded-lg bg-gray-100 dark:bg-gray-700"
              >
                <div className="flex items-center mb-4">
                            <img
                              onClick={()=>navigate(`/profile/${user._id}`)}
                              className="w-10 h-10 rounded-full cursor-pointer mr-4 object-contain"
                              src={user.img}
                              alt="Avatar"
                            />
                            <div className="text-sm">
                              <p
                              onClick={()=>navigate(`/profile/${user._id}`)} 
                              className="text-gray-900 cursor-pointer hover:text-light-primary dark:hover:text-dark-primary dark:text-gray-100 leading-none">
                              {user.firstName} {user.lastName}
                              </p>
                            </div>
                          </div>
                
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 dark:text-gray-400">
            No users available.
          </p>
        )}
      </div>

      {/* Modal Footer */}
      <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
        <button
          onClick={() => setToggleUserModal(false)}
          className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
        >
          Close
        </button>
      </div>
    </div>
  </div>
)}
{ToggleUserModal2 && (
  <div
    className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full bg-black bg-opacity-50"
    onClick={() => setToggleUserModal2(false)}
  >
    <div
      className="relative p-4 w-full max-w-2xl max-h-full bg-white rounded-lg shadow dark:bg-gray-700"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Modal Header */}
      <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
          Followers List
        </h3>
        <button
          type="button"
          className="text-gray-400 bg-transparent hover:bg-red-200 hover:text-red-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-red-600 dark:hover:text-white"
          onClick={() => setToggleUserModal2(false)}
        >
          <span className="sr-only">Close modal</span>
          ✕
        </button>
      </div>

      {/* Modal Body */}
      <div className="p-4 md:p-5 space-y-4">
      {console.log(user)}
        {user.Followers?.length > 0 ? (
          <ul className="space-y-3">
            {user.Followers.map((user, index) => (
              <li
                key={user.id || index}
                className="items-center px-2  border rounded-lg bg-gray-100 dark:bg-gray-700"
              >
                <div className="flex items-center mb-4">
                            <img
                              onClick={()=>navigate(`/profile/${user._id}`)}
                              className="w-10 h-10 rounded-full cursor-pointer mr-4 object-contain"
                              src={user.img}
                              alt="Avatar"
                            />
                            <div className="text-sm">
                              <p
                              onClick={()=>navigate(`/profile/${user._id}`)} 
                              className="text-gray-900 cursor-pointer hover:text-light-primary dark:hover:text-dark-primary dark:text-gray-100 leading-none">
                              {user.firstName} {user.lastName}
                              </p>
                            </div>
                          </div>
                
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 dark:text-gray-400">
            No users available.
          </p>
        )}
      </div>

      {/* Modal Footer */}
      <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
        <button
          onClick={() => setToggleUserModal2(false)}
          className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
        >
          Close
        </button>
      </div>
    </div>
  </div>
)}
    </div>
  );
}

export default Profile;
