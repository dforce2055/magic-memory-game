/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import { v4 as uuid } from 'uuid'
import './App.css'
import { Card } from './interfaces'
import SingleCard from './components/SingleCard'

const cardImages: Card[] = [
  { id: uuid(), src: 'img/helmet-1.png', matched: false, disabled: false },
  { id: uuid(), src: 'img/potion-1.png', matched: false, disabled: false },
  { id: uuid(), src: 'img/ring-1.png', matched: false, disabled: false },
  { id: uuid(), src: 'img/scroll-1.png', matched: false, disabled: false },
  { id: uuid(), src: 'img/shield-1.png', matched: false, disabled: false },
  { id: uuid(), src: 'img/sword-1.png', matched: false, disabled: false },
]

function App() {
  const [cards, setCards] = useState<Card[]>([])
  const [turns, setTurns] = useState<number>(0)
  const [choiceOne, setChoiceOne] = useState<Card | null>(null)
  const [choiceTwo, setChoiceTwo] = useState<Card | null>(null)
  const [disabled, setDisabled] = useState<boolean>(false)
  
  // shufle cards
  const shufleCards = () => {
    const shuffledCars: Card[] = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: uuid() }))
    
    setChoiceOne(null)
    setChoiceTwo(null)
    setCards(shuffledCars)
    setTurns(0)
  }

  const handleChoice = (card: Card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }

  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(turns + 1)
    setDisabled(false)
  }

  // compare cards
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true)
      if (choiceOne.src === choiceTwo.src) {
        setCards(prevCards => { // prevCars => previus State of cards
          return prevCards.map(card => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true }
            } else {
              return card
            }
          })
        })
        resetTurn()
      } else {
        setTimeout(() => { resetTurn() }, 1000)
        
      }
    }
  }, [choiceOne, choiceTwo])

  // check the turns and reset the game
  useEffect( () => {
    shufleCards()
  }, [])
  
  // Chec if you won
  useEffect(() => {
    if (cards.length > 2) {
      const won = cards.every(card => card.matched)
      if (won)
        alert('You won!')
    }
  }, [cards])

  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button
        onClick={shufleCards}
      >
        New Game
      </button>
      <div className="card-grid">
        {cards.map((card) => (
          <SingleCard
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </div>
      <p>Turns: {turns}</p>
    </div>
  )
}

export default App