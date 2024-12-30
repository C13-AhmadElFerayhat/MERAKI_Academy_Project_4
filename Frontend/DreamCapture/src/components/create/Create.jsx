import React, { useState, useContext } from "react";
import { UserContext }  from '../../App';
import axios from "axios";


function Create() {
    const [file, setFile] = useState();
    const [newDream, setnewDream] = useState({})
    const [Res, setRes] = useState("")
    const [newTags, setnewTags] = useState([])
    const {token} = useContext(UserContext);
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    
    const CreateDream = () => {
               
        axios.post('http://localhost:5000/Dreams', newDream, config)
          .then(function (rese) {
            setRes(rese.data.message);
          })
          .catch(function (err) {
            setRes(err.response.data.message);
          });
    }

    return (
        <div>
            <input  type="file" onChange={(e)=> {setFile(URL.createObjectURL(e.target.files[0]))
                setnewDream({...newDream, img:e.target.value})
            }} />
            
            <img src= {file}/>
            <label>Title:</label>
            <input onChange={(e)=> setnewDream({...newDream, title:e.target.value})} type="text" placeholder="Add a title.."></input> 
            <label>Description:</label>
            <textarea onChange={(e)=> setnewDream({...newDream, description:e.target.value})} type="text" placeholder="Add a description.."></textarea> 
            <label>Add a tag:</label>
            <input onKeyDown={(e)=>{
            if (e.key === "Enter" || e.key ==="space") {
                if (e.target.value !== "") {
                setnewTags([...newTags, e.target.value])              
                setnewDream({...newDream, tags:newTags})
                e.target.value = ""
                }
            }
            }}></input>
            <label>Mood:</label>
            <input onChange={(e)=> setnewDream({...newDream, mood:e.target.value})} type="text" placeholder="Add a mood.."></input> 
            <label>Is Lucid?</label>
            <select value={newDream.isLucid} onChange={(e)=> setnewDream({...newDream, isLucid:e.target.value})}>
                <option value= {true} >Yes</option>
                <option value={false} >No</option>
            </select>
            <label>Privacy:</label>
            <select value={newDream.visibility} onChange={(e)=> setnewDream({...newDream, visibility:e.target.value})}>
                <option value= "public" >Public</option>
                <option value= "private" >Private</option>
            </select> 
            <button onClick={()=>{CreateDream()}}>Create..</button>
        </div>
    );
}

export default Create;