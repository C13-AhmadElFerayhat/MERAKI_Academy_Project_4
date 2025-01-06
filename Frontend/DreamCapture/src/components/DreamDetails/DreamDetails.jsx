import React, { useEffect, useState,useContext } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { UserContext }  from '../../App';

function DreamDetails() {
  const [Dream, setDream] = useState(null);
  const [newComment, setnewComment] = useState({})
  const [Refresh, setRefresh] = useState(true)
  const { id } = useParams();
  const {user, token} = useContext(UserContext);
  const [Res, setRes] = useState("")


  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };


  const createComment = (com, dId) => {
    console.log(com);
    let addedCom = newComment;
    console.log(addedCom);
        
    axios
      .post(`http://localhost:5000/dreams/${dId}/comments`, com, config)
      .then((res) => {
        setRefresh(!Refresh)
        setRes(res.data.message)
      })
      .catch((err) => console.error(err));
  };

  const fetch = () => {
    axios
      .get(`http://localhost:5000/dreams/search_2/${id}`)
      .then((res) => {
        setDream(res.data.article);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetch();
  }, [Refresh]);

  return (
    <div className="min-h-screen bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text">
      {Dream ? (
        <div>
          {/* Image Section */}
          <div className="w-full h-96 overflow-hidden">
            <img
              className="w-full h-full object-cover"
              src={Dream.img}
              alt={Dream.title}
            />
          </div>

          {/* Dream Details */}
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

            {/* Tags */}
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Tags</h2>
              <div className="flex flex-wrap gap-2">
                {Dream.tags?.map((tag, i) => (
                  <span
                    key={i}
                    className="inline-block bg-teal-100 dark:bg-teal-700 text-teal-800 dark:text-teal-200 rounded-full px-3 py-1 text-sm font-semibold"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-2">Description</h2>
              <p className="text-gray-700 dark:text-gray-300">{Dream.description}</p>
            </div>

            {/* Buttons */}
            <div className="flex space-x-4">
              <button className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded">
                Edit
              </button>
              <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
                Delete
              </button>
            </div>
          </div>

          {/* Comment Section */}
          <section className="bg-light-bg dark:bg-dark-bg py-8 px-4 lg:px-0 lg:py-16">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-lg lg:text-2xl font-bold mb-6">
                Discussion ({Dream.comments.length})
              </h2>
              {/* Add Comment */}

              {user && (<div className="mb-6">
                <textarea
                  onChange={(e) => setnewComment({comment: e.target.value})}
                  rows="2"
                  placeholder="Write a comment..."
                  className="w-full p-4 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-teal-500 focus:border-teal-500"
                ></textarea>
                <label className="block text-gray-400 dark:text-gray-500 mb-2">
                {Res}..
                </label>
                <button
                  onClick={() => {    
                    createComment(newComment, Dream._id)}}
                 className="mt-4 bg-teal-500 hover:bg-teal-600 text-white py-2 px-4 rounded font-semibold">
                  Post Comment
                </button>
              </div>)}
              

              {/* Comments List */}
              {Dream.comments.map((e, i) => (
                <div
                  key={i}
                  className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-4 mb-4"
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                      <img
                        src={e.commenter.img || "https://via.placeholder.com/150"}
                        alt={`${e.commenter.firstName} ${e.commenter.lastName}`}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <h4 className="font-bold text-gray-900 dark:text-white">
                          {e.commenter.firstName} {e.commenter.lastName}
                        </h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {new Date(e.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                  <p className="mt-2 text-gray-700 dark:text-gray-300">{e.comment}</p>
                </div>
              ))}
            </div>
          </section>
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
