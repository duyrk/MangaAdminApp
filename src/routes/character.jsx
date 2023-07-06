import React, { useEffect, useState } from "react";
import CharacterItem from "./items/characterItem";
import { Button } from "@mui/material";
import { Form, useNavigate, useParams } from "react-router-dom";
import { config } from "../services/config";
import axios from "axios";
import { useSelector } from "react-redux";
import {ref, uploadBytes, getDownloadURL, deleteObject} from "firebase/storage"
import { storage } from '../assets/firebase';
const CharacterManga = (props) =>{
  const navigate = useNavigate();
  const token = useSelector(state=>state.persistedReducer.auth.token.accessToken);
  const mangaName = useSelector(state=>state.persistedReducer.manga.detail.currentData.name);
  const { data, mangaId } = props;
  const deleteACharacter = async () =>{
    /// delete file in firebase
    const characterRef = ref(storage, `manga/${mangaName}/characters/${data.name}`)
    deleteObject(characterRef).then(()=>{
      console.log("Deleted in firebase successfully!");
    }).catch((error)=>{
      console.log("Error occurred! Can't delete in firebase");
    })
    /// delete in database
    let headersList = {
      Accept: "*/*",
      "Content-Type": "application/json",
      'Authorization': `Bearer ${token}`,
    };
    let reqOptions = {
      url: `${config.baseURL}/cpanel/manga/${mangaId}/edit/characters/${data._id}/delete`,
      method: "POST",
      headers: headersList,

    };
    try {
      let response = await axios.request(reqOptions);
      alert(response.data.message);
      window.location.reload();
    } catch (error) {
      console.log("Get character by manga id error"+error);
      alert("Error! Something went wrong. Manga id might not be found. Please try again");
    }
  }
  return(
  <div className="character-item">
  <CharacterItem data={data}></CharacterItem>

  <div className="edit-section">
    <button
      className="editButton"
      onClick={() => {
        navigate(`/cpanel/manga/${mangaId}/edit/characters/${data._id}/edit`)
      }}
    >
      Edit this character
    </button>
    <button
      className="deleteButton2"
      onClick={deleteACharacter}
    >
      Delete this character
    </button>
  </div>
</div>
  )
}


export default function Character() {
  const { mangaId } = useParams();
  const navigate = useNavigate();
  const token = useSelector(state=>state.persistedReducer.auth.token.accessToken);
  const [characterData, setcharacterData] = useState([]);
  const getCharacterByMangaId = async ()=>{ 

          let headersList = {
            Accept: "*/*",
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`,
          };
          let reqOptions = {
            url: `${config.baseURL}/cpanel/manga/${mangaId}/edit/characters`,
            method: "GET",
            headers: headersList,

          };
          try {
            let response = await axios.request(reqOptions);
            console.log(response.data.data);
            setcharacterData(response.data.data);
          } catch (error) {
            console.log("Get character by manga id error"+error);
            alert("Error! Something went wrong. Manga id might not be found. Please try again");
          }
     
  }
useEffect(() => {
  getCharacterByMangaId();
}, [])

  return (
    <div className="edit-character-container">
      <h2>Characters</h2>
      <Form action="add">
      <Button
            type="submit"
            variant="contained"
          >
            Add a character
          </Button>
      </Form>
   
      <div style={{marginTop:"30px"}}>
        {
          characterData.length==0 ? <h2 >There is no character yet. Let's add one!</h2> :
          characterData.map(item=>  <CharacterManga data={item} key={item._id} mangaId={mangaId}></CharacterManga>)
        }
            
      </div>
    </div>
  );
}
