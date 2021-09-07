import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { createDeck } from "../utils/api";
import DeckFormComponent from '../Helpers/deckForm.js'

export default function DeckCreate({setDecks}) {
  const [deckName, setDeckName] = useState("");
  const [deckDescription, setDeckDescription] = useState("");
  const history = useHistory()
  
  const handleName = (event) => setDeckName(event.target.value) 
  const handleDescription = (event) => setDeckDescription(event.target.value)

  const handleSubmit = (event) => { 
    event.preventDefault();
    if(deckName.trim().length !== 0 || deckDescription.trim().length !== 0) {
      const newDeck = { 'name': deckName, 'description': deckDescription };
      const abortCtrl = new AbortController();
      createDeck(newDeck, abortCtrl.signal)
        .then((resp) => history.push(`/decks/${resp.id}/cards/new`))
        .catch((e) => console.error(e));
    }else{
        window.alert("Form can not be blank please try again");
    }
  };
 
  return (
    <div className="container">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to="/">Home</Link></li>
          <li className="breadcrumb-item active" aria-current="page">Create Deck</li>
          <li className="breadcrumb-item active" aria-current="page">{deckName}</li>
       </ol> 
      </nav>

      <DeckFormComponent deckName={deckName} deckDescription={deckDescription} handleSubmit={handleSubmit} handleName={handleName} handleDescription={handleDescription} />

      <button form="DeckForm" type="submit" className="btn btn-primary mt-3">
          Create Deck
        </button>
    </div>
  );
}
