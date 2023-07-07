import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { Form as BoostForm } from 'react-bootstrap';
import { Form, useNavigate, useParams } from 'react-router-dom';
import { storage } from '../assets/firebase';
import {ref, uploadBytes, getDownloadURL} from "firebase/storage"
import { useSelector } from 'react-redux';
import axios from 'axios';
import { config } from '../services/config';
function Addchapter() {
  const [selectedImages, setselectedImages] = useState([])
  const [selectedFile, setselectedFile] = useState([])
  const [title, settitle] = useState("");
  const [chapterNumber, setchapterNumber] = useState("");
  const [pages, setpages] = useState([]);
  const token = useSelector(state=>state.persistedReducer.auth.token.accessToken);
  const mangaName = useSelector(state=>state.persistedReducer.manga.detail.currentData.name);
  const { mangaId } = useParams();
  const navigate = useNavigate();
  function handleTitle(e) {
    settitle(e.target.value);
  }
  function handleChapterNumber(e) {
    setchapterNumber(e.target.value);
  }
  const onSelectFile = (event) => {
    const selectedFiles = event.target.files;
    const selectedFilesArray = Array.from(selectedFiles); // turn selectedFiles from object to array
    const imagesArray = selectedFilesArray.map((file) => {
      return URL.createObjectURL(file);
    })
    const imagesFileArray = selectedFilesArray.map((file) => {
      return file;
    })
    setselectedImages((previousImages) => previousImages.concat(imagesArray));
    setselectedFile((previousImages) => previousImages.concat(imagesFileArray))
    // @param items — Additional arrays and/or items to add to the end of the array.
    event.target.value = "";
  }
  const handleDeleteAll = () => {
    setselectedImages([])
  }
  const UploadImagesToFirebase = () =>{
    if(selectedFile==null) return;
    setpages([]);
     for (let i = 0; i < selectedFile.length; i++) {
      const imageRef = ref(storage, `manga/${mangaName}/chapters/Chapter ${chapterNumber}/${i+1}`)
      uploadBytes(imageRef, selectedFile[i]).then((snapshot)=>{
            getDownloadURL(snapshot.ref).then(url=>{
              setpages((prev)=> [...prev, {id:i, url: url}])
            });
      });
     }
   
  }
  const validate = () =>{
    let errorText="";
    if(title.length==0 && chapterNumber.length==0 && selectedImages.length==0){
      errorText="Các thông tin không được để trống!";
    }else{
      if(title.length==0){
        errorText+="Tiêu đề không được để trống!\n";
      }
      if(chapterNumber.length==0){
        errorText+="Số chapter không được để trống\n";
      }
      if(isNaN(Number(chapterNumber))){
        errorText+="Số chapter phải là số\n";
      }
      if(selectedImages.length==0){
        errorText+="Không có ảnh chapter\n";
      }
    }
    if(errorText.length==0){
      UploadImagesToFirebase();
    }else{
      alert(errorText);
    }
  }
  const AddChapterAPI = async () =>{
    let headersList = {
      Accept: "*/*",
      "Content-Type": "application/json",
      'Authorization': `Bearer ${token}`,
    };
    let reqOptions = {
      url: `${config.baseURL}/cpanel/manga/${mangaId}/edit/add-chapter`,
      method: "POST",
      headers: headersList,
      data:{
       title:title,
       chapterNumber: chapterNumber,
       page: pages
      }
    };
    try {
      let response = await axios.request(reqOptions);
      alert(response.data.message);
      navigate(`/cpanel/manga/${mangaId}/edit/`);
    } catch (error) {
      console.log("Add character error"+error);
      alert("Error! Something went wrong. Manga id might not be found. Please try again");
      navigate(`/cpanel/manga/${mangaId}/edit/`);
    }
  }
    useEffect(() => {
      // check that all of the images are uploaded or not
      if(pages.length==selectedFile.length && pages.length!=0){
          pages.sort(function(a,b){return a.id - b.id});
          AddChapterAPI();
      }
    }, [pages])
    

  return (


    <div className='addChapter-container'>
      <div className='addChapter-label'>
        <h2>Add Chapter</h2>
        <Button sx={{ width: "15%", alignSelf: "flex-end" }} type="button" variant="contained" onClick={validate}>Submit</Button>

      </div>
      <BoostForm.Group className="mb-3">
        <BoostForm.Label>Title:</BoostForm.Label>
        <BoostForm.Control type="text" placeholder="Title..." onChange={handleTitle} />
      </BoostForm.Group>
      <BoostForm.Group className="mb-3">
        <BoostForm.Label>Chapter Number:</BoostForm.Label>
        <BoostForm.Control type="number" placeholder="chapter number..." onChange={handleChapterNumber}/>
      </BoostForm.Group>

      <section>

        <label className='testLabel'>
          + Add Manga Pages


          <input className='testInput' type='file' name='images' onChange={onSelectFile} multiple accept='image/png, image/jpeg, image/webp, image/jpg'></input>
        </label>
        {
          selectedImages.length > 0 && <Button sx={{ width: "15%", alignSelf: "flex-end", marginBottom: 3 }} type="button" variant="contained" color='error' onClick={handleDeleteAll}>Delete All</Button>
        }
        <div className="images">

          {

            selectedImages &&
            selectedImages.map((item, index) => {
              return (
                <div key={item} className='image'>
                  <img className='testImg' src={item} alt="" height={200} />
                  <button className='deleteButton' onClick={() => setselectedImages(selectedImages.filter((e) => e !== item))}>X</button>
                  {/* set lại list đã được lọc qua filter. List là các object lại khác với object bắn event vào. */}
                  <p>Page: {index + 1}</p>
                </div>
              )
            })
          }

        </div>
      </section>
    </div>

  )
}

export default Addchapter