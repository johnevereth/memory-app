import React from "react";

const SingleCard = ({ disabled, handleChoice, card, flipped }) => {
  const handleClick = () => {
    if (!disabled) {
      handleChoice(card);
    }
  };

  const flippedFront = { transform: "rotateY(0deg)" };
  const unflippedFront = { transform: "rotateY(90deg)", position: "absolute" };
  const flippedBack = { transform: "rotateY(90deg)", position: "absolute" };
  const unflippedBack = { transform: "rotateY(0deg)" };

  return (
    <div className="relative w-[65%] cursor-pointer">
      <div>
        <img
          style={flipped ? flippedFront : unflippedFront}
          src={card.src}
          alt="card front"
        />
        <img
          style={flipped ? flippedBack : unflippedBack}
          src="/images/card-back.png"
          onClick={handleClick}
          alt="card back"
        />
      </div>
    </div>
  );
};

export default SingleCard;
