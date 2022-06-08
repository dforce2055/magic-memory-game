import React from 'react';
import './single-card.css'
import { Card } from '../interfaces';

interface Props {
  card: Card
  handleChoice: (card: Card) => void,
  flipped: boolean,
  disabled: boolean,
}
const SingleCard = ({ card, handleChoice, flipped, disabled }: Props) => {
  const handleClick = () => {
    if(!disabled)
      handleChoice(card)
  }
  return (
    <div
      className='card'
      key={card.id}
    >
      <div className={flipped ? "flipped": ""}>
        <img className="front" src={card.src} alt="card front"/>
        <img
          className="back"
          src='/img/cover.png'
          alt="card back"
          onClick={handleClick}
        />
      </div>
    </div>
  )
}

export default SingleCard