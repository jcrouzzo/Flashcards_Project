import React, { useEffect } from "react";
import { deleteDeck, listDecks } from '../utils/api';
import {useHistory, Link} from 'react-router-dom'





export default function DeckRender({decks, setDecks}){
       const history = useHistory()
       useEffect(()=>{ 
        const abortCtrl = new AbortController()
        listDecks(abortCtrl.signal).then(setDecks)
       // eslint-disable-next-line react-hooks/exhaustive-deps
       }, [])

        const DeckRemove = (deckId) =>{
            
            if (window.confirm('Are you sure you want to delete this? it can not be undone.')){
            const abortCtrl = new AbortController()
            deleteDeck(deckId, abortCtrl.signal)
            .then(async () => {
                const deckList = await listDecks(abortCtrl.signal);
                console.log(deckList)
                setDecks(deckList)
            })
            .then(() => history.go(0))
            
            } 
        }
        const output = decks?.map((deck) =>{
                
                return (
                <div className='card my-4' key={deck.id}>
                    <h3 className ='ml-2'>{deck.name}</h3>
                    <p className = 'ml-2'>{deck.description}</p>
                    <p className = 'ml-2'> {deck.cards.length} cards </p>
                    <div className='row container-fluid' style={{justifyContent: 'space-between'}}>
                    <div>
                    <button className = 'btn btn-secondary ml-2 mb-2 mr-2'>
                    <Link to={`/decks/${deck.id}`} className = 'text-white'>
                    <span className = 'oi oi-eye' /> View
                    </Link>
                    </button>
                    <button className = 'btn btn-primary ml-2 mb-2'>
                    <Link to={`/decks/${deck.id}/study`} className = 'text-white'>
                    <span className='oi oi-book' />Study
                    </Link>
                    </button>
                    </div>
                    <button className = 'btn btn-danger mb-2 mr-2' onClick ={() => {DeckRemove(deck.id)}}><span className = 'oi oi-trash' /> Delete</button>
                    </div>
                </div>
                )
            })
            return output
        }
       
    
    



