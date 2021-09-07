import React, { useState, useEffect } from "react";
import { useHistory, Link, useRouteMatch } from "react-router-dom";
import { updateCard, readCard, readDeck } from "../utils/api";
import  RenderCards from '../Helpers/cardTemplate';
import CardFormComponent from "../Helpers/cardForm.js";

//Similar to cardCreate
//need to edit handlesubmit
//need to find out how to populate info from existing deck
//im thinking I should Create a renderedCards variable
//and setter with use state at the App.js level. so that a deck
//of rendered cards is available between cardEdit cardCreate and deckView
//I need to update the rednderCard function here and in deckview and cardCreate to add an edit 
//button that directs here and add a button here to add a new card theres already a done adding
//button below which commits the deck changes and returns to the homepage. 
// {front, back, id, deckId}

export default function CardsEdit({deck, setDeck}){
    const [cardFront, setCardFront]=useState('')
    const [cardBack, setCardBack]=useState('')
    const history = useHistory()
    const { params }=useRouteMatch()
    const deckId = params.deckId
    const cardId = params.cardId

    const handleFrontUpdate =(event) => {
        setCardFront(event.target.value)
    }

    const handleBackUpdate=(event) =>{
        setCardBack(event.target.value)
    }

    const handleSubmit = (event) =>{
        /* construct new card from updated vars (front back)
        create abort controller and call createCard with (deckid, card, signal)
        get updated list of cards with call listcards(deckid signal) and set it with setcardlist
        */

        //this needs a redirect added to it
       event.preventDefault()
       if(cardFront.trim().length !==0 && cardBack.trim().length !== 0){
       const newCard={'id': Number(cardId), 'deckId':Number(deckId), 'front': cardFront, 'back': cardBack}
       const abortCtrl = new AbortController()
       updateCard(newCard, abortCtrl.signal)
       .then(() => setDeck(readDeck(deckId)))
       .then(() =>{
         window.alert('card updated');
         history.push(`/decks/${deckId}`)
       })
       }else{window.alert('Card can not be blank on front or back. Please try again.')}
    }

    const handleComplete = () => {
      deck.cards?.length < 3 ? window.alert(`Deck must have at least 3 cards please add at least ${deck.cards.length-3 || 3} more`) : history.push('/')
    }


    const abortCtrl = new AbortController()
    useEffect(() => {
      if(!deck.cards){
        readDeck(deckId, abortCtrl.signal)
        .then((result) => setDeck(result))
      }	
      //eslint-disable-next-line
    },[deck])

    useEffect(() => {
        const abortCtrl = new AbortController()
        readCard(cardId, abortCtrl.signal)
                    .then((resp) => {
                        setCardFront(resp.front)
                        setCardBack(resp.back)
                    })}, [cardId])
    

    return (
        <div className='container'>
        <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to='/'>Home</Link></li>
          <li className="breadcrumb-item" aria-current="page">Edit Deck</li>
          <li className="breadcrumb-item" aria-current="page">{deck.name}</li>
          <li className="breadcrumb-item active" aria-current="page">Edit Card</li>
       </ol>
      </nav>

            <div className="card pl-3 pt-1">
                <h3>{deck.name}</h3>
                <p>{deck.description}</p>  
            </div>
      <CardFormComponent cardFront={cardFront} cardBack={cardBack} handleSubmit={handleSubmit} handleFrontUpdate={handleFrontUpdate} handleBackUpdate={handleBackUpdate} />
      
      <div className = 'container-fluid'>
      <button form ='CardForm' className='btn btn-primary mr-2' type="submit">Edit Card</button>
      <Link to={`/decks/${deckId}/cards/new`}><button className="btn btn-secondary my-3 mr-2"><span className = 'oi oi-plus' />Add New Card</button></Link>
      <button onClick={handleComplete} className="btn btn-secondary my-3">Done Adding</button>
      </div>
    
    <RenderCards deck={deck} setDeck={setDeck} />
    </div>
    )
}