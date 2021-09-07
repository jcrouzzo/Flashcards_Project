import React from 'react';

export default function DeckFormComponent({deckName, deckDescription, handleSubmit, handleName, handleDescription}){

    return(
        <form id="DeckForm" onSubmit={handleSubmit}>
        <label htmlFor="deckName" className="mr-3">
          Deck Name
        </label>
        <input
          type="text"
          name="deckName"
          className="form-control mr-5"
          placeholder="Enter a name for your new deck"
          onChange = {handleName}
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
          placeholder="Enter a description for your new deck"
          onChange = {handleDescription}
          value = {deckDescription}
        />
       
      </form>
    )
}