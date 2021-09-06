import React, { useEffect } from "react";
import {  Link, useRouteMatch } from "react-router-dom";
import {  readDeck } from "../utils/api";
import  RenderCards from '../Helpers/cardTemplate'

//Should have breadcrumbs at top followed by The deck title and description
//in a card with an edit and done viewing button underneath (leads to /)
//should then render the cards below
export default function DeckView({deck, setDeck}){
    const {params}=useRouteMatch()
    const{deckId}=params

    useEffect(() =>{
        readDeck(deckId).then((result) => setDeck(result))
    }, [])

    return(
        <div className="container">
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link to="/">Home</Link></li>
            <li className="breadcrumb-item active" aria-current="page">View Deck</li>
            <li className="breadcrumb-item active" aria-current="page">{deck.name}</li>
        </ol>
        </nav>
        <div className="card pl-3 pt-1">
                    <h3>{deck.name}</h3>
                    <p>{deck.description}</p>  
        </div>
        <br />
        <Link to={`/decks/${deck.id}/cards/new`}><button className="btn btn-primary my-3 mr-2"><span className = 'oi oi-plus' />Add New Card</button></Link>
        <Link to={`/decks/${deck.id}/edit`}><button className="btn btn-secondary my-3"><span className = 'oi oi-pencil' />Edit Deck</button></Link>
        <br />
        <RenderCards deck={deck} />
        </div>
    )
}