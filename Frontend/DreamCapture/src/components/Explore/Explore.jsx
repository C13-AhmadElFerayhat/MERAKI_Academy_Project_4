import React, { useContext, useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { UserContext } from "../../App";
import { useNavigate } from "react-router-dom";
import { RiHeartAdd2Line, RiHeart3Fill } from "react-icons/ri";
import { FiSearch } from "react-icons/fi";


function Explore() {
  const { settoggleSearch,isLoggedIn,token } = useContext(UserContext);
  const [articles, setArticles] = useState([]);
  const navigate = useNavigate();
  const [Refresh, setRefresh] = useState(true)
  const [user, setUser] = useState({});
  const [articles2, setArticles2] = useState([]);

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const fetch = () => {
    if (isLoggedIn){
      axios
      .get(`http://localhost:5000/users`, config)
      .then((response) => {
        setUser(response.data.User);
      })
      .catch((error) => {
        console.error(error);
      })
    }
    axios
      .get("http://localhost:5000/dreams")
      .then(function (res) {
        setArticles(res.data.articles);    
        setArticles2(res.data.articles) 
        
      })
      .catch(function (err) {
        console.log(err);
      });
  };

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

  useEffect(() => {
    fetch();
    
  }, [Refresh]);

  return (
    <div className="min-h-screen bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8">Explore Dreams</h1>
        <div className="flex items-center w-full max-w-md mx-auto mt-2 pb-10 md:mt-0 ">
    <input
      
      onChange={(e)=>{setArticles2(articles.filter((e2)=> e2.title.includes(e.target.value) || e2.description.toUpperCase().includes(e.target.value.toUpperCase()) || e2.title.toUpperCase().includes(e.target.value.toUpperCase())))}}
      className="w-full p-4 pr-12 text-gray-900 border-2 border-light-primary rounded-lg bg-gray-50 focus:ring-2 focus:ring-light-primary focus:outline-none dark:bg-gray-800 dark:border-dark-primary dark:placeholder-gray-400 dark:text-white dark:focus:ring-dark-primary"
      placeholder="Search..."
      required
    />
  </div>
  {console.log(articles, articles2)}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {articles2 && articles2.filter(e => e.visibility.toUpperCase() === "Public".toUpperCase()).map((e, i) => {
            
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
                          {isLoggedIn && <div className="grid justify-center">
                          {user.Fav?.map(e => e._id).includes(e._id) ? (
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
                          </div>}
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
