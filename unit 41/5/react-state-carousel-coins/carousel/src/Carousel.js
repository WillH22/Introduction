import React, { useState } from "react";
import "./Carousel.css";
import image1 from "./image1.jpg";
import image2 from "./image2.jpg";
import image3 from "./image3.jpg";
import Card from "./Card";

function Carousel(props) {
  // State to keep track of the currently displayed card index
  const [cardIdx, setCardIdx] = useState(0);
  // Get the current card data based on the index
  const card = props.cardData[cardIdx];
  const total = props.cardData.length;

  // Function to move to the next card
  const goForward = () => setCardIdx(cardIdx + 1);
  // Function to move to the previous card
  const goBackward = () => setCardIdx(cardIdx - 1);

  return (
    <div className="Carousel">
      {/* Display the title of the carousel */}
      <h1>{props.title}</h1>
      <div className="Carousel-main">
        {/* Display the left arrow to go backward if not on the first card */}
        {cardIdx !== 0 && (
          <i
            className="fas fa-chevron-circle-left fa-2x"
            onClick={goBackward}
            data-testid="left-arrow"
          />
        )}
        {/* Render the Card component with relevant data */}
        <Card
          caption={card.caption}
          src={card.src}
          currNum={cardIdx + 1}
          totalNum={total}
        />
        {/* Display the right arrow to go forward if not on the last card */}
        {cardIdx !== 2 && (
          <i
            className="fas fa-chevron-circle-right fa-2x"
            onClick={goForward}
            data-testid="right-arrow"
          />
        )}
      </div>
    </div>
  );
}

// Default props for the Carousel component
Carousel.defaultProps = {
  cardData: [
    {
      src: image1,
      caption: "Photo by Richard Pasquarella on Unsplash",
    },
    {
      src: image2,
      caption: "Photo by Pratik Patel on Unsplash",
    },
    {
      src: image3,
      caption: "Photo by Josh Post on Unsplash",
    },
  ],
  title: "Shells from far away beaches.",
};

export default Carousel;
