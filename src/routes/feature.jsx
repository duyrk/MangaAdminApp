import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Form, Link, useNavigate } from "react-router-dom";
import { Button } from '@mui/material';
import { config } from "../services/config";
const GenreItem = (props) => {
  
  const { data } = props;
  const navigate = useNavigate();
  const token = useSelector(state=>state.persistedReducer.auth.token.accessToken)
  return (
    <div className="genreItem" style={{cursor: "pointer"}} onClick={()=>{navigate(`/cpanel/genre/${data._id}/edit`)}}>

      <div>Genre: {data.name}</div>
      <div>{data.description} </div>

    <div>
      <button
        type="button"
        className="deleteButton1"
        onClick={async (e) => {
          e.stopPropagation();
            //handle delete here
            let headersList = {
              Accept: "*/*",
              "Content-Type": "application/json",
              'Authorization': `Bearer ${token}`,
            };
            let reqOptions = {
              url: `${config.baseURL}/cpanel/genre/${data._id}/delete`,
              method: "POST",
              headers: headersList,
            };
            try {
              let response = await axios.request(reqOptions);
                if(response.data.error==false){
                  alert(response.data.message);
                  window.location.reload();
                }else{
                  alert(response.data.message);
                }
            } catch (error) {
              console.log("Delete genre error" + error);
            }
        }}
      >
        X
      </button>
      </div>
    </div>
  );
};

export default function Feature() {
  const [genreData, setgenreData] = useState([]);
  const token = useSelector(state=>state.persistedReducer.auth.token.accessToken);
    const getAllGenre = async ()=>{ 

            let headersList = {
              Accept: "*/*",
              "Content-Type": "application/json",
              'Authorization': `Bearer ${token}`,
            };
            let reqOptions = {
              url: `${config.baseURL}/cpanel/genre`,
              method: "GET",
              headers: headersList,

            };
            try {
              let response = await axios.request(reqOptions);
              console.log(response.data.data);

              setgenreData(response.data.data);
            } catch (error) {
              console.log("Call genre error" + error);
            }
          }
            useEffect(() => {
              getAllGenre();
            }, [])
          
  return (
    <div className="featureContainer">
      <Form className="searchForm" role="search">
        <div>
          <img src="../assets/ic_search.png" alt="searchImg" />
        </div>
        <input type="search" id="q" name="q" placeholder="Search..." />
      </Form>
      <h2>Feature</h2>
      <Form action="add">
      <Button sx={{ width: "30%", alignSelf:"center" }} type="submit" variant="contained">Add Genre</Button>
      </Form>
      <div className="genreContainer">
        {genreData.map((item) => (
          <GenreItem key={item._id} data={item}></GenreItem>
        ))}
      </div>
    </div>
  ); }