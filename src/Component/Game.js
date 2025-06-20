import React, { useRef } from 'react';

import dice1 from '../assets/diceone.png';
import dice2 from '../assets/dicetwo.png';
import dice3 from '../assets/dicethree.png';
import dice4 from '../assets/dicefour.png';
import dice5 from '../assets/dicefive.png';
import dice6 from '../assets/dicesix.png';

function Game() {
  const text1 = useRef();
  const dice1Ref = useRef();
  const dice2Ref = useRef();
  const para = useRef();
  const errpara = useRef();
  const diceImages = {
    1: dice1,
    2: dice2,
    3: dice3,
    4: dice4,
    5: dice5,
    6: dice6,
  };
function myfunc() {
  const inputValue = text1.current.value.trim();
  let errMsg = '';

  if (inputValue === '') {
    errMsg = 'Value is required';
    para.current.className = 'alert alert-danger';
  } else if (isNaN(inputValue)) {
    errMsg = 'Value must be a number';
    para.current.className = 'alert alert-danger';
  } else {
    const guess = Number(inputValue);

    const roll1 = Math.floor(Math.random() * 6) + 1;
    const roll2 = Math.floor(Math.random() * 6) + 1;
    const sum = roll1 + roll2;

    dice1Ref.current.src = diceImages[roll1];
    dice2Ref.current.src = diceImages[roll2];

    if (guess === 7 && sum === 7) {
      errMsg = '🎯 Exact Match: Both are 7';
      para.current.className = 'alert alert-success';
    } else if (guess < 7 && sum < 7) {
      errMsg = '❌ Failed: Both are below 7';
      para.current.className = 'alert alert-danger';
    } else if (guess > 7 && sum > 7) {
      errMsg = '✅ passed: Both are above 7';
      para.current.className = 'alert alert-success';
    } else {
      errMsg = `❌ Failed: Your guess was ${guess}, but dice sum is ${sum}`;
      para.current.className = 'alert alert-danger';
    }
  }

  para.current.innerHTML = errMsg;
}

  return (
    <div>
      <h1 className="text-center m-3">7UP&7Down Game</h1>
      <div className="container w-50 bg-light border rounded p-5">
        <label className="p-2"> Enter the Number</label>
        <input
          type="text"
          ref={text1}
          className="form-control"
          placeholder="number"
        />

        <button className="btn btn-sm bg-info text-center m-3" onClick={myfunc}>
          Check
        </button>
        <p ref={para}></p>
        <p ref={errpara}></p>

        <img
          ref={dice1Ref}
          src={dice1}
          alt="Dice 1"
          width="80"
          style={{ marginRight: '10px' }}
        />
        <img ref={dice2Ref} src={dice2} alt="Dice 2" width="80" />
      </div>
    </div>
  );
}

export default Game;
