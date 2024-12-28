
import React , { useContext, useEffect }from 'react'
import { useState } from 'react';
import axios from "axios";
import { UserContext }  from '../../App';


function Explore() {

    const [updateID, setUpdateID] = useState("")
    const [userId, setUserId] = useState("")
    const [toggleUpdate, setToggleUpdate] = useState(false)
    const [newlogin, setNewlogin] = useState({})
    const [newComment, setnewComment] = useState({})
    const [et, setet] = useState("")
    const {settoggleSearch} = useContext(UserContext);

    // const {token} = useContext(UserContext);
//     const config = {
//       headers: { Authorization: `Bearer ${token}` }
//   };
  const [articles, setArticles] = useState([]);


    const fetch = () => {
            
        axios.get('http://localhost:5000/dreams')
          .then(function (rese) {
            setArticles(rese.data.articles); 

          })
          .catch(function (err) {
           console.log(err);
           
          });
    }

    const deleteById = (z) => {
            
      axios.delete(`http://localhost:5000/articles/${z}`, newlogin)
        .then(function (rese) {
          fetch()     
        })
        .catch(function (err) {
         console.log(err);
        });
  }
  const updateById = () => {
            
    axios.put(`http://localhost:5000/articles/${updateID}`,newlogin)
      .then(function (rese) {
        console.log(updateID);
        fetch()     
      })
      .catch(function (err) {
        
        
       console.log(err);
      });
}

const AddComment = (x) => {
            
  axios.post(`http://localhost:5000/articles/${x}/comments`,newComment)
    .then(function (rese) { 
      setnewComment({})
     fetch()
    })
    .catch(function (err) {
     console.log(err);
    });
}

    useEffect(() => {
        fetch()       
        settoggleSearch(true)
        return () => {
          settoggleSearch(false)
        }
    }, [])
    

  return (
    <div>
        {articles && articles.map((e,i)=>{
            return  (
            
            <div>
              {e.visibility === "Public" && (
                <>
                <img src={e.img}/>
                <p>{e.title}</p>              
                <p>Tags: {e.tags.map((e2,i2)=> 
                  {return e2 + " "})}</p>
                  </>
                  )
                  }
            </div>
            )
        })}
    </div>
  )
}

export default Explore