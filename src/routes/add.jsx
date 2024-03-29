
import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { Form as BoostForm } from 'react-bootstrap';
import { MultiSelect } from 'react-multi-select-component';
import { storage } from '../assets/firebase';
import {ref, uploadBytes, getDownloadURL} from "firebase/storage"
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
function Add() {
  const [file, setFile] = useState("");
  const [bannerFile, setBannerFile] = useState("");
  const [genre, setgenre] = useState([]);
  const [coverManga, setcoverManga] = useState(null);
  const [bannerManga, setbannerManga] = useState(null);
  const [selectedOptions, setselectedOptions] = useState([]);
  const [name, setname] = useState("");
  const [author, setauthor] = useState("");
  const [status, setstatus] = useState("");
  const [language, setlanguage] = useState("");
  const [description, setdescription] = useState("")
  const navigate = useNavigate();
  function handleChange(e) {
    setFile(URL.createObjectURL(e.target.files[0]));
    setcoverManga(e.target.files[0]);
  }
  function handleChangeBanner(e) {
    setBannerFile(URL.createObjectURL(e.target.files[0]));
    setbannerManga(e.target.files[0]);
  }
  function handleName(e){
    setname(e.target.value);
  }
  function handleauthor(e){
    setauthor(e.target.value);
  }
  function handlelanguage(e){
    setlanguage(e.target.value);
  }
  function handlestatus(e){
    setstatus(e.target.value);
  }
  function handleDescription(e){
   
    setdescription(e.target.value);
  }
  const handleUpload = ()=>{
    if(coverManga==null) return;
    const imageRef = ref(storage, `manga/${name}/banner/${Date.now()}`)
    uploadBytes(imageRef, coverManga).then((snapshot)=>{
          getDownloadURL(snapshot.ref).then(url=>{
            handleUploadBanner(url)
          })
    })
  }
  const handleUploadBanner = (coverUrl)=>{
    if(bannerManga==null) return;
    const imageRef = ref(storage, `manga/${name}/bannerLongWidth/${Date.now()}`)
    uploadBytes(imageRef, bannerManga).then((snapshot)=>{
          getDownloadURL(snapshot.ref).then(bannerUrl=>{
            addMangaAPI(coverUrl,bannerUrl);
          })
    })
  }
  const token = useSelector(state=>state.persistedReducer.auth.token.accessToken)
  const validate = () =>{
    let errorText="";
    if(file.length==0 && bannerFile.length==0 && name.length==0 && author.length==0 && language.length==0 && status.length==0 && selectedOptions.length==0 && description.length==0){
      errorText="Các thông tin không được để trống";
    }
    if(file.length==0){
      errorText += "Ảnh bìa không được để trống\n";
    }
    if(name.length==0){
      errorText += "Tên truyện không được để trống\n";
    }
    if(author.length==0){
      errorText += "Tên tác giả không được để trống\n";
    }
    if(language.length==0){
      errorText += "Ngôn ngữ không được để trống\n";
    }
    if(status.length==0){
      errorText += "Trạng thái không được để trống\n";
    }
    if(selectedOptions.length==0){
      errorText += "Thể loại không được để trống\n";
    }
    if(bannerFile.length==0){
      errorText += "Hình ảnh bìa 2 không được để trống\n";
    }
    if(description.length==0){
      errorText += "Mô tả không được để trống\n";
    }
    if(errorText.length==0){
      handleUpload();
    }else{
      alert(errorText);
    }
  }
  const uploader = useSelector(state=>state.persistedReducer.auth.login.currentUser._id);
  const addMangaAPI = async (coverUrl, bannerUrl) =>{
    let headersList = {
      Accept: "*/*",
      "Content-Type": "application/json",
      'Authorization': `Bearer ${token}`,
    };
    let reqOptions = {
      url: "http://localhost:3000/cpanel/manga/add",
      method: "POST",
      headers: headersList,
      data:{
        name: name,
         author: author,
          language: language,
           status:status,
           description: description,
            cover: coverUrl,
            banner: bannerUrl,
             genre: formatGenre(),
              uploader: uploader
            }
    };
    try {
      let response = await axios.request(reqOptions);
      if(response.data.error){
        navigate("/cpanel/dashboard");
        alert("There is error, try again!");
      }else{
        navigate(`/cpanel/manga/${response.data.data._id}/edit`);
        alert("Upload this comic successfully. Please continue update it");
      }

    } catch (error) {
      console.log("Add manga error" + error);
    }
  }
  //format genre when submit
  const formatGenre = () =>{
      const tempGenre = [];
      selectedOptions.forEach(element => {
          tempGenre.push(element.value);
      });
     return tempGenre;

  }
// get genre and format
 const getGenreAPI = async () =>{
  let headersList = {
    Accept: "*/*",
    "Content-Type": "application/json",
    'Authorization': `Bearer ${token}`,
  };
  let reqOptions = {
    url: "http://localhost:3000/cpanel/genre",
    method: "GET",
    headers: headersList,

  };
  try {
    let response = await axios.request(reqOptions);
    console.log(response.data.data);
    const data = response.data.data;
    const tempGenreData= [];
    data.forEach(element => {
      tempGenreData.push( { value: element._id, label: element.name })
    });
    setgenre(tempGenreData);
  } catch (error) {
    console.log("Get genre error" + error);
  }
 }
useEffect(() => {
  getGenreAPI();
}, [])
useEffect(() => {
  console.log(selectedOptions);
}, [selectedOptions])

  return (
    <div className='addContainer'>
      <h2>Add Manga</h2>
      <img className='manga-cover' src={file} alt='cover'/>
      <BoostForm.Group controlId="formFile" className="mb-3">
        <BoostForm.Label  className='control-label'>Cover Image for the manga:</BoostForm.Label>
        <BoostForm.Control type="file" required onChange={handleChange} />
      </BoostForm.Group>
      <img className='manga-banner' src={bannerFile} alt='banner'/>
      <BoostForm.Group controlId="formFile" className="mb-3">
        <BoostForm.Label  className='control-label'>Banner Image for the manga:</BoostForm.Label>
        <BoostForm.Control type="file" required onChange={handleChangeBanner} />
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
        <BoostForm.Label  className='control-label'>Description:</BoostForm.Label>
        <BoostForm.Control as={"textarea"} rows={3} placeholder="Description..." onChange={handleDescription} value={description}/>
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
        <BoostForm.Label  className='control-label'>Manga Genres:</BoostForm.Label>
        <MultiSelect
          options={genre}
          value={selectedOptions}
          onChange={setselectedOptions}
          labelledBy="Select"
        >
        </MultiSelect>
      </BoostForm.Group >
      <Button sx={{ width: "100%", marginTop: 5 }} type="submit" variant="contained" onClick={validate}>Submit</Button>


    </div>
  )
}

export default Add