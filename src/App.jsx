
import './App.css';
import axios from 'axios';
import React, { useState } from 'react';

function App() {
  const [image, setImage] = useState(null);

  const [filename, setFilename] = useState(null);

  const handleupload = async () => {
    console.log("handle successfull");
    try{
     const res =await axios.post('/image-upload', image).then((res)=>{console.log(res)}).catch((e)=>console.log(e))
     console.log(res);
    }
    catch(error)
    {console.log(error);}
    

  fecting();

  }
  const fecting = async () => {
    console.log("hello1");
    await fetch('/api/image').then(response => response.json()).then(data => {
      console.log("./images/removed-"+data.path);
      setFilename("./images/removed-"+data.path)
    });



  }


  const getFileInfo = (e) => {
    console.log("file request ");




    const formData = new FormData();
    formData.append('my-image-file', e.target.files[0], e.target.files[0].name);
    setImage(formData);

   
  }
  return (
    <div >
      <h1>Image upload</h1>
      <input type="file" onChange={getFileInfo}></input>
      <button onClick={handleupload}>upload image</button>
      {filename != null ? <img width="200px" height="200px" src={filename} /> : <h1>image will appear here</h1>}
     
    </div>
  );
}

export default App;
