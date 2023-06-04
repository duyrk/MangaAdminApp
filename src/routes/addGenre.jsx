import { Button } from '@mui/material';
import React from 'react'
import { Form as BoostForm } from 'react-bootstrap';
export default function AddGenre() {
    const handleSubmit = () =>{
        console.log("alo")
        //submit add genre here
    }
  return (
    <div className='add-genrecontainer'>
    <h2>Add Genre</h2>
              <BoostForm.Group className="mb-3">
        <BoostForm.Label>Genre Name:</BoostForm.Label>
        <BoostForm.Control type="text" placeholder="Genre name..." />
      </BoostForm.Group>
      <BoostForm.Group className="mb-3">
        <BoostForm.Label>Description</BoostForm.Label>
        <BoostForm.Control type="" placeholder="Genre name..." />
      </BoostForm.Group>
      <Button sx={{ width: "30%", alignSelf:"center" }} type="button" variant="contained" onClick={handleSubmit}>Submit</Button>

    </div>
  )
}
