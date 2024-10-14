import React from 'react'
import './GameOptions.css' // Import the external CSS

const GameOptions = ({ optionDetails, onClickSetUserChoice }) => {
  const { image, id } = optionDetails

  const handleUserChoice = () => {
    onClickSetUserChoice(id)
  }

  return (
    <li className="option-list-item">
      <button
        className="game-option-button"
        type="button"
        onClick={handleUserChoice}
        data-testid={`${id.toLowerCase()}Button`}
      >
        <img src={image} alt={id} className="option-image" />
      </button>
    </li>
  )
}

export default GameOptions
