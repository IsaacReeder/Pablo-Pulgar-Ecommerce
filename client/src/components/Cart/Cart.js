import React, { useState, useEffect } from "react";
import { getCart, setCart, calculatePrice } from "./utils/index";

const Cart = () => {
  const [cartItems, setCartItems] = useState(getCart());
  const [updatedItems, setUpdatedItems] = useState([]);

  const deleteItemFromCart = (itemToDeleteId) => {
    const filteredItems = cartItems.filter(
      (item) => item._id !== itemToDeleteId
    );
    setCartItems(filteredItems);
    setUpdatedItems(updatedItems);
  };

  useEffect(() => {
    setCart(updatedItems);
  }, [updatedItems]);

  return (
    <div style={{ height: "300px" }}>
      Cart
      {cartItems.map((item) => (
        <>
          <div>{item.name}</div>
          <div>{item.quantity}</div>
          <i
            className="fas fa-trash"
            style={{ fontSize: "30px", cursor: "pointer", flex: "1" }}
            onClick={() => deleteItemFromCart(item._id)}
          ></i>
          <div style={{ fontSize: "1.5vw" }}>
            Subtotal: {calculatePrice(cartItems)}
          </div>
        </>
      ))}
    </div>
  );
};

export default Cart;
