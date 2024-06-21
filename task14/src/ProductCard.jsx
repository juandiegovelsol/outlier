import React, { useEffect, useState } from "react";
import { useTimer } from "use-timer";
import "./product-card.scss";

/**
 * A React component that displays a product card with a countdown timer.
 * @param {object} props - The component props.
 * @param {string} props.title - The product title.
 * @param {string} props.image - The product image URL.
 * @param {number} props.id - The product ID.
 * @param {function} props.handleClick - A callback function to handle the card click event.
 */
const ProductCard = ({ title = "", image = "", id = 0, handleClick }) => {
  // Initialize state variables for the countdown timer.
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [timeUp, setTimeUp] = useState("able"); // "able" or "unable"
  const [buttonText, setButtonText] = useState("Go to Detail");

  // Generate a random countdown time between 1-10 minutes.
  const random = Math.floor(Math.random() * 10) + 1;

  // Use the useTimer hook to create a countdown timer.
  const { time, start } = useTimer({
    initialTime: random * 60,
    timerType: "DECREMENTAL",
    endTime: 0,
  });

  // A helper function to add a leading zero to the countdown time.
  const addCero = (remaining) => {
    return Math.trunc(remaining / 10) === 0 ? `0${remaining}` : `${remaining}`;
  };

  // A callback function to handle the card click event.
  const redirect = (time) => {
    // Only redirect if the countdown time is not zero.
    if (time !== 0) {
      handleClick(id);
    }
  };

  // Start the countdown timer when the component mounts.
  useEffect(() => {
    start();
  }, []);

  // Update the countdown time display every second.
  useEffect(() => {
    const calculate_minutes = Math.trunc(time / 60);
    setMinutes(calculate_minutes);
    const calculate_seconds = time % 60;
    setSeconds(calculate_seconds);
    // Update the button state when the countdown time reaches zero.
    if (time === 0) {
      setTimeUp("unable");
      setButtonText("Unavailable");
    }
  }, [time]);

  return (
    // Render the product card with a countdown timer.
    <article className="product-card" key={id}>
      <span className="product-card__image">
        <img src={image} alt="Product card" />
      </span>
      <h2 className="product-card__title">{title}</h2>
      <span className="product-card__footer">
        <p>
          {addCero(minutes)}:{addCero(seconds)}
        </p>
        <p>Article #{id}</p>
        <button
          className={`product-card__button ${timeUp}`}
          onClick={() => {
            redirect(time);
          }}
        >
          {buttonText}
        </button>
      </span>
    </article>
  );
};

export default ProductCard;
