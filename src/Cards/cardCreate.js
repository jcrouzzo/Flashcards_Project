import React, { useState, useEffect } from "react";
import { useHistory, Link, useRouteMatch } from "react-router-dom";
import { createCard, readDeck } from "../utils/api";
import  RenderCards  from '../Helpers/cardTemplate';
import CardFormComponent from "../Helpers/cardForm.js";
/*

*/
export default function CardsCreate({deck, setDeck}){
    const [cardFront, setCardFront]=useState('')
    const [cardBack, setCardBack]=useState('')
    const history = useHistory()
    const { params }=useRouteMatch()
    const deckId = params.deckId

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
       event.preventDefault()
       if(cardFront.trim().length !==0 && cardBack.trim().length !== 0){
        const newCard={'front': cardFront, 'back': cardBack}
       const abortCtrl = new AbortController()
       createCard(deckId, newCard, abortCtrl.signal)
       .then(() => {         
         window.alert('card created')
         setCardFront('')
         setCardBack('')
          history.go(0)
       })
      
       }else{window.alert('Card can not be blank on front or back. Please try again.')}
    }

    const handleComplete = () => {
      deck.cards?.length < 3 ? window.alert(`Deck must have at least 3 cards please add at least ${deck.cards.length-3 || 3} more`) : history.push('/')
    }

  
    const abortCtrl = new AbortController()

    useEffect(() => {
        readDeck(deckId, abortCtrl.signal)
        .then((result) => setDeck(result))
      //eslint-disable-next-line
    },[])



    return (
        <div className='container'>
        <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to='/'>Home</Link></li>
          <li className="breadcrumb-item" aria-current="page">Edit Deck</li>
          <li className="breadcrumb-item" aria-current="page">{deck.name}</li>
          <li className="breadcrumb-item active" aria-current="page">Add Cards</li>
       </ol>
      </nav>

            <div className="card pl-3 pt-1">
                <h3>{deck.name}</h3>
                <p>{deck.description}</p>  
            </div>
      
      <CardFormComponent cardFront={cardFront} cardBack={cardBack} handleSubmit={handleSubmit} handleFrontUpdate={handleFrontUpdate} handleBackUpdate={handleBackUpdate} />
      
      <div className = 'container-fluid'>
      <button form ='CardForm' className='btn btn-primary mr-2' type="submit">Add Card</button>
      <Link to={`/decks/${deckId}/cards/new`}><button className="btn btn-secondary my-3 mr-2"><span className = 'oi oi-plus' />Add New Card</button></Link>
      <button onClick={handleComplete} className="btn btn-secondary my-3">Done Adding</button>
      </div>
      
      <RenderCards deck={deck} setDeck={setDeck} />
    </div>
    )
}