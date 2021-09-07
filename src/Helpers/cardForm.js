import React from 'react';

export default function CardFormComponent({cardFront, cardBack, handleSubmit, handleFrontUpdate, handleBackUpdate}){

    return(
        <form id="CardForm" onSubmit={handleSubmit}>
        <label htmlFor="cardFront" className="mr-3">
          Card Front
        </label>
        <textarea
          form="CardForm"
          name="cardFront"
          className="form-control mr-5"
          placeholder="Enter text for front of card"
          value={cardFront}
          onChange={handleFrontUpdate}
        />
        <br />
        <label htmlFor="cardBack" className="mr-3">
          Card Back
        </label>
        <textarea
          form="CardForm"
          className="form-control"
          name="cardBack"
          placeholder="Enter text for back of card"
          value={cardBack}
          onChange={handleBackUpdate}
        />

      </form>
    )
}