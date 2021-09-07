import React, { useState, useEffect } from "react";
import { useHistory, useRouteMatch, Link } from "react-router-dom";
import { updateDeck , readDeck } from "../utils/api";
import DeckFormComponent from '../Helpers/deckForm.js'

/*
Take in deck id
retrieve deck name and description to edit and set to state variables using setter functions
on form change call handle * change to update the state variables
once these are changed and submit is clicked use updatedeck function to send updated details using useeffect
then call updated decklist using setDecks and then redirect to homepage
*/
export default function DeckEdit({setDeck}) {
  const [deckName, setDeckName] = useState("");
  const [deckDescription, setDeckDescription] = useState("");
  const history = useHistory()
  const { params } = useRouteMatch()
  const deckId = params.deckId
  useEffect(() =>{
    const abortCtrl = new AbortController()
    readDeck(deckId, abortCtrl.signal).then((result) => {
      setDeckName(result.name)
      setDeckDescription(result.description)
    })
  }, [deckId])

  const handleName = (event) => setDeckName(event.target.value) 
  const handleDescription = (event) => setDeckDescription(event.target.value)

  const handleSubmit = (event) => { 
    event.preventDefault();
    if(deckName.trim().length !== 0 || deckDescription.trim().length !== 0) {
      const updatedDeck = {'id':deckId, 'name': deckName, 'description': deckDescription };
      const abortCtrl = new AbortController();
      updateDeck(updatedDeck, abortCtrl.signal)
      .then(async () =>{
        const updatedDeck=await readDeck(deckId, abortCtrl.signal)
        setDeck(updatedDeck)})
        .then(history.push(`/decks/${deckId}`))
        .catch((e) => console.error(e));
    }else{
        window.alert("Form can not be blank please try again");
    }
  };
 
  useEffect(() =>{
    const abortCtrl = new AbortController()
    readDeck(params.deckId, abortCtrl.signal)
      .then((resp) => {
        setDeckName(resp.name)
        setDeckDescription(resp.description)
      })
  }, [params.deckId])
  return (
    <div className="container">
        <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to="/">Home</Link></li>
          <li className="breadcrumb-item" aria-current="page">Edit Deck</li>
          <li className="breadcrumb-item active" aria-current="page">{deckName}</li>
       </ol>
      </nav>

      <DeckFormComponent deckName={deckName} deckDescription={deckDescription} handleSubmit={handleSubmit} handleName={handleName} handleDescription={handleDescription} />

      <button form="DeckForm" type="submit" className="btn btn-primary mt-3">
          Edit Deck
        </button>
    </div>
  );
}
