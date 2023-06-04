import React from "react";
import { Form, Link } from "react-router-dom";
const data = [
  {
    id: "1",
    name: "Action",
    description:
      " a film genre in which the protagonist is thrust into a series of events that typically involve violence and physical feats.",
  },
  {
    id: "2",
    name: "Romance",
    description:
      "involve romantic love stories recorded in visual media for broadcast in theatres or on television that focus on passion, emotion, and the affectionate romantic involvement of the main characters.",
  },
  {
    id: "3",
    name: "Comedy",
    description:
      "a genre of fiction that consists of discourses or works intended to be humorous or amusing by inducing laughter",
  },
  {
    id: "4",
    name: "Isekai",
    description:
      " is a genre of speculative fiction—both portal fantasy and science fiction are included. It includes novels, light novels, films, manga, anime and video games that revolve around a displaced person or people who are transported to and have to survive in another world, such as a fantasy world, virtual world, or parallel universe. ",
  },
];
const GenreItem = (props) => {
  const { data } = props;

  return (
    <div className="genreItem">
      <div>Genre: {data.name}</div>
      <div>{data.description} </div>
      <button
        type="button"
        className="deleteButton1"
        onClick={() => {
            //handle delete here
          console.log(data.id);
        }}
      >
        X
      </button>
    </div>
  );
};

export default function Feature() {
  return (
    <div className="featureContainer">
      <Form className="searchForm" role="search">
        <div>
          <img src="../assets/ic_search.png" alt="searchImg" />
        </div>
        <input type="search" id="q" name="q" placeholder="Search..." />
      </Form>
      <h2>Feature</h2>
      <button className="add_genre_button">
        <Link to={"/genre/add"}>Add a new genre</Link>
      </button>
      <div className="genreContainer">
        {data.map((item) => (
          <GenreItem data={item}></GenreItem>
        ))}
      </div>
    </div>
  );
}
