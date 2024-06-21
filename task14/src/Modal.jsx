import React from "react";
import "./modal.scss";

/**
 * A modal component that displays a detailed view of a product.
 * @param {object} props - The component props.
 * @param {object} props.product - The product data.
 * @param {function} props.onClose - A callback function to close the modal.
 */
const Modal = ({ product, onClose }) => {
  if (!product) return null;

  return (
    <div className="modal" onClick={onClose}>
      <div className="modal__container" onClick={(e) => e.stopPropagation()}>
        <h2 className="modal__title">{product.title}</h2>
        <p className="modal__category">Category: {product.category}</p>
        <p className="modal__description">{product.description}</p>
        <p className="modal__price">Price: ${product.price}</p>
        <p className="modal__rating">
          Rating: {product.rating.rate} ({product.rating.count} reviews)
        </p>
        <div className="modal__actions">
          <button className="modal__button" onClick={onClose}>
            Back
          </button>
          <button className="modal__button modal__button--buy">Buy</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
