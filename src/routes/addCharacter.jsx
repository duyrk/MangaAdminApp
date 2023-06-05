
import { Button, ThemeProvider } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { Form as BoostForm } from 'react-bootstrap';
import { Form } from 'react-router-dom';
import { myTheme } from "../assets/MyTheme"
import Select from 'react-select'
import { MultiSelect } from 'react-multi-select-component';
const options = [
  { value: 'Action', label: 'Action' },
  { value: 'Romance', label: 'Romance' },
  { value: 'Comedy', label: 'Comedy' },
];
function AddCharacter() {
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
  function handleDescription(e){
    setauthor(e.target.value);
  }

  return (
    <div className='addContainer'>
      <h2>Add Character</h2>
      <img className='manga-cover' src={file} />


      <BoostForm.Group controlId="formFile" className="mb-3">
        <BoostForm.Label  className='control-label'>Character Image:</BoostForm.Label>
        <BoostForm.Control type="file" onChange={handleChange} />
      </BoostForm.Group>
      <BoostForm.Group className="mb-3">
        <BoostForm.Label  className='control-label'>Character Name:</BoostForm.Label>
        <BoostForm.Control type="text" placeholder="Name..." onChange={handleName}/>
      </BoostForm.Group>
      <BoostForm.Group className="mb-3">
        <BoostForm.Label  className='control-label'>Description:</BoostForm.Label>
        <BoostForm.Control as={"textarea"} rows={3} placeholder="Description..." onChange={handleDescription}/>
      </BoostForm.Group>
      <Button sx={{ width: "100%", marginTop: 5 }} type="submit" variant="contained">Submit</Button>


    </div>
  )
}

export default AddCharacter