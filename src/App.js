/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";

import Die from "./components/Die";
import Footer from "./components/Footer";
import Stats from "./components/Stats";

import { nanoid } from "nanoid";
import Confetti from "react-confetti";
import { useWindowSize } from "@react-hook/window-size";

export default function App() {
  const [dice, setDice] = React.useState(allNewDice()); // initialise an array of random numbers
  const [tenzies, setTenzies] = React.useState(false); // state representing if the user has won
  const [noRolls, setNoRolls] = React.useState(0);
  const [allTimeBest, setAllTimeBest] = React.useState(
    localStorage.getItem("allTimeBest") || 0
  ); // either pull out from localStorage, or if playing for the first time, set to 0

  const [width, height] = useWindowSize(); // for the Confetti component

  /**
   * checks if the user has not won, everytime dice[] is modified
   */
  React.useEffect(() => {
    handleWin();
  }, [dice]); // dependencies array

  /**
   * handles winning (updates `tenzies`), winning conditions are:
   *    1. all dice are held, and
   *    2. all dice have the same value
   */
  function handleWin() {
    const allHeld = dice.every((die) => die.isHeld);
    const firstValue = dice[0].value;
    const allSameValue = dice.every((die) => die.value === firstValue);
    if (allHeld && allSameValue) {
      setTenzies(true);
    }
  }

  // if ATB is zero, keep updating in real-time

  /**
   * saves stats to localStorage when playing for the very first time, or when we found a new best
   */
  function saveStats() {
    let stored = localStorage.getItem("allTimeBest");
    if (stored === 0 || stored === null || noRolls < stored) {
      // 0 in localStorage, use current score
      // update local state of allTimeBest
      setAllTimeBest(noRolls);
      localStorage.setItem("allTimeBest", allTimeBest);
    }
  }

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
   * wipes down all state, to start a new game
   */
  function newGame() {
    setDice(allNewDice());
    setTenzies(false);
    saveStats(); // save stats before noRolls is reset
    setNoRolls(0);
  }

  /**
   * re-rolls the dice that are not currently being held
   */
  function rollDice() {
    if (tenzies) {
      // if they won, let them play a new game
      newGame();
    } else {
      // let them re-roll the dice
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
      // track noRolls
      setNoRolls((prevNoRolls) => prevNoRolls + 1);
    }
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
    <>
      <main>
        <div className='game-container'>
          {tenzies && <Confetti width={width} height={height} />}
          <h1 className='title'>Tenzies</h1>
          <p className='instructions'>
            Roll until all dice are the same. Click each die to freeze it at its
            current value between rolls.
          </p>
          <div className='dice-container'>{diceElements}</div>
          <button className='roll-dice' onClick={rollDice}>
            {tenzies ? "New Game" : "Roll Dice"}
          </button>
        </div>
      </main>
      {noRolls > 0 && <Stats noRolls={noRolls} allTimeBest={allTimeBest} />}
      <Footer />
    </>
  );
}
