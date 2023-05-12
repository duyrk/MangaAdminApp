
import { Button, ThemeProvider } from '@mui/material';
import React, { useState } from 'react'
import { Form as BoostForm } from 'react-bootstrap';
import { Form } from 'react-router-dom';
import { myTheme } from "../assets/MyTheme"
function Add() {
  const [file, setFile] = useState();
  function handleChange(e) {
    console.log(e.target.files);
    setFile(URL.createObjectURL(e.target.files[0]));
  }
  return (
    <div className='addContainer'>
      <h2>Add Manga</h2>
      <img className='manga-cover' src={file} />
<Form className='add-form'>


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

      <Button sx={{width:"30%"}} type="submit" variant="contained">Submit</Button>

      </Form>
     
    </div>
  )
}

export default Add