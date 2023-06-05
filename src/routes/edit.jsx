
import { Button, ThemeProvider } from '@mui/material';
import React, { useState } from 'react'
import { Form as BoostForm } from 'react-bootstrap';
import { Form, Link } from 'react-router-dom';
import { myTheme } from "../assets/MyTheme"
import ChapterItem from './items/chapterItem';
import { MultiSelect } from 'react-multi-select-component';
import CharacterItem from './items/characterItem';
const options = [
    { value: 'Action', label: 'Action' },
    { value: 'Romance', label: 'Romance' },
    { value: 'Comedy', label: 'Comedy' },
  ];
  

const data = [
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
    const [file, setFile] = useState();
    const [selectedOptions, setselectedOptions] = useState([])
    const [name, setname] = useState("")
    const [author, setauthor] = useState("")
    const [status, setstatus] = useState("")
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
      function handlestatus(e){
        console.log(e.target.value);
        setstatus(e.target.value);
      }
      function Submit(){
        console.log("submited")
      }
    return (
        <div className='editContainer'>
  
                <div className='addContainer'>
                    <h2>Edit Manga</h2>
                    <Button sx={{ width: "15%", alignSelf: "flex-end" }} type="button" variant="contained" onClick={Submit}>Submit</Button>
                    <img className='manga-cover' src={file} />

                    <BoostForm.Group controlId="formFile" className="mb-3">
                        <BoostForm.Label  className='control-label'>Cover Image for the manga:</BoostForm.Label>
                        <BoostForm.Control type="file" onChange={handleChange} />
                    </BoostForm.Group>
                    <BoostForm.Group className="mb-3">
                        <BoostForm.Label  className='control-label'>Manga Name:</BoostForm.Label>
                        <BoostForm.Control type="text" placeholder="Name..." onChange={handleName}/>
                    </BoostForm.Group>
                    <BoostForm.Group className="mb-3">
                        <BoostForm.Label  className='control-label'>Author Name:</BoostForm.Label>
                        <BoostForm.Control type="text" placeholder="Author..." onChange={handleauthor} />
                    </BoostForm.Group>
                    <BoostForm.Group className="mb-3">
                        <BoostForm.Label  className='control-label'>Manga Status:</BoostForm.Label>
                        <BoostForm.Select aria-label="Default select example" onChange={handlestatus}>
                            <option>Status</option>
                            <option value="On Going">On Going</option>
                            <option value="Finished">Finished</option>
                            <option value="Canceled">Canceled</option>
                        </BoostForm.Select>
                    </BoostForm.Group >
                    <BoostForm.Group className="mb-3">
        <BoostForm.Label  className='control-label'>Manga Genre:</BoostForm.Label>
        <MultiSelect
          options={options}
          value={selectedOptions}
          onChange={setselectedOptions}
          labelledBy="Select"
        >
        </MultiSelect>
      </BoostForm.Group >

                </div>
                <div className='characterContainer'>
                    <div className='characterSection'>
                        <h3>Characters</h3>
                        <button className="add_genre_button">
        <Link to={"/1/edit/characters"}>Add Characters</Link>
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
                        data.map(item => <ChapterItem key={item._id} data={item}></ChapterItem>)
                    }
                </div>
            </div>

        </div>
    )
}

export default Edit