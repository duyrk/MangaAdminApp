import { Button } from '@mui/material';
import React, { useState } from 'react'
import { Form as BoostForm } from 'react-bootstrap';
export default function EditGenre() {
    const [name, setname] = useState("")
    const [description, setdescription] = useState("")


    const handleName = (e) =>{
        console.log(e.target.value)
        setname(e.target.value);
    }
    const handleDescription = (e) =>{
      console.log(e.target.value)
      setname(e.target.value);
  }
    const handleSubmit = () =>{
        console.log("alo")
        //submit add genre here
    }
  return (
    <div className='add-genrecontainer'>
    <h2>Add Genre</h2>
              <BoostForm.Group className="mb-3">
        <BoostForm.Label>Genre Name:</BoostForm.Label>
        <BoostForm.Control type="text" placeholder="Genre name..." onChange={handleName}/>
      </BoostForm.Group>
      <BoostForm.Group className="mb-3">
        <BoostForm.Label>Description</BoostForm.Label>
        <BoostForm.Control as={"textarea"} rows={3} placeholder="Genre name..." onChange={handleDescription}/>
      </BoostForm.Group>
      <Button sx={{ width: "30%", alignSelf:"center" }} type="button" variant="contained" onClick={handleSubmit}>Submit</Button>

    </div>
  )
}
