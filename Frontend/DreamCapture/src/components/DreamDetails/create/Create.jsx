

import React, { useState } from "react";

function Create() {
    const [file, setFile] = useState();

    function handleChange(e) {
        console.log(e.target.files);
        setFile(URL.createObjectURL(e.target.files[0]));      
    }

    return (
        <div>
            <h2>Add Image:</h2>
            <input type="file" onChange={handleChange} />
            <img src={file}/>
            {console.log(file)}
        </div>
    );
}

export default Create;