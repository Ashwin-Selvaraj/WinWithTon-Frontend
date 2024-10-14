import React from 'react';
import RockPaperScissors from './Games/RockPaperScissors';
import './App.css';

const choicesList = [
  {
    id: 'ROCK',
    image:
      'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/rock-image.png',
  },
  {
    id: 'SCISSORS',
    image:
      'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/scissor-image.png',
  },
  {
    id: 'PAPER',
    image:
      'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/paper-image.png',
  },
]


function App() {
  return (
    <React.Fragment>
      <RockPaperScissors choicesList={choicesList} />
    </React.Fragment>
  );
}

export default App;
