import React from "react";
import CharacterItem from "./items/characterItem";
import { Button } from "@mui/material";

export default function Character() {
  return (
    <div className="edit-character-container">
      <h2>Characters</h2>
      <Button
            sx={{ width: "30%", alignSelf: "center" }}
            type="button"
            variant="contained"
            onClick={() => {
              console.log("handle add here");
            }}
          >
            Add a character
          </Button>
      <div>
        <div className="character-item">
          <CharacterItem></CharacterItem>
      
          <div className="edit-section">
            <button
              className="editButton"
              onClick={() => {
                console.log("handle edit here");
              }}
            >
              Edit this character
            </button>
            <button
              className="deleteButton2"
              onClick={() => {
                console.log("handle delete here");
              }}
            >
              Delete this character
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
