import React, { useState, useEffect } from "react";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
import { toast } from "react-toastify";
import { calculatePrice, getCart } from "../Cart/utils/index";
import { API_URL } from "../Images/url";
// import Cart from "../Cart/Cart";
import AppBar from "../UiElements/AppBar";
import Fade from "react-reveal/Fade";

import styled from "@emotion/styled/macro";

import "react-toastify/dist/ReactToastify.css";
import "./Checkout.css";

// const apiUrl = process.env.API_URL || "http://localhost:1337";

toast.configure();

function Checkout() {
  const cartItems = getCart();
  const [images, setImages] = useState([]);
  const [fallback, setFallback] = useState("");
  const [loading, setLoading] = useState(true);
  const [activeHover, setActiveHover] = useState(null);

  const [product] = React.useState({ cartItems });

  async function handleToken(token, addresses) {
    const response = await axios.post(
      "https://4pm8l.sse.codesandbox.io/checkout",
      { token, product }
    );
    const { status } = response.data;
    console.log("Response:", response.data);
    if (status === "success") {
      toast("Success! Check email for details", { type: "success" });
    } else {
      toast("Something went wrong ", { type: "error" });
    }
  }

  const getImages = async () => {
    try {
      const res = await axios.get(API_URL + "api/images");
      if (!res.data.files) {
        setFallback(JSON.stringify(res.data.msg));
        return;
      } else {
        setImages(res.data.files);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const configureImage = (image) => {
    return API_URL + image;
  };

  const DisplayOver = styled.div({
    height: "100%",
    left: "0",
    position: "absolute",
    top: "0",
    width: "100%",
    zIndex: 2,
    transition: "background-color 350ms ease",
    backgroundColor: "transparent",
    padding: "20px 20px 0 20px",
    boxSizing: "border-box",
  });

  const BigTitle = styled.h2({
    textTransform: "uppercase",
    fontFamily: "Helvetica",
  });

  useEffect(() => {
    getImages();

    setLoading(true);
  }, []);
  // {cartItems.length > 0 ? "asdf" : "asdf2"}
  return (
    <div>
      <AppBar />
      <div>
        <h1>Checkout</h1>
        {cartItems.map((product) => {
          return (
            <div
              style={{
                display: "flex",
                position: "relative",
                // width: 250,
                // height: 250,
                marginLeft: " 5%",
              }}
              onMouseOver={() => setActiveHover(product.pic)}
              onMouseOut={() => setActiveHover(null)}
            >
              {images
                .filter((img) => img === product.pic)
                .map((image) => (
                  <>
                    <img
                      key={image.id}
                      src={configureImage(image)}
                      style={{
                        margin: 5,
                        maxWidth: "400px",
                        minWidth: "250px",
                      }}
                      alt={image.name}
                    />
                    {activeHover === image && (
                      <Fade right>
                        <div
                          style={{
                            position: "absolute",
                            top: 20,
                            left: "50%",
                            transform: "translateX(-50%)",
                            margin: "auto",
                            backgroundColor: "rgba(0,0,0,0.5)",
                            color: "white",
                            fontSize: "5vw",
                            borderTop: "20px solid #ca4246",
                            borderBottom: "20px solid #a7489b",
                            borderLeft: "20px solid #476098",
                            borderRight: "20px solid #f18f43",
                            transition: "2s ease-in-out",
                          }}
                        >
                          <p>?: {product.name}</p>
                          <p>$: {product.price}</p>
                        </div>
                      </Fade>
                    )}
                  </>
                ))}
            </div>
          );
        })}
      </div>
      <div
        style={{
          fontSize: "30px",
          display: "flex",
          justifyContent: "center",
          marginBottom: "3rem",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          Subtotal: {calculatePrice(cartItems)}
          <StripeCheckout
            stripeKey="pk_test_51HRR6vLy5lfW1D11d6a8V00UYam21Muy9gQ6301LeBxwkDOzRTDao1Bo7WC6HQQR3kxUfgXRCnDiXg9dsSS6RYZT00v2nJb2v4"
            style={{ marginBottom: "3rem" }}
            token={handleToken}
            amount={calculatePrice(cartItems)}
            name="Better gimme my money"
            billingAddress
            shippingAddress
          />
        </div>
      </div>
    </div>
  );
}

export default Checkout;
