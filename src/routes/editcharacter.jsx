import { Button, ThemeProvider } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Form as BoostForm } from 'react-bootstrap';
import { config } from '../services/config';
import { isObjEmpty } from '../util/isObjEmpty';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import {ref, uploadBytes, getDownloadURL, deleteObject} from "firebase/storage"
import { storage } from '../assets/firebase';


// Fetch data from url and set data on this page
function EditCharacter() {
  const [data, setdata] = useState({});
  const [file, setFile] = useState("");
  const [name, setname] = useState("");
  const [characterImage, setcharacterImage] = useState("")
  const [description, setdescription] = useState("")
  const token = useSelector(state=>state.persistedReducer.auth.token.accessToken);
  const mangaName = useSelector(state=>state.persistedReducer.manga.detail.currentData.name);
  const { mangaId, characterId } = useParams();
  const navigate = useNavigate();

  

  function handleChange(e) {
    console.log(e.target.files);
    setFile(URL.createObjectURL(e.target.files[0]));
    setcharacterImage(e.target.files[0]);
  }
  function handleName(e){
    setname(e.target.value);
  }
  function handleDescription(e){
    setdescription(e.target.value);
  }
  const getDataToEdit = async () =>{
    let headersList = {
      Accept: "*/*",
      "Content-Type": "application/json",
      'Authorization': `Bearer ${token}`,
    };
    let reqOptions = {
      url: `${config.baseURL}/cpanel/manga/${mangaId}/edit/characters/${characterId}/edit`,
      method: "GET",
      headers: headersList,
    };
    try {
      let response = await axios.request(reqOptions);
      setdata(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.log("Get character by manga id error"+error);
      alert("Error! Something went wrong. Manga id might not be found. Please try again");
    }
  }
  const validate = () =>{
    let errorText ="";
    if(file.length==0 && name.length==0 && description.length==0){
      errorText="Các thông tin không được để trống"
    }else{
    if(file.length==0){
      errorText+="Ảnh nhân vật không được để trống\n";
    }
    if(name.length==0){
      errorText+="Tên nhân vật không được để trống\n";
    }
    if(description.length==0){
      errorText+="Mô tả nhân vật không được để trống\n";
    }
  }
    if(errorText.length==0){
      Submit();
    }else{
      alert(errorText);
    }
  }
  const Submit = () =>{
    if(file!=data.image){
      UpdateInFirebase();
    }else{
      UpdateCharAPI(file);
    }
  }
  const UpdateInFirebase = () =>{
    // delete previous image
    const characterRef = ref(storage, `manga/${mangaName}/characters/${data.name}`)
    deleteObject(characterRef).then(()=>{
      console.log("Deleted in firebase successfully!");
    }).catch((error)=>{
      console.log("Error occurred! Can't delete in firebase");
    });
    //add new one
    if(characterImage==null) return;
    const imageRef = ref(storage, `manga/${mangaName}/characters/${name}`)
    uploadBytes(imageRef, characterImage).then((snapshot)=>{
          getDownloadURL(snapshot.ref).then(url=>{
            UpdateCharAPI(url);
          })
    })
  }
  const UpdateCharAPI = async (url) =>{
     let headersList = {
        Accept: "*/*",
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`,
      };
      let reqOptions = {
        url: `${config.baseURL}/cpanel/manga/${mangaId}/edit/characters/${characterId}/edit`,
        method: "POST",
        headers: headersList,
        data:{
          name: name,
          description: description,
          image: url
        }
      };
      try {
        let response = await axios.request(reqOptions);
        alert(response.data.message);
        navigate(`/cpanel/manga/${mangaId}/edit/characters`);
      } catch (error) {
        console.log("Add character error"+error);
        alert("Error! Something went wrong. Manga id might not be found. Please try again");
      }
  }
  const setDataOnSite = () =>{
    setFile(data.image);
    setname(data.name);
    setdescription(data.description);
  }
  useEffect(() => {
    getDataToEdit();
  }, [])
  
  useEffect(() => {
    if(!isObjEmpty(data)) setDataOnSite();
  }, [data])
  


  return (
    <div className='addContainer'>
      <h2>Edit Character</h2>
      <img className='manga-cover' src={file} />


      <BoostForm.Group controlId="formFile" className="mb-3">
        <BoostForm.Label  className='control-label'>Character Image:</BoostForm.Label>
        <BoostForm.Control type="file" onChange={handleChange} />
      </BoostForm.Group>
      <BoostForm.Group className="mb-3">
        <BoostForm.Label  className='control-label'>Character Name:</BoostForm.Label>
        <BoostForm.Control type="text" placeholder="Name..." onChange={handleName} value={name}/>
      </BoostForm.Group>
      <BoostForm.Group className="mb-3">
        <BoostForm.Label  className='control-label'>Description:</BoostForm.Label>
        <BoostForm.Control as={"textarea"} rows={3} placeholder="Description..." onChange={handleDescription} value={description}/>
      </BoostForm.Group>
      <Button sx={{ width: "100%", marginTop: 5 }} type="submit" variant="contained" onClick={validate}>Submit</Button>


    </div>
  )
}

export default EditCharacter