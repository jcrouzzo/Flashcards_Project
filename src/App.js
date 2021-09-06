import React, { useState }from "react";
import { Route, Switch } from "react-router-dom";
import Layout from "./Layout";
import NotFound from './Layout/NotFound.js'
import Header from "./Layout/Header.js"
import DeckManagement from './Decks/deckManagement.js'
import CardManagement from './Cards/cardManage.js'
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
          <DeckManagement setDecks={setDecks}/>
        </Route>
        <Route path='/decks/:deckId/cards/new'>
          <CardManagement deck={deck} setDeck={setDeck} />
        </Route>
        <Route path='/decks/:deckId/cards/:cardId/edit'>
          <CardManagement deck={deck} setDeck={setDeck} />
        </Route>
        <Route path='/decks/:deckId/study'>
          <DeckStudy />
        </Route>
        <Route path='/decks/:deckId/edit'>
          <DeckManagement  setDecks={setDecks}/>
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
