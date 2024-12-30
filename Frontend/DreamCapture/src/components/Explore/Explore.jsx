
import React , { useContext, useEffect }from 'react'
import { useState } from 'react';
import axios from "axios";
import { UserContext }  from '../../App';
import {useNavigate} from "react-router-dom";


function Explore() {

    const [updateID, setUpdateID] = useState("")
    const [newlogin, setNewlogin] = useState({})
    const [newComment, setnewComment] = useState({})
    const {settoggleSearch} = useContext(UserContext);
    const [articles, setArticles] = useState([]);
    const navigate = useNavigate()

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
              {e.visibility.toUpperCase() === "Public".toUpperCase() && (
                <>
                <img onClick={()=>navigate(`/dream/${e._id}`)} src={e.img}/>
                <p onClick={()=>navigate(`/dream/${e._id}`)}>{e.title}</p>              
                <p>Tags: {e.tags?.map((e2,i2)=> e2 + " ")}</p>
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