import React from "react";
import { Link } from 'react-router-dom';
import DeckRender from './deckList.js'




function Layout({decks, setDecks}) {
  return (
    <>
      <div className="container">
      <Link to='/decks/new' className="btn btn-primary "><span className='oi oi-plus' /> Create Deck</Link>
      <DeckRender decks={decks} setDecks={setDecks} />
      </div>
    </>
  );
}

export default Layout;
