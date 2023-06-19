
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
function Add() {
  const [file, setFile] = useState();
  const [selectedOptions, setselectedOptions] = useState([])
  const [name, setname] = useState("")
  const [author, setauthor] = useState("")
  const [status, setstatus] = useState("")
  const [language, setlanguage] = useState("")  

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
  function handlelanguage(e){
    setlanguage(e.target.value);
  }
  function handlestatus(e){
    console.log(e.target.value);
    setstatus(e.target.value);
  }
  return (
    <div className='addContainer'>
      <h2>Add Manga</h2>
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
        <BoostForm.Control type="text" placeholder="Author..." onChange={handleauthor}/>
      </BoostForm.Group>
      <BoostForm.Group className="mb-3">
        <BoostForm.Label  className='control-label'>Language:</BoostForm.Label>
        <BoostForm.Control type="text" placeholder="Language..." onChange={handlelanguage}/>
      </BoostForm.Group>
      <BoostForm.Group className="mb-3">
        <BoostForm.Label className='control-label'>Manga Status:</BoostForm.Label>
        <BoostForm.Select aria-label="Default select example" onChange={handlestatus}>
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
      <Button sx={{ width: "100%", marginTop: 5 }} type="submit" variant="contained">Submit</Button>


    </div>
  )
}

export default Add