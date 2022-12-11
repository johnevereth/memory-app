import React, { useEffect, useState } from "react";
import SingleCard from "./components/SingleCard";

const cardImages = [
  { src: "/images/card-front-baseball-bat.png", matched: false },
  { src: "/images/card-front-bat.png", matched: false },
  { src: "/images/card-front-eyeball.png", matched: false },
  { src: "/images/card-front-gravestone.png", matched: false },
  { src: "/images/card-front-horns.png", matched: false },
  { src: "/images/card-front-house.png", matched: false },
  { src: "/images/card-front-knives.png", matched: false },
  { src: "/images/card-front-poison.png", matched: false },
  { src: "/images/card-front-pumpkin.png", matched: false },
  { src: "/images/card-front-skull.png", matched: false },
];

function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [guessesLeft, setGuessesLeft] = useState(1);
  const [timer, setTimer] = useState(9999999999);
  const [youWon, setYouWon] = useState(false);
  const [youLost, setYouLost] = useState(false);
  const [mainPage, setMainPage] = useState(true);
  const [gamePage, setGamePage] = useState(false);
  const [difficulty, setDifficulty] = useState("null");
  const [requirement, setRequirement] = useState(false);

  if (guessesLeft === 0 || timer === 0) {
    setMainPage(false);
    setGamePage(false);
    setYouWon(false);
    setGameStarted(false);
    setDifficulty("null");
    setRequirement(false);
    setYouLost(true);
  }

  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);

  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setCards(shuffledCards);
    setTurns(0);
  };

  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurns) => prevTurns + 1);
    setDisabled(false);
  };

  return (
    <div className="bg-background-pattern w-screen h-screen flex justify-center items-center">
      {mainPage ? (
        <div className="bg-black w-[30%] h-[60%] rounded-lg flex flex-col items-center">
          <h1 className="font-creepster text-orange text-5xl text-center mt-10">
            Halloween Memory
          </h1>
          <span
            className={`font-abel ${
              requirement ? "visible" : "invisible"
            } text-white bg-orange p-1 rounded-lg mt-3`}
          >
            You must select a difficulty before continuing.
          </span>
          <h3 className="font-abel capitalize font-bold text-center text-2xl mt-5 underline text-white">
            Choose difficulty:
          </h3>
          <div className="font-abel flex flex-row w-[80%] justify-between mt-3">
            <button
              onClick={() => setDifficulty("easy")}
              className={`text-white w-24 h-16 rounded-2xl ${
                difficulty === "easy"
                  ? "bg-orange"
                  : "bg-darkgray hover:bg-lightgray hover:text-black"
              }`}
            >
              Easy
            </button>
            <button
              onClick={() => setDifficulty("medium")}
              className={`text-white w-24 h-16 rounded-2xl ${
                difficulty === "medium"
                  ? "bg-orange"
                  : "bg-darkgray hover:bg-lightgray hover:text-black"
              }`}
            >
              Medium
            </button>
            <button
              onClick={() => setDifficulty("hard")}
              className={`text-white w-24 h-16 rounded-2xl ${
                difficulty === "hard"
                  ? "bg-orange"
                  : "bg-darkgray hover:bg-lightgray hover:text-black"
              }`}
            >
              Hard
            </button>
          </div>
          <button
            onClick={() => {
              if (difficulty === "null") {
                setRequirement(true);
              } else {
                setGamePage(true);
                if (difficulty === "easy") {
                  setTimer(90);
                  setGuessesLeft(15);
                } else if (difficulty === "medium") {
                  setTimer(60);
                  setGuessesLeft(10);
                } else if (difficulty === "hard") {
                  setTimer(45);
                  setGuessesLeft(5);
                }
                setGameStarted(true);
                setMainPage(false);
                shuffleCards();
              }
            }}
            className="bg-orange text-white hover:bg-white hover:text-black rounded-lg w-[70%] h-20 text-3xl uppercase mt-6"
          >
            Start!
          </button>
        </div> // You are on the main page
      ) : gamePage ? (
        <div className="bg-black w-[70%] h-[85%] rounded-lg flex flex-row justify-between py-8 px-12">
          <div className="w-[65%] p-5 items-center place-items-center border-8 bg-lightgray border-orange rounded-lg grid grid-cols-5 gap-0">
            {cards.map((card) => (
              <SingleCard
                card={card}
                key={card.id}
                handleChoice={handleChoice}
                flipped={
                  card === choiceOne || card === choiceTwo || card.matched
                }
                disabled={disabled}
              />
            ))}
          </div>
          <div className="w-[30%] relative flex flex-col">
            <p className="font-abel font-bold text-3xl tracking-wider uppercase my-10 text-orange">
              Time Left: <br />
              <span className="text-white">{timer}</span>
            </p>
            <p className="font-abel font-bold text-3xl tracking-wider uppercase text-orange">
              Guesses Left: <br />
              <span className="text-white">{guessesLeft}</span>
            </p>
            <p className="font-abel font-bold text-6xl tracking-wider uppercase text-orange absolute bottom-20">
              {difficulty === "easy"
                ? "Easy"
                : difficulty === "medium"
                ? "Medium"
                : "Hard"}
            </p>
          </div>
        </div> // You are not on the main page and are on the game page
      ) : youWon ? (
        <div></div> // You are not on the main page and are not on the game page and are on the "you won" page
      ) : (
        <div className="bg-black w-[70%] h-[85%] rounded-lg flex flex-row justify-between py-8 px-12"></div> // You are on the main page, game page, or the "you won" page, so you are on the "you lost" page
      )}
    </div>
  );
}

export default App;
