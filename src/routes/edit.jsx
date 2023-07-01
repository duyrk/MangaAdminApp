
import { Button, ThemeProvider } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { Form as BoostForm } from 'react-bootstrap';
import { Form, Link, useNavigate, useParams } from 'react-router-dom';
import ChapterItem from './items/chapterItem';
import { MultiSelect } from 'react-multi-select-component';
import CharacterItem from './items/characterItem';
import { useSelector } from 'react-redux';
import { config } from '../services/config';
import axios from 'axios';
import { isObjEmpty } from '../util/isObjEmpty';
const options = [
    { value: 'Action', label: 'Action' },
    { value: 'Romance', label: 'Romance' },
    { value: 'Comedy', label: 'Comedy' },
  ];
  

const data1 = [
    {
        "_id": 1,
        "chapterName": "An Accident",
        "chapterNumber": 1

    },
    {
        "_id": 2,
        "chapterName": "An Accident",
        "chapterNumber": 2

    },
    ,
    {
        "_id": 3,
        "chapterName": "An Accident",
        "chapterNumber": 3

    },
    ,
    {
        "_id": 4,
        "chapterName": "An Accident",
        "chapterNumber": 4

    },
    ,
    {
        "_id": 5,
        "chapterName": "An Accident",
        "chapterNumber": 5

    },
    ,
    {
        "_id": 6,
        "chapterName": "An Accident",
        "chapterNumber": 6

    },
    ,
    {
        "_id": 7,
        "chapterName": "An Accident",
        "chapterNumber": 7

    },
    ,
    {
        "_id": 8,
        "chapterName": "An Accident",
        "chapterNumber": 8

    },
    ,
    {
        "_id": 9,
        "chapterName": "An Accident",
        "chapterNumber": 9

    },
    ,
    {
        "_id": 10,
        "chapterName": "An Accident",
        "chapterNumber": 10

    },
]
function Edit() {
    const [file, setFile] = useState("");
    const [selectedOptions, setselectedOptions] = useState([])
    const [name, setname] = useState("")
    const [author, setauthor] = useState("")
    const [language, setlanguage] = useState("")
    const [status, setstatus] = useState("")
    const [genre, setgenre] = useState([]); // genre value to select
    const [handleGenre, sethandleGenre] = useState([]); // for post api
    const [characaterData, setcharacaterData] = useState([]);

    const [data, setdata] = useState({});
    const [handleSelected_og, sethandleSelected_og] = useState(false); //for selected on going
    const [handleSelected_fn, sethandleSelected_fn] = useState(false);//for selected finished
    const [handleSelected_cn, sethandleSelected_cn] = useState(false);//for selected cancelled
    const { mangaId } = useParams();
    const navigate = useNavigate();
    function handleChange(e) {
        console.log(e.target.files);
        setFile(URL.createObjectURL(e.target.files[0]));
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
      function Submit(){
        console.log("submited")
      }
      const token = useSelector(state=>state.persistedReducer.auth.token.accessToken);
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
          } catch (error) {
            // alert("Error! Some error occurs, The manga might not be found! Please try again");
            // navigate("/cpanel/dashboard");
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
      }
      //format genre when submit
  const formatGenre = () =>{
    const tempGenre = [];
    selectedOptions.forEach(element => {
        tempGenre.push(element.value);
    });
    sethandleGenre(tempGenre);
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
                            <option  value="On Going">On Going</option>
                            <option value="Finished">Finished</option>
                            <option value="Canceled">Canceled</option>
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
    <Button sx={{ width: "50%", alignSelf: "center" }} type="button" variant="contained"  onClick={Submit}>Submit</Button>
                </div>
                <div className='characterContainer'>
                    <div className='characterSection'>
                        <h3>Characters</h3>
                        <button className="add_genre_button">
        <Link to={"/cpanel/manga/1/edit/characters"}>Add Characters</Link>
      </button>
                    </div>
                    <div className='characterItemContainer'>
                        
                    <CharacterItem></CharacterItem>
                 <CharacterItem></CharacterItem>
                 <CharacterItem></CharacterItem>
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
                        data1.map(item => <ChapterItem key={item._id} data={item}></ChapterItem>)
                    }
                </div>
            </div>

        </div>
    )
}

export default Edit