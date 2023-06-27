
import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { Form as BoostForm } from 'react-bootstrap';

import { MultiSelect } from 'react-multi-select-component';
import { storage } from '../assets/firebase';
import {ref, uploadBytes, getDownloadURL} from "firebase/storage"
import axios from 'axios';
import { useSelector } from 'react-redux';
const options = [
  { value: 'Action', label: 'Action' },
  { value: 'Romance', label: 'Romance' },
  { value: 'Comedy', label: 'Comedy' },
];
function Add() {
  const [file, setFile] = useState();
  const [coverManga, setcoverManga] = useState(null)
  const [selectedOptions, setselectedOptions] = useState([])
  const [name, setname] = useState("")
  const [author, setauthor] = useState("")
  const [status, setstatus] = useState("")
  const [language, setlanguage] = useState("")  
  function handleChange(e) {
    console.log(e.target.files);
    setFile(URL.createObjectURL(e.target.files[0]));
    setcoverManga(e.target.files[0]);
  }
  function handleName(e){
    console.log(e.target.value);
    setname(e.target.value);
  }
  function handleauthor(e){
    setauthor(e.target.value);
  }
  function handlelanguage(e){
    setlanguage(e.target.value);
  }
  function handlestatus(e){
    console.log(e.target.value);
    setstatus(e.target.value);
  }
  const handleUpload = ()=>{
    console.log("alo")
    if(coverManga==null) return;
    const imageRef = ref(storage, `manga//${coverManga.name + Date.now()}`)
    uploadBytes(imageRef, coverManga).then((snapshot)=>{
          getDownloadURL(snapshot.ref).then(url=>{

          })
    })
  }
  const token = useSelector(state=>state.persistedReducer.auth.token.accessToken)
  const addMangaAPI = async () =>{
    let headersList = {
      Accept: "*/*",
      "Content-Type": "application/json",
      'Authorization': `Bearer ${token}`,
    };
    let reqOptions = {
      url: "http://localhost:3000/cpanel/manga",
      method: "POST",
      headers: headersList,

    };
    try {
      let response = await axios.request(reqOptions);
      alert(response.data.data);

    } catch (error) {
      console.log("Call login error" + error);
    }
  }
  return (
    <div className='addContainer'>
      <h2>Add Manga</h2>
      <img className='manga-cover' src={file} />


      <BoostForm.Group controlId="formFile" className="mb-3">
        <BoostForm.Label  className='control-label'>Cover Image for the manga:</BoostForm.Label>
        <BoostForm.Control type="file" required onChange={handleChange} />
      </BoostForm.Group>
      <BoostForm.Group className="mb-3">
        <BoostForm.Label  className='control-label'>Manga Name:</BoostForm.Label>
        <BoostForm.Control type="text" placeholder="Name..." required onChange={handleName}/>
      </BoostForm.Group>
      <BoostForm.Group className="mb-3">
        <BoostForm.Label  className='control-label'>Author Name:</BoostForm.Label>
        <BoostForm.Control type="text" placeholder="Author..." required onChange={handleauthor}/>
      </BoostForm.Group>
      <BoostForm.Group className="mb-3">
        <BoostForm.Label  className='control-label'>Language:</BoostForm.Label>
        <BoostForm.Control type="text" placeholder="Language..." require onChange={handlelanguage}/>
      </BoostForm.Group>
      <BoostForm.Group className="mb-3">
        <BoostForm.Label className='control-label'>Manga Status:</BoostForm.Label>
        <BoostForm.Select aria-label="Default select example" required onChange={handlestatus}>
          <option>Status</option>
          <option value="On Going">On Going</option>
          <option value="Finisheed">Finished</option>
          <option value="Canceled">Canceled</option>
        </BoostForm.Select>
      </BoostForm.Group >
      <BoostForm.Group className="mb-3">
        <BoostForm.Label  className='control-label'>Manga Status:</BoostForm.Label>
        <MultiSelect
          options={options}
          value={selectedOptions}
          onChange={setselectedOptions}
          labelledBy="Select"
        >
        </MultiSelect>
      </BoostForm.Group >
      <Button sx={{ width: "100%", marginTop: 5 }} type="submit" variant="contained" onClick={handleUpload}>Submit</Button>


    </div>
  )
}

export default Add