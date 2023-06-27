import { Button } from '@mui/material';
import React, { useState } from 'react'
import { Form as BoostForm } from 'react-bootstrap';
import { config } from '../services/config';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
export default function AddGenre() {
    const [name, setname] = useState("")
    const [description, setdescription] = useState("")
    const navigate = useNavigate();

    const handleName = (e) =>{
        console.log(e.target.value)
        setname(e.target.value);
    }
    const handleDescription = (e) =>{
      console.log(e.target.value)
      setdescription(e.target.value);
  }
    const validate = ()=>{
      if(name.length==0 && description==0){
        alert("Cannot be empty!")
      }else if(name.length==0){
        alert("Name cannot be empty!")
      }else if(description==0){
        alert("Description cannot be empty!")
      }else{
       handleSubmit();
      }
      
    }
    const token = useSelector(state=>state.persistedReducer.auth.token.accessToken)
    const handleSubmit = async ()=>{
      let headersList = {
        Accept: "*/*",
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`,
      };
      let reqOptions = {
        url: `${config.baseURL}/cpanel/genre/add`,
        method: "POST",
        headers: headersList,
        data: {name: name, description: description}
      };
      try {
        let response = await axios.request(reqOptions);
          if(response.data.error==false){
            alert(response.data.message);
            navigate('/cpanel/genre')
          }else{
            alert(response.data.message);
          }
      } catch (error) {
        console.log("Add genre error" + error);
      }
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
      <Button sx={{ width: "30%", alignSelf:"center" }} type="button" variant="contained" onClick={validate}>Submit</Button>

    </div>
  )
}
