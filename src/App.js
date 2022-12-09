import React, { useState } from "react";

function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [guessesLeft, setGuessesLeft] = useState(5);
  const [timer, setTimer] = useState(60);
  const [youWon, setYouWon] = useState(false);
  const [youLost, setYouLost] = useState(false);
  const [mainPage, setMainPage] = useState(true);
  const [gamePage, setGamePage] = useState(false);

  return (
    <div className="bg-background-pattern w-screen h-screen flex justify-center items-center">
      {mainPage ? (
        <div className="bg-black w-[30%] h-[60%] rounded-lg flex flex-col items-center">
          <h1 className="font-creepster text-orange text-5xl text-center mt-10">
            Halloween Memory
          </h1>
          <h3 className="font-abel capitalize font-bold text-center text-2xl mt-16 underline text-white">
            Choose difficulty:
          </h3>
          <div className="flex flex-row w-[80%] justify-between mt-3">
            <button className="bg-darkgray hover:bg-lightgray text-white hover:text-black w-24 h-16 rounded-2xl">
              Easy
            </button>
            <button className="bg-darkgray hover:bg-lightgray text-white hover:text-black w-24 h-16 rounded-2xl">
              Medium
            </button>
            <button className="bg-darkgray hover:bg-lightgray text-white hover:text-black w-24 h-16 rounded-2xl">
              Hard
            </button>
          </div>
          <button className="bg-orange text-white hover:bg-white hover:text-black rounded-lg w-[70%] h-20 text-3xl uppercase mt-8">
            Start!
          </button>
        </div> // You are on the main page
      ) : gamePage ? (
        <div className="bg-black w-[70%] h-[85%] rounded-lg">
          <h1 className="font-creepster text-orange">Hey there!</h1>
          <p className="font-abel text-white">
            Testing this here testing oh yeah hello testing
          </p>
        </div> // You are not on the main page and are on the game page
      ) : youWon ? (
        <div></div> // You are not on the main page and are not on the game page and are on the "you won" page
      ) : (
        <div></div> // You are on the main page, game page, or the "you won" page, so you are on the "you lost" page
      )}
    </div>
  );
}

export default App;
