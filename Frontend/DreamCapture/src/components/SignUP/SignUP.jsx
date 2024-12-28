import React from 'react'
import axios from 'axios'
import { useState } from 'react'

function SignUP() {
 
    const [newUser, setnewUser] = useState({})
    const [Res, setRes] = useState("")
    const [Show, setShow] = useState(false)

    const CreateUser = () => {
               
        axios.post('http://localhost:5000/users/register', newUser)
          .then(function (rese) {
            setRes(rese.data.message);
          })
          .catch(function (err) {
            setRes(err.response.data.message);
          });
    }

  return (
    <div id="Register">
        <label>First Name</label>
        <input onChange={(e)=> setnewUser({...newUser, firstName:e.target.value})} type= "text" placeholder='First Name'></input>
        <label>Last Name</label>
        <input onChange={(e)=> setnewUser({...newUser, lastName:e.target.value})} type= "text" placeholder='Last Name'></input>
        <label>Age</label>
        <input onChange={(e)=> setnewUser({...newUser, age:e.target.value})} type= "number" placeholder='Age'></input>
        <label>Gender</label>
        <select onChange={(e)=> setnewUser({...newUser, gender:e.target.value})}>
        <option value="male">Male</option>
        <option value="femele">Femele</option>
        <option value="prefer not to say">Prefer not to say..</option>
        </select>
        <label>Email</label>
        <input onChange={(e)=> setnewUser({...newUser, email:e.target.value})} type= "email" placeholder='Email'></input>
        <label>Password</label>
        <input onChange={(e)=> setnewUser({...newUser, password:e.target.value})} type= "password" placeholder='Password'></input>
        <button onClick={()=>{CreateUser()
            setShow(true)}
        }>Register</button>
        {Show && <p>{Res}</p>}
    </div>
  )
}

export default SignUP