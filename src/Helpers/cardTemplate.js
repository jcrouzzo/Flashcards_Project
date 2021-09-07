import React from 'react'
import { useHistory } from 'react-router-dom'
import { deleteCard, readDeck } from '../utils/api'

export default function RenderCards({deck, setDeck}){
    const history=useHistory()
    const cardRemove = (id, deckId) => {
        if(window.confirm('Are you sure you want to delete this? it can not be undone.')){
        const abortCtrl=new AbortController()

        deleteCard(id, abortCtrl.signal).then(() => {
            const abortCtrl= new AbortController()
            const updatedDeck=readDeck(deckId, abortCtrl.signal)
            setDeck(updatedDeck)}
        ).then(() => history.go(0))
      }
    }

    const renderedCards = deck.cards?.map((card) => {return ( <div className="card pl-2 pt-1 mb-2 border-dark" key ={card.id}>
            <h6 className='pb-1'><strong>Front: </strong>{card.front}</h6>
            <h6><strong>Back: </strong>{card.back}</h6>
            <div className='row container-fluid' style={{justifyContent: 'space-between'}}>
            <button className = 'btn btn-success ml-2 mb-2 mr-2' onClick={()=> {
                window.scrollTo(0, 0);
                history.push(`/decks/${deck.id}/cards/${card.id}/edit`)
                }}>
            <span className = 'oi oi-pencil' /> Edit Card
            </button>
            <button onClick={() => cardRemove(card.id, deck.id)} className = 'btn btn-danger mb-2 mr-2'><span className = 'oi oi-trash' /> Delete</button>
            </div>  
        </div>
    )})
    
    return renderedCards? renderedCards : null
}