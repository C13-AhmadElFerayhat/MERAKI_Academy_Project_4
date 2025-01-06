import React, { useState, useContext } from "react";
import { UserContext } from "../../App";
import axios from "axios";

function Create() {
  const [newDream, setnewDream] = useState({
    isLucid: true,
    visibility: "public",
  });
  const [img, setimg] = useState("")
  const [Res, setRes] = useState("");
  const [newTags, setnewTags] = useState([]);
  const { token } = useContext(UserContext);
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const CreateDream = () => {
    let addedDream = { ...newDream, tags: newTags };
    axios
      .post("http://localhost:5000/Dreams", addedDream, config)
      .then(function (rese) {
        setRes(rese.data.message);
      })
      .catch(function (err) {
        setRes(err.response.data.message);
      });
  };

  const uploadHandler = (x) => {
    const data = new FormData();
    data.append("file", x);
    data.append("upload_preset", "l2udrjei");

    axios
      .post("https://api.cloudinary.com/v1_1/dl7wtfv68/upload", data)
      .then(function (rese) {
        setnewDream({ ...newDream, img: rese.data.url });
      })
      .catch(function (err) {
        console.log(err.response.data.message);
      });
  };

  return (
    <div className="min-h-screen bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text flex items-center justify-center">
      <div className="max-w-3xl w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-3xl font-bold mb-6 text-center">Create New Dream</h2>

        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 mb-2">
            Image
          </label>
          <div className="flex flex-col gap-y-8 items-center">
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
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 mb-2">
            Title
          </label>
          <input
            type="text"
            placeholder="Add a title..."
            value={newDream.title}
            onChange={(e) =>
              setnewDream({ ...newDream, title: e.target.value })
            }
            className="w-full px-4 py-2 border rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-200"
          />
        </div>

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

        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 mb-2">
            Add Tags
          </label>
          <input
            type="text"
            placeholder="Press Enter or Space to add a tag.."
            onKeyDown={(e) => {
                console.log(e.key);
                
              if (e.key === "Enter" || e.key === " ") {
                if (e.target.value !== "") {
                  setnewTags([...newTags, e.target.value]);
                  setnewDream({ ...newDream, tags: newTags });
                  e.target.value = "";
                }
              }
            }}
            className="w-full px-4 py-2 border rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-200"
          />
          <div className="mt-2 flex flex-wrap gap-2">
            {newTags.map((tag, index) => (
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
                setnewDream({ ...newDream, mood: e.target.value })}
            }
            className="w-full px-4 py-2 border rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-200"
          />
          <label className="block text-gray-400 dark:text-gray-500 mb-2">
            (Happy, Sad, Hopeful, Fearful, etc...)
          </label>
        </div>

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

        <div className="mb-6">
          <label className="block text-gray-700 dark:text-gray-300 mb-2">
            Privacy
          </label>
          <select
            value={newDream.visibility}
            onChange={(e) =>
              setnewDream({ ...newDream, visibility: e.target.value })
            }
            className="w-full px-4 py-2 border rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-200"
          >
            <option value="public">Public</option>
            <option value="private">Private</option>
          </select>
        </div>

        <button
          onClick={() => {
            CreateDream();
          }}
          className="w-full bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded-lg transition duration-200"
        >
          Create Dream
        </button>

        {Res && (
          <p
            className={`text-center mt-4 ${
              Res === "Article created" ? "text-teal-600" : "text-red-500"
            }`}
          >
            {Res}
          </p>
        )}
      </div>
    </div>
  );
}

export default Create;
