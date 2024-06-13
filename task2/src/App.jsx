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
  orderEdit: PropTypes.bool, //MOD
  setOrderState: PropTypes.func, //MOD
};

const App = () => {
  const [orders, setOrders] = useState([
    {
      _id: "1",
      name: "John Doe",
      date: "2022-01-01",
      order: [
        { title: "Pizza", price: 1500, quantity: 2 },
        { title: "Burger", price: 2000, quantity: 1 },
      ],
      total: 5000,
      status: "Pending",
      orderEdit: true,
    },
    {
      _id: "2",
      name: "Jane Doe",
      date: "2022-01-02",
      order: [
        { title: "Salad", price: 1000, quantity: 1 },
        { title: "Fries", price: 500, quantity: 2 },
      ],
      total: 2000,
      status: "Paid",
      orderEdit: false,
    },
  ]);

  const setOrderState = (id, status) => {
    const newOrders = orders.map((order) => {
      if (order._id === id) {
        order.status = status;
      }
      return order;
    });
    setOrders(newOrders);
  };

  return (
    <div>
      {orders.map((order) => (
        <OrderCard
          key={order._id}
          _id={order._id}
          name={order.name}
          date={order.date}
          order={order.order}
          total={order.total}
          status={order.status}
          orderEdit={order.orderEdit}
          setOrderState={setOrderState}
        />
      ))}
    </div>
  );
};

export default App;
