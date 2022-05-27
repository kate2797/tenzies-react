import React from "react";
import Die from "./components/Die";

export default function App() {
  const [dice, setDice] = React.useState(allNewDice()); // initialise an array of random numbers

  function allNewDice() {
    const diceArray = [];
    for (let i = 0; i < 10; i++) {
      let randomNum = Math.floor(Math.random() * 6) + 1;
      diceArray.push(randomNum);
    }
    return diceArray;
  }

  function rollDice() {
    setDice(allNewDice); // get a new dice arrangement
  }

  // turn random number into a JSX element
  const diceElements = dice.map((die) => {
    return <Die value={die} />;
  });

  return (
    <main>
      <div className='dice-container'>{diceElements}</div>
      <button className='roll-dice' onClick={rollDice}>
        Roll Dice
      </button>
    </main>
  );
}
