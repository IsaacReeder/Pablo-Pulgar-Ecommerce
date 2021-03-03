import React, { useState, useEffect } from "react";
import { getCart, setCart, calculatePrice } from "./utils/index";
import { API_URL } from "../Images/url";
import LoadingSpinner from "../UiElements/LoadingSpinner";
import axios from "axios";

const Cart = () => {
  const [cartItems, setCartItems] = useState(getCart());
  const [updatedItems, setUpdatedItems] = useState(getCart());
  const [images, setImages] = useState([]);
  const [fallback, setFallback] = useState("");
  const [loading, setLoading] = useState(true);

  const deleteItemFromCart = async (itemToDeleteId) => {
    const filteredItems = cartItems.filter(
      (item) => item._id !== itemToDeleteId
    );
    console.log("filteredItems: " + JSON.stringify(filteredItems));

    setCartItems(filteredItems);
    setUpdatedItems(filteredItems);
    setCart(filteredItems);
  };

  // Get Images
  const getImages = async () => {
    try {
      const res = await axios.get(API_URL + "api/images");
      if (!res.data.files) {
        setFallback(JSON.stringify(res.data.msg));
        return;
      } else {
        setImages(res.data.files);
        console.log(images);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const configureImage = (image) => {
    return API_URL + image;
  };

  useEffect(() => {
    getImages();

    setLoading(false);
  }, []);

  return (
    <div
      style={{
        height: "300px",
        display: "flex",
        flexDirection: "column",
        padding: "10px",
      }}
    >
      {loading && <LoadingSpinner asOverlay />}
      {cartItems.map((item) => (
        <div
          key={item.id}
          style={{
            display: "flex",
            flexDirection: "row",
            flexGrow: "3",
            justifyContent: "space-around",
            fontSize: "30px",
            borderBottom: "5px dotted black",
            padding: "1%",
          }}
        >
          {/* Images */}
          <div style={{ width: "400px" }}>
            {images
              .filter((img) => img === item.pic)
              .map((image) => (
                <img
                  // style={{ maxWidth: "100%" }}
                  src={configureImage(image)}
                  key={image.id}
                  alt={image}
                  // width="300"
                  // height="200"
                  className="image"
                />
              ))}
          </div>
          {/* Images */}
          <div style={{ width: "100%" }}>{item.name}</div>
          <div style={{ width: "100%" }}>x{item.quantity}</div>
          <i
            className="fas fa-trash"
            style={{ fontSize: "30px", cursor: "pointer", width: "100%" }}
            onClick={() => deleteItemFromCart(item._id)}
          ></i>
        </div>
      ))}
      <div alt="Subtotal container" style={{ width: "20%" }}>
        <div style={{ fontSize: "50px" }}>
          Subtotal: {calculatePrice(cartItems)}
        </div>
      </div>
    </div>
  );
};

export default Cart;
