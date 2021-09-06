import React, { useState, useEffect } from "react";
import { useHistory, useRouteMatch, Link } from "react-router-dom";
import { updateDeck ,createDeck, listDecks, readDeck } from "../utils/api";


/*
Take in deck id
retrieve deck name and description to edit and set to state variables using setter functions
on form change call handle * change to update the state variables
once these are changed and submit is clicked use updatedeck function to send updated details using useeffect
then call updated decklist using setDecks and then redirect to homepage
*/
export default function DeckManagement({setDecks}) {
  const [deckName, setDeckName] = useState("");
  const [deckDescription, setDeckDescription] = useState("");
  const [label, setLabel] = useState("Create Deck")
  const history = useHistory()
  const { params } = useRouteMatch()
  const deckId = params.deckId
 
 
  const existingDeck = (deckId) =>{
    const abortCtrl = new AbortController();
    readDeck(deckId, abortCtrl.signal)
    .then((result) =>{
      setDeckName(result.name)
      setDeckDescription(result.description)
      setLabel('Edit Deck')
    })
  }
 
  useEffect(() =>{
    let newDeck
    deckId ? existingDeck(deckId) : newDeck = true
  }, [deckId])




  const handleNameChange = (event) => setDeckName(event.target.value) 
  const handleDescriptionChange = (event) => setDeckDescription(event.target.value)

  const handleSubmit = (event) => { 
    event.preventDefault();
    if(deckName.trim().length !== 0 || deckDescription.trim().length !== 0) {
      if(deckId){
        const updatedDeck = {'id':deckId, 'name': deckName, 'description': deckDescription };
        const abortCtrl = new AbortController();
        updateDeck(updatedDeck, abortCtrl.signal)
          .then(setDecks(listDecks(abortCtrl.signal)))
          .then(history.push(`/decks/${deckId}`))
          .catch((e) => console.error(e));
      }
      else{
      const newDeck = { 'name': deckName, 'description': deckDescription };
      const abortCtrl = new AbortController();
      createDeck(newDeck, abortCtrl.signal)
        .then((resp) => history.push(`/decks/${resp.id}/cards/new`))
        .catch((e) => console.error(e));

      }
    }else{
        window.alert("Form can not be blank please try again");
    }
  };
 

  return (
    <div className="container" onSubmit={handleSubmit}>
        <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to="/">Home</Link></li>
          <li className="breadcrumb-item" aria-current="page">{label}</li>
          <li className="breadcrumb-item active" aria-current="page">{deckName}</li>
       </ol>
      </nav>

      <form id="editDeckForm">
        <label htmlFor="deckName" className="mr-3">
          Deck Name
        </label>
        <input
          type="text"
          name="deckName"
          className="form-control mr-5"
          placeholder="Enter a name for your deck."
          onChange = {handleNameChange}
          value = {deckName}
        />
        <br />
        <label htmlFor="deckDescription" className="mr-3">
          Deck Description
        </label>
        <textarea
          form="createDeckForm"
          className="form-control"
          name="deckDescription"
          placeholder="Enter a description for your deck."
          onChange = {handleDescriptionChange}
          value = {deckDescription}
        />
        <button type="submit" className="btn btn-primary mt-3">
          {label}
        </button>
      </form>
    </div>
  );
}
