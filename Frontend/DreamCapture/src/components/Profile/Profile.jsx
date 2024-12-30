import React, { useContext, useEffect,useState }from 'react'
import { UserContext }  from '../../App';
import axios from "axios";

function Profile() {

    const [user, setuser] = useState({})

    const {token} = useContext(UserContext);
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    
    useEffect(() => {
        axios.get(`http://localhost:5000/users`,config)
        .then(function (rese) {
        setuser(rese.data.User);
        })
        .catch(function (err) {
         console.log(err);
        });      
    }, [])
    
  return (
    <div>
        <p>avatar</p>
        <h4>{user.firstName}</h4>
        <h4>{user.lastName}</h4>
        <div>Your </div>
    </div>
  )
}

export default Profile