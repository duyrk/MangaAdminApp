
import { Button, ThemeProvider } from '@mui/material';
import React, { useState } from 'react'
import { Form as BoostForm } from 'react-bootstrap';
import { Form } from 'react-router-dom';
import { myTheme } from "../assets/MyTheme"
import ChapterItem from './items/chapterItem';


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
    function handleChange(e) {
        console.log(e.target.files);
        setFile(URL.createObjectURL(e.target.files[0]));
    }
    return (
        <div className='editContainer'>
            <Form className='add-form'>
                <div className='addContainer'>
                    <h2>Add Manga</h2>
                    <Button sx={{ width: "15%", alignSelf: "flex-end" }} type="submit" variant="contained">Submit</Button>
                    <img className='manga-cover' src={file} />

                    <BoostForm.Group controlId="formFile" className="mb-3">
                        <BoostForm.Label>Cover Image for the manga:</BoostForm.Label>
                        <BoostForm.Control type="file" onChange={handleChange} />
                    </BoostForm.Group>
                    <BoostForm.Group className="mb-3">
                        <BoostForm.Label>Manga Name:</BoostForm.Label>
                        <BoostForm.Control type="text" placeholder="Name..." />
                    </BoostForm.Group>
                    <BoostForm.Group className="mb-3">
                        <BoostForm.Label>Author Name:</BoostForm.Label>
                        <BoostForm.Control type="text" placeholder="Author..." />
                    </BoostForm.Group>
                    <BoostForm.Group className="mb-3">
                        <BoostForm.Label>Manga Status:</BoostForm.Label>
                        <BoostForm.Select aria-label="Default select example">
                            <option>Status</option>
                            <option value="1">On Going</option>
                            <option value="2">Finished</option>
                            <option value="3">Canceled</option>
                        </BoostForm.Select>
                    </BoostForm.Group >



                </div>
            </Form>
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