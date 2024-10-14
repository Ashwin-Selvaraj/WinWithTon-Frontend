import React, { useState } from 'react'
import { RiCloseLine } from 'react-icons/ri'
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'
import GameOptions from './GameOptions'
import './RockPaperScissors.css' // Import the external CSS

import {TonConnectUIProvider} from "@tonconnect/ui-react"
import ConnectWalletButton from '../ConnectWallet/ConnectWalletButton';

const gameStatusConstants = {
  inProgress: 'IN_PROGRESS',
  win: 'WIN',
  lost: 'LOST',
  draw: 'DRAW',
}

const RockPaperScissors = ({ choicesList }) => {
  const [score, setScore] = useState(0)
  const [gameStatus, setGameStatus] = useState(gameStatusConstants.inProgress)
  const [userChoice, setUserChoice] = useState('')
  const [gameChoice, setGameChoice] = useState('')

  const onClickSetUserChoice = (id) => {
    const selectedGameChoice = getGameChoice()
    setUserChoice(id)
    setGameChoice(selectedGameChoice)
    evaluateGame(id, selectedGameChoice)
  }

  const onClickGoToGameView = () => {
    setGameStatus(gameStatusConstants.inProgress)
    setUserChoice('')
    setGameChoice('')
  }

  const getGameChoice = () => {
    const gameChoicesList = choicesList.map(choice => choice.id)
    const randomIndex = Math.floor(Math.random() * gameChoicesList.length)
    return gameChoicesList[randomIndex]
  }

  const evaluateGame = (userChoiceId, gameChoiceId) => {
    if (userChoiceId === gameChoiceId) {
      setGameStatus(gameStatusConstants.draw)
    } else if (userChoiceId === 'ROCK') {
      if (gameChoiceId === 'SCISSORS') {
        setGameStatus(gameStatusConstants.win)
        setScore(prevScore => prevScore + 1)
      } else {
        setGameStatus(gameStatusConstants.lost)
        setScore(prevScore => prevScore - 1)
      }
    } else if (userChoiceId === 'PAPER') {
      if (gameChoiceId === 'ROCK') {
        setGameStatus(gameStatusConstants.win)
        setScore(prevScore => prevScore + 1)
      } else {
        setGameStatus(gameStatusConstants.lost)
        setScore(prevScore => prevScore - 1)
      }
    } else if (userChoiceId === 'SCISSORS') {
      if (gameChoiceId === 'PAPER') {
        setGameStatus(gameStatusConstants.win)
        setScore(prevScore => prevScore + 1)
      } else {
        setGameStatus(gameStatusConstants.lost)
        setScore(prevScore => prevScore - 1)
      }
    }
  }

  const renderGameInProgressView = () => (
    <ul className="game-options-list">
      {choicesList.map(eachOption => (
        <GameOptions
          key={eachOption.id}
          optionDetails={eachOption}
          onClickSetUserChoice={onClickSetUserChoice}
        />
      ))}
    </ul>
  )

  const renderGameResultView = (resultText) => {
    const userChoiceObject = choicesList.find(choice => choice.id === userChoice)
    const gameChoiceObject = choicesList.find(choice => choice.id === gameChoice)

    return (
      <div className="game-result-view-container">
        <div className="selected-options-container">
          <div className="game-user-option-container">
            <p className="game-participant-text">You</p>
            <img
              className="game-participant-choice-image"
              src={userChoiceObject.image}
              alt="your choice"
            />
          </div>
          <div className="game-user-option-container">
            <p className="game-participant-text">Computer</p>
            <img
              className="game-participant-choice-image"
              src={gameChoiceObject.image}
              alt="opponent choice"
            />
          </div>
        </div>
        <p className="result-text">{resultText}</p>
        <button className="play-again-button" type="button" onClick={onClickGoToGameView}>
          PLAY AGAIN
        </button>
      </div>
    )
  }

  const renderGameWonView = () => renderGameResultView('YOU WON')
  const renderGameLostView = () => renderGameResultView('YOU LOSE')
  const renderGameDrawView = () => renderGameResultView('IT IS DRAW')

  const renderGameView = () => {
    switch (gameStatus) {
      case gameStatusConstants.inProgress:
        return renderGameInProgressView()
      case gameStatusConstants.win:
        return renderGameWonView()
      case gameStatusConstants.lost:
        return renderGameLostView()
      case gameStatusConstants.draw:
        return renderGameDrawView()
      default:
        return null
    }
  }

  return (
    <div className="app-container">
      <TonConnectUIProvider manifestUrl='https://sapphire-large-cougar-300.mypinata.cloud/ipfs/QmTFt5ZYkT4anEKpaMYXEoHLcGnAAwC6w8PqQcBSeGC5Yt'>
        <ConnectWalletButton />
      </TonConnectUIProvider>
      
      
      {/* Game content goes here */}
      <div className="result-container">
        <div className="options-container">
          <h1 className="option">
            ROCK
            <br />
            <br />
            PAPER
            <br />
            <br />
            SCISSORS
          </h1>
        </div>
        <div className="score-container">
          <p className="score-phrase">Score</p>
          <p className="score-number">{score}</p>
        </div>
      </div>
  
      <div className="game-view-container">{renderGameView()}</div>
  
      {/* Popup for rules */}
      <div className="popup-container">
        <Popup
          modal
          trigger={<button className="trigger-button" type="button">Rules</button>}
          closeOnEscape
          lockScroll
        >
          {close => (
            <div className="popup-body">
              <img
                className="popup-image"
                src="https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/rules-image.png"
                alt="rules"
              />
              <button className="close-button" type="button" onClick={close}>
                <RiCloseLine />
              </button>
            </div>
          )}
        </Popup>
      </div>
    </div>
  );
  
}

export default RockPaperScissors
