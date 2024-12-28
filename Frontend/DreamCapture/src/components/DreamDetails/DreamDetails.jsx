import React, { useContext, useEffect,useState }from 'react'
import axios from "axios";
import { useParams } from "react-router-dom";

function DreamDetails() {

    const [Dream, setDream] = useState(null);
    const [tag, settag] = useState([])

    const {id} = useParams()

    const fetch = () => {
            
        axios.get(`http://localhost:5000/dreams/search_2/${id}`)
          .then(function (rese) {
            setDream(rese.data.article); 
            settag(Dream.tags)
            console.log(rese.data.article);
            
          })
          .catch(function (err) {
           console.log(err);
           
          });
    }

    useEffect(() => {
        fetch()       
    }, [])


  return (
   <> 
   {Dream&& <div>

        <img src={Dream.img}/>    
        <h1>{Dream.title}</h1>   
        <p>Date: {Dream.createdAt}</p>
        <p>mood: {Dream.mood}</p>
        <p>Is Lucid? {Dream.isLucid ? "yes" : "no"}</p>
        
        <p>Tags: {Dream?.tags.map((e2,i2)=> e2 + " ")}</p>
        <h4>{Dream.description}</h4>

            
    </div>}
    </>
  )
}

export default DreamDetails