
import { Button, ThemeProvider } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { Form as BoostForm } from 'react-bootstrap';
import { Form, Link, useNavigate, useParams } from 'react-router-dom';
import ChapterItem from './items/chapterItem';
import { MultiSelect } from 'react-multi-select-component';
import CharacterItem from './items/characterItem';
import { useDispatch, useSelector } from 'react-redux';
import { config } from '../services/config';
import axios from 'axios';
import { isObjEmpty } from '../util/isObjEmpty';
import { storage } from '../assets/firebase';
import {ref, uploadBytes, getDownloadURL, deleteObject, list, listAll} from "firebase/storage"
import { mangaData } from '../assets/redux/mangaSlice';

function Edit() {
    const [file, setFile] = useState("");
    const [coverManga, setcoverManga] = useState(null);
    const [selectedOptions, setselectedOptions] = useState([])
    const [name, setname] = useState("")
    const [author, setauthor] = useState("")
    const [language, setlanguage] = useState("")
    const [status, setstatus] = useState("")
    const [genre, setgenre] = useState([]); // genre value to select
    const [handleGenre, sethandleGenre] = useState([]); // for post api
    const [constGenre, setconstGenre] = useState([])
    const [characterData, setcharacterData] = useState([]);
    const [chapterData, setchapterData] = useState([]);
    const [data, setdata] = useState({});
    const [handleSelected_og, sethandleSelected_og] = useState(false); //for selected on going
    const [handleSelected_fn, sethandleSelected_fn] = useState(false);//for selected finished
    const [handleSelected_cn, sethandleSelected_cn] = useState(false);//for selected cancelled
    const [handleDisabled, sethandleDisabled] = useState(true);
    const { mangaId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const token = useSelector(state=>state.persistedReducer.auth.token.accessToken);
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
      function handleLanguage(e){
        setlanguage(e.target.value);
      }
      function handlestatus(e){
        console.log(e.target.value);
        setstatus(e.target.value);
      }
      const validate = () =>{
        let errorText="";
        if(file.length==0 && name.length==0 && author.length==0 && language.length==0 && status.length==0 && selectedOptions.length==0){
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
        if(errorText.length==0){
          Submit();
        }else{
          alert(errorText);
        }
      }
  const uploadImage = () =>{
    const bannerRef = ref(storage, `manga/${name}/banner/`);
    listAll(bannerRef).then((res)=>{
      res.items.forEach((item)=>{
        deleteObject(item);
      })
    }).catch((error)=>{
      console.log(error)
    })
    if(coverManga==null) return;
    const imageRef = ref(storage, `manga/${name}/banner/${Date.now()}`)
    uploadBytes(imageRef, coverManga).then((snapshot)=>{
          getDownloadURL(snapshot.ref).then(url=>{
            updateMangaAPI(url);
          })
    })
  }    
 const updateMangaAPI = async (url) => {
  let headersList = {
    Accept: "*/*",
    "Content-Type": "application/json",
    'Authorization': `Bearer ${token}`,
  };
  let reqOptions = {
    url: `${config.baseURL}/cpanel/manga/${mangaId}/edit`,
    method: "POST",
    headers: headersList,
    data:{
      updates:{
        name: name,
        author: author,
         language: language,
          status:status,
           cover: url,
            genre: formatGenre(),
      }
    }
  };
  try {
    let response = await axios.request(reqOptions);
     alert(response.data.message);   
     window.location.reload();
  } catch (error) {
    alert("Something went wrong! Try again");   
    window.location.reload();
  }
 } 
  const Submit = async ()=>{
    if(file!=data.cover){
      uploadImage();
    }else{
      updateMangaAPI(file);
    }

    
      }
      const getDataToEdit = async () =>{
        let headersList = {
            Accept: "*/*",
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`,
          };
          let reqOptions = {
            url: `${config.baseURL}/cpanel/manga/${mangaId}/edit`,
            method: "GET",
            headers: headersList,
          };
          try {
            let response = await axios.request(reqOptions);
                setdata(response.data.data);
                dispatch(mangaData(response.data.data));
          } catch (error) {
            alert("Error! Something went wrong :( , The manga might not be found! Please try again");
            navigate("/cpanel/dashboard");
          }
      }
      const setDataOnSite = () =>{
        setFile(data.cover);
        setname(data.name);
        setauthor(data.author);
        setlanguage(data.language);
        setstatus(data.status);

        const tempGenre = [];
        data.genre.forEach(element => {
            tempGenre.push({value: element._id, label:element.name});
        });
        setselectedOptions(tempGenre);
        setconstGenre(tempGenre);
        if(data.status=="On Going"){
          sethandleSelected_og(true);
        }else if(data.status=="Finished"){
          sethandleSelected_fn(true)
        }else{
          sethandleSelected_cn(true);
        }
        setcharacterData(data.character);
        setchapterData(data.chapter);
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
         getDataToEdit();
         getGenreAPI();
      }, [])
      useEffect(() => {
        //fetch data when it's available 
       if(!isObjEmpty(data)) setDataOnSite();
      }, [data])
      useEffect(() => {
        if(!isObjEmpty(data)){
          let anyChange = false;
      if(file!=data.cover){
         sethandleDisabled(false);
         anyChange=true;
         console.log("1");
      }
      if(name!=data.name){
        sethandleDisabled(false);
        anyChange=true;
        console.log("2");
     }
      if(author!=data.author){
        sethandleDisabled(false);
        anyChange=true;
        console.log("3");
     }
      if(language!=data.language){
        sethandleDisabled(false);
        anyChange=true;
        console.log("4");
     }
      if(status!=data.status){
        sethandleDisabled(false);
        anyChange=true;
        console.log("5");
     }
      if(selectedOptions!=constGenre){
        sethandleDisabled(false);
        anyChange=true;
        console.log("6");
     }
     if(anyChange==false){
      sethandleDisabled(true);
     }
    }
      }, [file, name, author, language, status, selectedOptions])
      
    return (
        <div className='editContainer'>
                <div className='addContainer'>
                    <h2>Edit Manga</h2>
                    <img className='manga-cover' src={file} />

                    <BoostForm.Group controlId="formFile" className="mb-3">
                        <BoostForm.Label  className='control-label'>Cover Image for the manga:</BoostForm.Label>
                        <BoostForm.Control type="file" onChange={handleChange} />
                    </BoostForm.Group>
                    <BoostForm.Group className="mb-3">
                        <BoostForm.Label  className='control-label'>Manga Name:</BoostForm.Label>
                        <BoostForm.Control type="text" placeholder="Name..." onChange={handleName} value={name}/>
                    </BoostForm.Group>
                    <BoostForm.Group className="mb-3">
                        <BoostForm.Label  className='control-label'>Author Name:</BoostForm.Label>
                        <BoostForm.Control type="text" placeholder="Author..." onChange={handleauthor} value={author}/>
                    </BoostForm.Group>
                    <BoostForm.Group className="mb-3">
                        <BoostForm.Label  className='control-label'>Language:</BoostForm.Label>
                        <BoostForm.Control type="text" placeholder="Language..." onChange={handleLanguage} value={language}/>
                    </BoostForm.Group>
                    <BoostForm.Group className="mb-3">
                        <BoostForm.Label  className='control-label'>Manga Status:</BoostForm.Label>
                        <BoostForm.Select aria-label="Default select example" onChange={handlestatus} >
                            <option>Status</option>
                            <option value="On Going" selected={handleSelected_og}>On Going</option>
                            <option value="Finished" selected={handleSelected_fn}>Finished</option>
                            <option value="Canceled" selected={handleSelected_cn}>Canceled</option>
                        </BoostForm.Select>
                    </BoostForm.Group >
                    <BoostForm.Group className="mb-3">
        <BoostForm.Label  className='control-label'>Manga Genre:</BoostForm.Label>
        <MultiSelect
          options={genre}
          value={selectedOptions}
          onChange={setselectedOptions}
          labelledBy="Select"
        >
        </MultiSelect>
      </BoostForm.Group >
    <Button sx={{ width: "50%", alignSelf: "center" }} type="button" variant="contained"  onClick={validate} disabled={handleDisabled}>Submit</Button>
                </div>
                <div className='characterContainer'>
                    <div className='characterSection'>
                        <h3>Characters</h3>
                        <Form action='characters'>
                        <Button type="submit" variant="contained">ADD CHARACTER</Button>
                    </Form>
                    </div>
                    <div className='characterItemContainer'>
                 { 
                 characterData.length==0 ? <h2 style={{color:'white', width:'100%', textAlign:'center'}}>No character ...</h2> :
                 characterData.map(item => <CharacterItem data={item} key={item._id}></CharacterItem>)
                 }
                    </div>
               
                </div>
            <div className='chapter-container'>
                <Form className="searchForm" role="search">
                    <div>
                        <img src="../assets/ic_search.png" alt="searchImg" />
                    </div>
                    <input type="search"
                        id="q"
                        name="q"
                        placeholder="Search Chapter..."

                    />
                </Form>
                <div style={{ marginTop: 20, width: "100%", textAlign: "center" }}>
                    <Form action='add-chapter'>
                        <Button sx={{ width: "80%" }} type="submit" variant="contained">ADD CHAPTER</Button>
                    </Form>
                </div>


                <div className='chapter'>


                    {
                      chapterData.length==0 ?  <h2 style={{color:'white', width:'100%', textAlign:'center', marginTop:'20px'}}>No chapter ...</h2> :
                        chapterData.map(item => <ChapterItem key={item._id} data={item}></ChapterItem>)
                    }
                </div>
            </div>

        </div>
    )
}

export default Edit