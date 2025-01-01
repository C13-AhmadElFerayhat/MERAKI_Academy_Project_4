import React, { useState } from "react";
import axios from "axios";

function SignUp() {
  const [newUser, setnewUser] = useState({});
  const [Res, setRes] = useState("");
  const [Show, setShow] = useState(false);

  const CreateUser = () => {
    axios
      .post("http://localhost:5000/users/register", newUser)
      .then((rese) => {
        setRes(rese.data.message);
        setShow(true);
      })
      .catch((err) => {
        setRes(err.response.data.message);
        setShow(true);
      });
  };

  const uploadHandler = (x) => {
    const data = new FormData();
    data.append("file", x);
    data.append("upload_preset", "l2udrjei");

    axios
      .post("https://api.cloudinary.com/v1_1/dl7wtfv68/upload", data)
      .then(function (rese) {
        setnewUser({ ...newUser, img: rese.data.url });
      })
      .catch(function (err) {
        console.log(err.response.data);
      });
  };

  return (
    <div className="min-h-screen bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text flex items-center justify-center">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <img
          src="src/assets/Untitled-7.png"
          alt="Logo"
          className="h-20 cursor-pointer block m-auto mb-8"
        />
        <h2 className="text-2xl font-bold mb-6 text-center">
          Create Your Account
        </h2>
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
            className="px-4 py-2 border rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-200"
          />
          {newUser.img && (<img
        src={newUser.img}
        alt="Logo"
        className="h-20 cursor-pointer block m-auto mb-8"
        />
    )}
        </div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 mb-2">
            First Name
          </label>
          <input
            type="text"
            placeholder="Enter your first name"
            onChange={(e) =>
              setnewUser({ ...newUser, firstName: e.target.value })
            }
            className="w-full px-4 py-2 border rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:ring-2 focus:ring-teal-400"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 mb-2">
            Last Name
          </label>
          <input
            type="text"
            placeholder="Enter your last name"
            onChange={(e) =>
              setnewUser({ ...newUser, lastName: e.target.value })
            }
            className="w-full px-4 py-2 border rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:ring-2 focus:ring-teal-400"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 mb-2">
            Age
          </label>
          <input
            type="number"
            placeholder="Enter your age"
            onChange={(e) => setnewUser({ ...newUser, age: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:ring-2 focus:ring-teal-400"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 mb-2">
            Gender
          </label>
          <select
            onChange={(e) => setnewUser({ ...newUser, gender: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:ring-2 focus:ring-teal-400"
          >
            <option value="">Select your gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="prefer not to say">Prefer not to say</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 mb-2">
            Email
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            onChange={(e) => setnewUser({ ...newUser, email: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:ring-2 focus:ring-teal-400"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 mb-2">
            Password
          </label>
          <input
            type="password"
            placeholder="Enter your password"
            onChange={(e) =>
              setnewUser({ ...newUser, password: e.target.value })
            }
            className="w-full px-4 py-2 border rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:ring-2 focus:ring-teal-400"
          />
        </div>

        <button
          onClick={CreateUser}
          className="w-full bg-light-primary dark:bg-dark-primary text-light-text dark:text-dark-text hover:text-dark-text dark:hover:text-light-text dark:hover:bg-light-primary hover:bg-dark-primary font-bold py-2 px-4 rounded-lg transition duration-200"
        >
          Sign Up
        </button>

        {Show && (
          <p
            className={`text-center mt-4 ${
              Res.includes("success") ? "text-teal-600" : "text-red-500"
            }`}
          >
            {Res}
          </p>
        )}
      </div>
    </div>
  );
}

export default SignUp;
