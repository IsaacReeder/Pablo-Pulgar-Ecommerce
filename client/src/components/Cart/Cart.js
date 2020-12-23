import React, { useState, useEffect } from "react";
import { getCart, setCart, calculatePrice } from "./utils/index";

const Cart = () => {
  const [cartItems, setCartItems] = useState(getCart());
  const [updatedItems, setUpdatedItems] = useState(getCart());

  const deleteItemFromCart = async (itemToDeleteId) => {
    const filteredItems = cartItems.filter(
      (item) => item._id !== itemToDeleteId
    );
    console.log("filteredItems: " + JSON.stringify(filteredItems));

    setCartItems(filteredItems);
    setUpdatedItems(filteredItems);
    setCart(filteredItems);
  };

  return (
    <div style={{ height: "300px" }}>
      Cart
      {cartItems.map((item) => (
        <div key={item.id}>
          <div>{item.name}</div>
          <div>{item.quantity}</div>
          <i
            className="fas fa-trash"
            style={{ fontSize: "30px", cursor: "pointer", flex: "1" }}
            onClick={() => deleteItemFromCart(item._id)}
          ></i>
          <div style={{ fontSize: "1.5vw" }}></div>
          Subtotal: {calculatePrice(cartItems)}
        </div>
      ))}
    </div>
  );
};

export default Cart;
