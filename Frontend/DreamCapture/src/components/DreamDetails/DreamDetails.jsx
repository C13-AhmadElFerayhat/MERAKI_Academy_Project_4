import React, { useEffect, useState,useContext } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext }  from '../../App';
import { FiEdit } from "react-icons/fi";
import { FiXCircle } from "react-icons/fi";


function DreamDetails() {
  const [Dream, setDream] = useState(null);
  const [newComment, setnewComment] = useState({})
  const [Refresh, setRefresh] = useState(true)
  const { id } = useParams();
  const {user, token, isLoggedIn} = useContext(UserContext);
  const [Res, setRes] = useState("")
  const [toggleDelete, settoggleDelete] = useState(false)
  const [toggletitleEdit, settoggletitleEdit] = useState(false)
  const [togglemoodEdit, settogglemoodEdit] = useState(false)
  const [toggletagsEdit, settoggletagsEdit] = useState(false)
  const [toggleDesEdit, settoggleDesEdit] = useState(false)
  const [toggleImgEdit, settoggleImgEdit] = useState(false)
  const [toggleLucidEdit, settoggleLucidEdit] = useState(false)
  const [newDream, setnewDream] = useState({});
  const [newTags, setnewTags] = useState([]);
  const navigate = useNavigate()
  

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };


  const createComment = (com, dId) => {
    
        
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

  const deleteById = (x) => {

    console.log(x);
    
            
    axios.delete(`http://localhost:5000/dreams/${x}`)
      .then(function (rese) {
        fetch()     
      })
      .catch(function (err) {
       console.log(err);
      });
}
const updateById = (x) => {
          
  axios.put(`http://localhost:5000/dreams/${x}`,newDream ,config)
    .then(function (rese) {
      fetch()     
    })
    .catch(function (err) {
     console.log(err);
    });
}

const uploadHandler = (x) => {
  const data = new FormData();
  data.append("file", x);
  data.append("upload_preset", "l2udrjei");

  axios
    .post("https://api.cloudinary.com/v1_1/dl7wtfv68/upload", data)
    .then(function (rese) {
      setnewDream({img: rese.data.url });
    })
    .catch(function (err) {
      console.log(err.response.data.message);
    });
};

const addTag = (idOfUser, idOfPost) => {
  let y = { idOfUser, idOfPost };
  console.log(y);
axios
      .put("http://localhost:5000/dreams/addTag" ,y)
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
    <div className="min-h-screen bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text">
      {Dream ? (
        <div>
          {/* Image Section */}
          <div className="relative w-full h-96 overflow-hidden">
  <img
    className="w-full h-full object-cover"
    src={Dream.img}
    alt={Dream.title}
  />
  {isLoggedIn && user._id === Dream.author && (
    <button
      className="absolute bottom-4 right-4 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-full p-2 shadow hover:bg-gray-100 dark:hover:bg-gray-700"
      onClick={() => settoggleImgEdit(true)} 
    >
      <FiEdit className="w-5 h-5" />
    </button>
  )}
</div>

          {/* Dream Details */}
          <div className="max-w-4xl mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold mb-4 flex items-center space-x-2">
  {Dream.title}
  {isLoggedIn && user._id === Dream.author && (
    <FiEdit 
      className="text-gray-500 dark:text-gray-400 hover:text-light-primary dark:hover:text-dark-primary cursor-pointer p-2 gap-0.5"
      onClick={() => settoggletitleEdit(true)} 
    />
  )}
</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              <strong>Date:</strong> {new Date(Dream.createdAt).toLocaleDateString()}
            </p>
            <p className="text-gray-600 gap-1 dark:text-gray-400 mb-4 flex items-center space-x-2">
  <strong>Mood:</strong> {Dream.mood || "Not Specified"}
  {isLoggedIn && user._id === Dream.author && (
    <FiEdit 
      className="text-gray-500 dark:text-gray-400 hover:text-light-primary dark:hover:text-dark-primary cursor-pointer"
      onClick={() => settogglemoodEdit(true)} 
    />
  )}
</p>
            <p className="text-gray-600 gap-1 flex items-center space-x-2 dark:text-gray-400 mb-6">
              <strong>Is Lucid?</strong> {Dream.isLucid ? "Yes" : "No"}
              {isLoggedIn && user._id === Dream.author && (
    <FiEdit 
      className="text-gray-500 dark:text-gray-400 hover:text-light-primary dark:hover:text-dark-primary cursor-pointer"
      onClick={() => settoggleLucidEdit(true)} 
    />
  )}
            </p>

            {isLoggedIn && user._id === Dream.author && (<p className="text-gray-600 flex gap-1 items-center space-x-2 dark:text-gray-400 mb-6">
              <strong>Visibility:</strong> {Dream.visibility.toUpperCase()}
              {isLoggedIn && user._id === Dream.author && (
    <FiEdit 
      className="text-gray-500 dark:text-gray-400 hover:text-light-primary dark:hover:text-dark-primary cursor-pointer"
      onClick={() => settogglemoodEdit(true)} 
    />
  )}
            </p>
            )}
            {/* Tags */}
            <div className="mb-6 flex items-center space-x-2">
  <h2 className="text-xl font-semibold">Tags</h2>
  {isLoggedIn && user._id === Dream.author && (
    <FiEdit 
      className="text-gray-500 dark:text-gray-400 hover:text-light-primary dark:hover:text-dark-primary cursor-pointer"
      onClick={() => settoggletagsEdit(true)} 
    />
  )}
</div>
<div className="flex flex-wrap">
  {Dream.tags?.map((tag, i) => (
    <div className="flex flex-wrap">
    <span
      key={i}
      className="mb-5	inline-block bg-teal-100 dark:bg-teal-700 text-teal-800 dark:text-teal-200 rounded-full px-3 py-1 text-sm font-semibold mx-1"
    >
      #{tag}
    </span>
    {isLoggedIn && user._id === Dream.author && (<FiXCircle 
    onClick={(e)=>{console.log(e);
    }}
    className="relative cursor-pointer top-1 left-0 text-red-900 dark:text-red-300 hover:text-red-300 hover:dark:text-red-900"/>)}
    </div>
  ))}
</div>

            {/* Description */}
            <div className="mb-8">
  <h2 className="text-xl font-semibold flex items-center space-x-2">
    <span>Description</span>
    {isLoggedIn && user._id === Dream.author && (
      <FiEdit 
        className="text-gray-500 dark:text-gray-400 hover:text-light-primary dark:hover:text-dark-primary cursor-pointer"
        onClick={() => settoggleDesEdit(true)}
      />
    )}
  </h2>
  <p className="text-gray-700 dark:text-gray-300 mt-5 ">{Dream.description}</p>
</div>

            {/* Buttons */}

            {isLoggedIn && user._id == Dream.author && (
              
              <div className="flex space-x-4">
              
              {/* Edit sectin here */}

              <button 
              onClick={()=>{settoggleDelete(true)}}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
                Delete
              </button>
              {toggleDelete && (
                  <div
                  className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full bg-black bg-opacity-50"
                  onClick={() => settoggleDelete(false)}
                >
                  <div
                    className="relative p-4 w-full max-w-2xl max-h-full bg-white rounded-lg shadow dark:bg-gray-700"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {/* Modal Header */}
                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                      "Delete Notice"
                      </h3>
                      <button
                        type="button"
                        className="text-gray-400 bg-transparent hover:bg-red-200 hover:text-red-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-red-600 dark:hover:text-white"
                        onClick={() => settoggleDelete(false)}
                      >
                        <span className="sr-only">Close modal</span>
                        ✕
                      </button>
                    </div>
            
                    {/* Modal Body */}
                    <div className="p-4 md:p-5 space-y-4">
                      <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                        {`Are you sure you want to delete "${Dream?.title}" dream?`}
                      </p>
                      <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                      Note: you can't redo this action.
                      </p>
                    </div>
            
                    {/* Modal Footer */}
                    <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                      <button
                        onClick={() => {deleteById(Dream._id)
                          alert (`The dream "${Dream.title}" has been removed`)
                        navigate(-1)
                        }
                        }
                        className="bg-light-primary dark:bg-dark-primary text-light-text dark:text-dark-text hover:text-dark-text dark:hover:text-light-text dark:hover:bg-light-primary hover:bg-dark-primary focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-blue-800"
                      >
                        Yes
                      </button>
                      <button
                        onClick={() => settoggleDelete(false)}
                        className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                      >
                        Decline
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>)}
            
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
                 className="mt-4 bg-light-primary dark:bg-dark-primary text-light-text dark:text-dark-text hover:text-dark-text dark:hover:text-light-text dark:hover:bg-light-primary hover:bg-dark-primary py-2 px-4 rounded font-semibold">
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
          {toggleImgEdit && (
                  <div
                  className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full bg-black bg-opacity-50"
                  onClick={() => settoggleImgEdit(false)}
                >
                  <div
                    className="relative p-4 w-full max-w-2xl max-h-full bg-white rounded-lg shadow dark:bg-gray-700"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {/* Modal Header */}
                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                      "Update Cover Image"
                      </h3>
                      <button
                        type="button"
                        className="text-gray-400 bg-transparent hover:bg-red-200 hover:text-red-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-red-600 dark:hover:text-white"
                        onClick={() => settoggleImgEdit(false)}
                      >
                        <span className="sr-only">Close modal</span>
                        ✕
                      </button>
                    </div>
            
                    {/* Modal Body */}
                    <div className="p-4 md:p-5 space-y-4">
                      <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                        {`Please choose the new cover image for "${Dream?.title}" dream?`}
                      </p>
                      <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                      Note: you can't redo this action.
                      </p>
                      <input
            type="file"
            onChange={(e) => {
            
              uploadHandler(e.target.files[0])
            }}
            className="min-w-full px-4 py-2 border rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-200"
          />
          {newDream.img && (<img
        src={newDream.img}
        alt="Logo"
        className="h-20 cursor-pointer block m-auto mb-8"
        />
    )}
                    </div>
            
                    {/* Modal Footer */}
                    <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                      <button
                        onClick={() => {updateById(Dream._id)
                          alert (`The dream "${Dream.title}" has been updated`)
                        }
                        }
                        className="bg-light-primary dark:bg-dark-primary text-light-text dark:text-dark-text hover:text-dark-text dark:hover:text-light-text dark:hover:bg-light-primary hover:bg-dark-primary focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-blue-800"
                      >
                        Yes
                      </button>
                      <button
                        onClick={() => settoggleImgEdit(false)}
                        className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                      >
                        Decline
                      </button>
                    </div>
                  </div>
                </div>
              )}
              {toggletitleEdit && (
                  <div
                  className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full bg-black bg-opacity-50"
                  onClick={() => settoggletitleEdit(false)}
                >
                  <div
                    className="relative p-4 w-full max-w-2xl max-h-full bg-white rounded-lg shadow dark:bg-gray-700"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {/* Modal Header */}
                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                      "Update Title"
                      </h3>
                      <button
                        type="button"
                        className="text-gray-400 bg-transparent hover:bg-red-200 hover:text-red-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-red-600 dark:hover:text-white"
                        onClick={() => settoggletitleEdit(false)}
                      >
                        <span className="sr-only">Close modal</span>
                        ✕
                      </button>
                    </div>
            
                    {/* Modal Body */}
                    <div className="p-4 md:p-5 space-y-4">
                      <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                        {`Please choose the new cover image for "${Dream?.title}" dream?`}
                      </p>
                      <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                      Note: you can't redo this action.
                      </p>
                      <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 mb-2">
            Title
          </label>
          <input
            type="text"
            placeholder="Add a title..."
            value={newDream.title}
            onChange={(e) =>
              setnewDream({title: e.target.value })
            }
            className="w-full px-4 py-2 border rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-200"
          />
        </div>
                    </div>
            
                    {/* Modal Footer */}
                    <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                      <button
                        onClick={() => {updateById(Dream._id)
                          alert (`The dream "${Dream.title}" has been updated`)
                        }
                        }
                        className="bg-light-primary dark:bg-dark-primary text-light-text dark:text-dark-text hover:text-dark-text dark:hover:text-light-text dark:hover:bg-light-primary hover:bg-dark-primary focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-blue-800"
                      >
                        Yes
                      </button>
                      <button
                        onClick={() => settoggletitleEdit(false)}
                        className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                      >
                        Decline
                      </button>
                    </div>
                  </div>
                </div>
              )}
              {togglemoodEdit && (
                  <div
                  className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full bg-black bg-opacity-50"
                  onClick={() => settogglemoodEdit(false)}
                >
                  <div
                    className="relative p-4 w-full max-w-2xl max-h-full bg-white rounded-lg shadow dark:bg-gray-700"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {/* Modal Header */}
                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                      "Update Mood"
                      </h3>
                      <button
                        type="button"
                        className="text-gray-400 bg-transparent hover:bg-red-200 hover:text-red-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-red-600 dark:hover:text-white"
                        onClick={() => settogglemoodEdit(false)}
                      >
                        <span className="sr-only">Close modal</span>
                        ✕
                      </button>
                    </div>
            
                    {/* Modal Body */}
                    <div className="p-4 md:p-5 space-y-4">
                      <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                        {`Please choose the new mood for "${Dream?.title}" dream?`}
                      </p>
                      <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                      Note: you can't redo this action.
                      </p>
                      <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 mb-2">
            Mood
          </label>
          <input
            type="text"
            placeholder="Add a mood... (One word)"
            value={newDream.mood}
            onChange={(e) => {
                e.target.value=e.target.value.split(" ").join("")
                console.log(e.target.value);
                setnewDream({mood: e.target.value })}
            }
            className="w-full px-4 py-2 border rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-200"
          />
          <label className="block text-gray-400 dark:text-gray-500 mb-2">
            (Happy, Sad, Hopeful, Fearful, etc...)
          </label>
        </div>
                    </div>
            
                    {/* Modal Footer */}
                    <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                      <button
                        onClick={() => {updateById(Dream._id)
                          alert (`The dream "${Dream.title}" has been updated`)
                        }
                        }
                        className="bg-light-primary dark:bg-dark-primary text-light-text dark:text-dark-text hover:text-dark-text dark:hover:text-light-text dark:hover:bg-light-primary hover:bg-dark-primary focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-blue-800"
                      >
                        Yes
                      </button>
                      <button
                        onClick={() => settogglemoodEdit(false)}
                        className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                      >
                        Decline
                      </button>
                    </div>
                  </div>
                </div>
              )}
              {toggletagsEdit && (
                  <div
                  className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full bg-black bg-opacity-50"
                  onClick={() => settoggletagsEdit(false)}
                >
                  <div
                    className="relative p-4 w-full max-w-2xl max-h-full bg-white rounded-lg shadow dark:bg-gray-700"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {/* Modal Header */}
                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                      "Update Tags"
                      </h3>
                      <button
                        type="button"
                        className="text-gray-400 bg-transparent hover:bg-red-200 hover:text-red-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-red-600 dark:hover:text-white"
                        onClick={() => settoggletagsEdit(false)}
                      >
                        <span className="sr-only">Close modal</span>
                        ✕
                      </button>
                    </div>
            
                    {/* Modal Body */}
                    <div className="p-4 md:p-5 space-y-4">
                      <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                        {`Please add the new Tags for "${Dream?.title}" dream?`}
                      </p>
                      <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                      Note: you can't redo this action.
                      </p>
                      <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 mb-2">
            Add Tags
          </label>
          <input
            type="text"
            placeholder="Press Enter or Space to add a tag.."
            onKeyDown={(e) => {                
              if (e.key === "Enter" || e.key === " ") {
                if (e.target.value !== "") {
                  console.log(Dream._id, e.target.value);
                  
                  setnewTags([...newTags, e.target.value]);
                  addTag(Dream._id, e.target.value)
                  e.target.value = "";
                }
              }
            }}
            className="w-full px-4 py-2 border rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-200"
          />
          <div className="mt-2 flex flex-wrap gap-2">
            {newTags?.map((tag, index) => (
              <span
                key={index}
                className="inline-block bg-teal-100 dark:bg-teal-700 text-teal-800 dark:text-teal-200 rounded-full px-3 py-1 text-sm font-semibold"
              >
                #{tag}
              </span>
            ))}
          </div>
          <label className="block text-gray-400 dark:text-gray-500 mb-2">
            Press "Enter" or "Space" to add a tag..
          </label>
        </div>
                    </div>
            
                    {/* Modal Footer */}
                    <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                      <button
                        onClick={(e) => {addTag(Dream._id, e.target.value)
                          console.log(Dream._id, );
                          alert (`The dream "${Dream.title}" has been updated`)
                        }
                        }
                        className="bg-light-primary dark:bg-dark-primary text-light-text dark:text-dark-text hover:text-dark-text dark:hover:text-light-text dark:hover:bg-light-primary hover:bg-dark-primary focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-blue-800"
                      >
                        Done
                      </button>
                      <button
                        onClick={() => settoggletagsEdit(false)}
                        className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                      >
                        Decline
                      </button>
                    </div>
                  </div>
                </div>
              )}
              {toggleLucidEdit && (
                  <div
                  className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full bg-black bg-opacity-50"
                  onClick={() => settoggleLucidEdit(false)}
                >
                  <div
                    className="relative p-4 w-full max-w-2xl max-h-full bg-white rounded-lg shadow dark:bg-gray-700"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {/* Modal Header */}
                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                      "Update Lucid"
                      </h3>
                      <button
                        type="button"
                        className="text-gray-400 bg-transparent hover:bg-red-200 hover:text-red-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-red-600 dark:hover:text-white"
                        onClick={() => settoggleLucidEdit(false)}
                      >
                        <span className="sr-only">Close modal</span>
                        ✕
                      </button>
                    </div>
            
                    {/* Modal Body */}
                    <div className="p-4 md:p-5 space-y-4">
                      <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                        {`Please choose the new Lucid for "${Dream?.title}" dream`}
                      </p>
                      <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                      Note: you can't redo this action.
                      </p>
                      <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 mb-2">
            Is Lucid?
          </label>
          <select
            value={newDream.isLucid}
            onChange={(e) =>
              setnewDream({ ...newDream, isLucid: e.target.value })
            }
            className="w-full px-4 py-2 border rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-200"
          >
            <option value={true}>Yes</option>
            <option value={false}>No</option>
          </select>
        </div>
                    </div>
            
                    {/* Modal Footer */}
                    <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                      <button
                        onClick={() => {updateById(Dream._id)
                          alert (`The dream "${Dream.title}" has been updated`)
                        }
                        }
                        className="bg-light-primary dark:bg-dark-primary text-light-text dark:text-dark-text hover:text-dark-text dark:hover:text-light-text dark:hover:bg-light-primary hover:bg-dark-primary focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-blue-800"
                      >
                        Yes
                      </button>
                      <button
                        onClick={() => settoggleLucidEdit(false)}
                        className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                      >
                        Decline
                      </button>
                    </div>
                  </div>
                </div>
              )}
              {toggleDesEdit && (
                  <div
                  className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full bg-black bg-opacity-50"
                  onClick={() => settoggleDesEdit(false)}
                >
                  <div
                    className="relative p-4 w-full max-w-2xl max-h-full bg-white rounded-lg shadow dark:bg-gray-700"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {/* Modal Header */}
                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                      "Update Description"
                      </h3>
                      <button
                        type="button"
                        className="text-gray-400 bg-transparent hover:bg-red-200 hover:text-red-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-red-600 dark:hover:text-white"
                        onClick={() => settoggleDesEdit(false)}
                      >
                        <span className="sr-only">Close modal</span>
                        ✕
                      </button>
                    </div>
            
                    {/* Modal Body */}
                    <div className="p-4 md:p-5 space-y-4">
                      <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                        {`Please choose the new Description for "${Dream?.title}" dream?`}
                      </p>
                      <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                      Note: you can't redo this action.
                      </p>
                      <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 mb-2">
            Description
          </label>
          <textarea
            placeholder="Add a description..."
            value={newDream.description}
            onChange={(e) =>
              setnewDream({ ...newDream, description: e.target.value })
            }
            className="w-full px-4 py-2 border rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-200"
          ></textarea>
        </div>
                    </div>
            
                    {/* Modal Footer */}
                    <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                      <button
                        onClick={() => {updateById(Dream._id)
                          alert (`The dream "${Dream.title}" has been updated`)
                        }
                        }
                        className="bg-light-primary dark:bg-dark-primary text-light-text dark:text-dark-text hover:text-dark-text dark:hover:text-light-text dark:hover:bg-light-primary hover:bg-dark-primary focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-blue-800"
                      >
                        Yes
                      </button>
                      <button
                        onClick={() => settoggleDesEdit(false)}
                        className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                      >
                        Decline
                      </button>
                    </div>
                  </div>
                </div>
              )}
              {toggleDesEdit && (
                  <div
                  className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full bg-black bg-opacity-50"
                  onClick={() => settoggleDesEdit(false)}
                >
                  <div
                    className="relative p-4 w-full max-w-2xl max-h-full bg-white rounded-lg shadow dark:bg-gray-700"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {/* Modal Header */}
                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                      "Update Description"
                      </h3>
                      <button
                        type="button"
                        className="text-gray-400 bg-transparent hover:bg-red-200 hover:text-red-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-red-600 dark:hover:text-white"
                        onClick={() => settoggleDesEdit(false)}
                      >
                        <span className="sr-only">Close modal</span>
                        ✕
                      </button>
                    </div>
            
                    {/* Modal Body */}
                    <div className="p-4 md:p-5 space-y-4">
                      <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                        {`Please choose the new Description for "${Dream?.title}" dream?`}
                      </p>
                      <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                      Note: you can't redo this action.
                      </p>
                      <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 mb-2">
            Description
          </label>
          <textarea
            placeholder="Add a description..."
            value={newDream.description}
            onChange={(e) =>
              setnewDream({ ...newDream, description: e.target.value })
            }
            className="w-full px-4 py-2 border rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-200"
          ></textarea>
        </div>
                    </div>
            
                    {/* Modal Footer */}
                    <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                      <button
                        onClick={() => {updateById(Dream._id)
                          alert (`The dream "${Dream.title}" has been updated`)
                        }
                        }
                        className="bg-light-primary dark:bg-dark-primary text-light-text dark:text-dark-text hover:text-dark-text dark:hover:text-light-text dark:hover:bg-light-primary hover:bg-dark-primary focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-blue-800"
                      >
                        Yes
                      </button>
                      <button
                        onClick={() => settoggleDesEdit(false)}
                        className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                      >
                        Decline
                      </button>
                    </div>
                  </div>
                </div>
              )}
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
