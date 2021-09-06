import React, { useState, useEffect } from "react";
import { useHistory, Link, useRouteMatch } from "react-router-dom";
import { updateCard, createCard, readCard, readDeck } from "../utils/api";
import RenderCards from "../Helpers/cardTemplate";

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

export default function CardManagement({ deck, setDeck }) {
  const [cardFront, setCardFront] = useState("");
  const [cardBack, setCardBack] = useState("");
  const [submitLabel, setSubmitLabel] = useState("Add Card");
  const history = useHistory();
  const { params } = useRouteMatch();
  const { deckId, cardId } = params;

  const existingCard = (cardId) => {
    const abortCtrl = new AbortController();
    readCard(cardId, abortCtrl.signal)
      .then((resp) => {
        setCardFront(resp.front);
        setCardBack(resp.back);
      })
      .then(() => {
        setSubmitLabel("Update Card");
      });
  };

  const addCard = () => {
    history.push(`/decks/${deckId}/cards/new`);
    setCardFront("");
    setCardBack("");
    setSubmitLabel("Add Card");
  };


  const handleSubmit = (event) => {
    /* construct new card from updated vars (front back)
        create abort controller and call createCard with (deckid, card, signal)
        get updated list of cards with call listcards(deckid signal) and set it with setcardlist
        */

    //this needs a redirect added to it
    event.preventDefault();
    if (cardFront.trim().length !== 0 && cardBack.trim().length !== 0) {
      const abortCtrl = new AbortController();

      if (!cardId) {
        const newCard = { front: cardFront, back: cardBack };
        createCard(deckId, newCard, abortCtrl.signal)
          .then(setDeck(readDeck(deckId)))
          .finally(() => {
            setCardFront("");
            setCardBack("");
            window.alert("card created");
            history.push(`/decks/${deckId}/cards/new`);
          });
      } else {
        const newCard = {
          id: Number(cardId),
          deckId: Number(deckId),
          front: cardFront,
          back: cardBack,
        };
        updateCard(newCard, abortCtrl.signal)
          .then(setDeck(readDeck(deckId)))
          .finally(() => {
            setCardFront("");
            setCardBack("");
            window.alert("card updated");
            history.push(`/decks/${deckId}`);
          });
      }
    } else {
      window.alert("Card can not be blank on front or back. Please try again.");
    }
  };

  const handleComplete = () => {
    deck.cards?.length < 3
      ? window.alert(
          `Deck must have at least 3 cards please add at least ${
            deck.cards.length - 3 || 3
          } more`
        )
      : history.push("/");
  };

  useEffect(() => {
    const abortCtrl = new AbortController();
    readDeck(deckId, abortCtrl.signal).then((result) => {
      setDeck(result);
    });
  }, [deckId]);

  useEffect(() => {
    let newCard;
    cardId ? existingCard(cardId) : newCard = true;
  }, [cardId]);

  return (
    <div className="container">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item" aria-current="page">
            Edit Deck
          </li>
          <li className="breadcrumb-item" aria-current="page">
            {deck.name}
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {cardId ? 'Edit Card' : 'Add Card'}
          </li>
        </ol>
      </nav>

      <div className="card pl-3 pt-1">
        <h3>{deck.name}</h3>
        <p>{deck.description}</p>
      </div>
      <form id="addCardForm" onSubmit={handleSubmit}>
        <label htmlFor="cardFront" className="mr-3">
          Card Front
        </label>
        <textarea
          form="addCardForm"
          name="cardFront"
          className="form-control mr-5"
          placeholder="Enter text for front of card"
          value={cardFront}
          onChange={(e) => setCardFront(e.target.value)}
        />
        <br />
        <label htmlFor="cardBack" className="mr-3">
          Card Back
        </label>
        <textarea
          form="addCardForm"
          className="form-control"
          name="cardBack"
          placeholder="Enter text for back of card"
          value={cardBack}
          onChange={(e) => setCardBack(e.target.value)}
        />

      </form>
      <div className="container-fluid">
        <button type="submit" form='addCardForm' className="btn btn-primary mr-3">
          {submitLabel}
        </button>
        {cardId && (
          <button
            onClick={() => addCard()}
            className="btn btn-secondary my-3 mr-2"
          >
            <span className="oi oi-plus" />
            Add New Card
          </button>
        )}
        <button
          onClick={() => handleComplete}
          className="btn btn-secondary my-3"
        >
          Done Adding
        </button>
      </div>
      <RenderCards deck={deck} />
    </div>
  );
}
