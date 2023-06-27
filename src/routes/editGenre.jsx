import { Button } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Form as BoostForm } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { config } from '../services/config';
export default function EditGenre() {
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
    const {id} = useParams();
    const token = useSelector(state=>state.persistedReducer.auth.token.accessToken)
    const getGenreByIdAPI = async () =>{
      let headersList = {
        Accept: "*/*",
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`,
      };
      let reqOptions = {
        url: `${config.baseURL}/cpanel/genre/${id}/edit`,
        method: "GET",
        headers: headersList,
      };
      try {
        let response = await axios.request(reqOptions);
          if(response.data.error==false){
           const data = response.data.data;
            setname(data.name);
            setdescription(data.description);
          }
      } catch (error) {
        alert("Genre not found!");
        navigate('/cpanel/genre')
      }
    }
    useEffect(() => {
      getGenreByIdAPI();
    }, [])
    
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
    const handleSubmit = async ()=>{
      let headersList = {
        Accept: "*/*",
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`,
      };
      let reqOptions = {
        url: `${config.baseURL}/cpanel/genre/${id}/edit`,
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
    <h2>Edit Genre</h2>
              <BoostForm.Group className="mb-3">
        <BoostForm.Label>Genre Name:</BoostForm.Label>
        <BoostForm.Control type="text" placeholder="Genre name..." onChange={handleName} value={name || ""}/>
      </BoostForm.Group>
      <BoostForm.Group className="mb-3">
        <BoostForm.Label>Description</BoostForm.Label>
        <BoostForm.Control as={"textarea"} rows={3} placeholder="Genre name..." onChange={handleDescription} value={description || ""}/>
      </BoostForm.Group>
      <Button sx={{ width: "30%", alignSelf:"center" }} type="button" variant="contained" onClick={validate}>Submit</Button>

    </div>
  )
}
