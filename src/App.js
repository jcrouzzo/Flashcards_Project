import React, { useState }from "react";
import { Route, Switch } from "react-router-dom";
import Layout from "./Layout";
import NotFound from './Layout/NotFound.js'
import Header from "./Layout/Header.js"
import CardCreate from './Cards/cardCreate.js'
import CardEdit from './Cards/cardEdit.js'
import DeckCreate from './Decks/deckCreate.js'
import DeckEdit from './Decks/deckEdit.js'
import DeckStudy from './Decks/deckStudy.js'
import DeckView from './Decks/deckView.js'

/**
 * App is a wrapper for <Layout>, you should not need to change this file.
 */

function App() {
  const [decks, setDecks] = useState([])
  const [deck, setDeck] =useState({})
  return (
    <>
    <Header />
    <div className="app-routes">
      <Switch>
        <Route path="/decks/new">
          <DeckCreate setDecks={setDecks}/>
        </Route>
        <Route path='/decks/:deckId/cards/new'>
          <CardCreate deck={deck} setDeck={setDeck} />
        </Route>
        <Route path='/decks/:deckId/cards/:cardId/edit'>
          <CardEdit deck={deck} setDeck={setDeck} />
        </Route>
        <Route path='/decks/:deckId/study'>
          <DeckStudy />
        </Route>
        <Route path='/decks/:deckId/edit'>
          <DeckEdit  setDeck={setDeck}/>
        </Route>
        <Route path='/decks/:deckId'>
          <DeckView deck={deck} setDeck={setDeck}/>
        </Route>
        <Route exact path="/">
          <Layout decks={decks} setDecks={setDecks}/>
        </Route>
        <Route path='*'> 
          <NotFound />
        </Route>
      </Switch>
    </div>
    </>
  );
}

export default App;
