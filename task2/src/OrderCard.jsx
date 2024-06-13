import PropTypes from "prop-types";
import React, { useState } from "react";

const OrderCard = ({
  _id,
  name,
  date,
  order,
  total,
  status,
  orderEdit = false,
  setOrderState = () => {},
}) => {
  const day = new Date(date);

  const formatDate = (date) => {
    let month = date.getMonth() + 1;
    let day = date.getDate();

    if (month < 10) month = "0" + month;
    if (day < 10) day = "0" + day;

    return `${month}/${day}/${date.getFullYear()}`;
  };

  const formatPrice = (price) => {
    const thousands = Math.trunc(price / 1000);
    const units = price % 1000;
    return `$${thousands}.${units.toString().padStart(3, "0")}`;
  };

  return (
    <span className="order-card" key={`${_id}`}>
      <p>{`Client: ${name}`}</p>
      <p>{`Date: ${formatDate(day)}`}</p>
      <ul className="order-card__order">
        {order.length > 0 &&
          order.map(({ title, price, quantity }) => {
            const subTotal = quantity * price;
            return (
              <li
                className="order-card__list-item"
                key={`${title}`}
              >{`${quantity} ${title}, subtotal ${formatPrice(subTotal)}`}</li>
            );
          })}
      </ul>
      <p>{`Total: ${formatPrice(total)}`}</p>
      {!orderEdit && (
        <>
          <p>{`Status: ${status}`}</p>
        </>
      )}
      {orderEdit && (
        <>
          <form>
            <label>Status:</label>
            <select
              onChange={(e) => setOrderState(_id, e.target.value)}
              className="order-card__selector"
            >
              <option value="">Select</option>
              <option value="Pending">Pending</option>
              <option value="Paid">Paid</option>
              <option value="Canceled">Canceled</option>
            </select>
          </form>
        </>
      )}
    </span>
  );
};

OrderCard.propTypes = {
  _id: PropTypes.string,
  name: PropTypes.string,
  date: PropTypes.string,
  order: PropTypes.array,
  total: PropTypes.number,
  status: PropTypes.string,
  orderEdit: PropTypes.bool,
  setOrderState: PropTypes.func,
};
