import { Button } from '@mui/material';
import React from 'react'
import { Form as BoostForm } from 'react-bootstrap';
function Addchapter() {
  return (
    <div className='addChapter-container'>
        <div className='addChapter-label'>
    <h2>Add Chapter</h2>
    <Button sx={{ width: "15%",alignSelf:"flex-end" }} type="submit" variant="contained">Submit</Button>

        </div>
                    <BoostForm.Group className="mb-3">
                        <BoostForm.Label>Chapter Number:</BoostForm.Label>
                        <BoostForm.Control type="number" placeholder="chapter number..." />
                    </BoostForm.Group>
    </div>
  )
}

export default Addchapter