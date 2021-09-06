import React from 'react'
import { Link } from 'react-router-dom'
import { deleteCard } from '../utils/api'

export default function RenderCards({deck}){

    const cardRemove = (id) => {
        if(window.confirm('Are you sure you want to delete this? it can not be undone.')){
        const abortCtrl=new AbortController()
        console.log(id)
        deleteCard(id, abortCtrl.signal)
      }
    }

    const renderedCards = deck.cards?.map((card) => {return ( <div className="card pl-2 pt-1 mb-2 border-dark" key ={card.id}>
            <h6 className='pb-1'><strong>Front: </strong>{card.front}</h6>
            <h6><strong>Back: </strong>{card.back}</h6>
            <div className='row container-fluid' style={{justifyContent: 'space-between'}}>
            <div>
            <button className = 'btn btn-secondary ml-2 mb-2 mr-2'>
            <Link to={`/decks/${deck.id}/cards/${card.id}/edit`} className = 'text-white'>
            <span className = 'oi oi-pencil' /> Edit Card
            </Link>
            </button>
            </div>
            <button onClick={() => cardRemove(card.id)} className = 'btn btn-danger mb-2 mr-2'><span className = 'oi oi-trash' /> Delete</button>
            </div>  
        </div>
    )})
    
    return renderedCards? renderedCards : null
}