import React from "react";
import Die from "./components/Die";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

export default function App() {
  const [dice, setDice] = React.useState(allNewDice()); // initialise an array of random numbers

  /**
   * creates a new die
   */
  function createNewDie() {
    return {
      value: Math.floor(Math.random() * 6) + 1,
      id: nanoid(),
      isHeld: false,
    };
  }

  /**
   * returns an array of die objects
   */
  function allNewDice() {
    const diceArray = [];
    for (let i = 0; i < 10; i++) {
      diceArray.push(createNewDie()); // push a new die object
    }
    return diceArray;
  }

  /**
   * re-rolls only the dice that are not currently being held
   */
  function rollDice() {
    // return the new state
    setDice((prevDice) => {
      return prevDice.map((die) => {
        if (die.isHeld) {
          return die; // do not touch this
        } else {
          // re-roll (get a new die)
          return createNewDie();
        }
      });
    });
  }

  /**
   *
   * modifies the state, flips isHeld of a dice with the given id
   */
  function holdDice(id) {
    // return the new state
    setDice((prevDice) => {
      return prevDice.map((die) => {
        if (die.id === id) {
          return {
            ...die,
            isHeld: !die.isHeld, // modify
          };
        } else {
          return die; // return unmofidied
        }
      });
    });
  }

  /**
   * turns a random number into a JSX element
   */
  const diceElements = dice.map((die) => {
    return (
      <Die
        key={die.id}
        value={die.value}
        isHeld={die.isHeld}
        holdDice={() => holdDice(die.id)} // pass down the f() with the id
      />
    );
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
