import React, { useEffect, useLayoutEffect, useState } from "react";
import { readDeck } from "../utils/api";
import { useHistory, useRouteMatch, Link } from "react-router-dom";



export default function DeckStudy() {
    const history = useHistory();
    const { params } = useRouteMatch();
    const { deckId } = params;
    const [cards, setCards] = useState([]);
    const [deck, setDeck] = useState({})
    const [currentDisplay, setCurrentDisplay] = useState(null);
    const [curLoc, setCurLoc] = useState(0)
    const [label, setLabel] = useState('flip')

    //pull cards from api then setCards
    //need to display current set display as well as knowing where it is for study purposes
    //need way to track where in deck currentDisplay is at and update based on that

    
    const abortCtrl = new AbortController()
    async function getCardsandDeck(){
        try{
            setCurLoc(0)
            const deck = await readDeck(deckId, abortCtrl.signal)
            setDeck(deck)
            setCards(deck.cards.reduce((acc, card) =>{
                acc.push(card.front)
                acc.push(card.back)
                return acc
                }, []))
            setCurrentDisplay(cards[0])
        }catch(e){
            if(e==='AbortError'){console.error('aborted cleanup in progress')}
            else{throw e}
        }
        
    }
    
    useLayoutEffect(() => {   
    getCardsandDeck()
    //eslint-disable-next-line
    }, [])
    
    useEffect(() => setCurrentDisplay(cards[curLoc]), 
    //eslint-disable-next-line
    [curLoc])

    const proceed = () =>{
        if(curLoc < cards.length-1){
            setCurLoc(curLoc+1)
            setLabel(label==='flip'? 'next' : 'flip')
            setCurrentDisplay(cards[curLoc])
        }else{window.alert('You have reached the end of this deck. Thank you for studying.')
        history.push('/')}
    }

    

    return (
        <div>
             <div className='container'>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb"> 
                        <li className="breadcrumb-item"><Link to='/'>Home</Link></li>
                        <li className="breadcrumb-item" aria-current="page">{deck.name}</li>
                        <li className="breadcrumb-item active" aria-current="page">Study</li>
                    </ol>
                </nav>
                <h1> Study: {deck.name} </h1>
            </div>

            <div className='card'>
                <center><h3 className='my-4'>{currentDisplay}</h3></center>
                {cards.length<6&& <h1>Not enough cards</h1>}
                <center><p className='my-4'>{`Card ${(Math.floor(curLoc/2))+1} of ${cards.length/2}`}</p></center>
                <div className='container-fluid justify-content-center'>
                    <button className='btn btn-primary mr-2' onClick={() => proceed()}>{label}</button>
                    <button className='btn btn-secondary' onClick={() => history.push('/')}>Done Studying</button>
                </div>
            </div>
        </div>
    )
    
}

