import React, { useState, useEffect } from "react";
import axios from "axios";
import Fade from "react-reveal/Fade";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import PulseLoader from "react-spinners/PulseLoader";
import LoadingSpinner from "../UiElements/LoadingSpinner";
import { css } from "@emotion/core";
import AppBar from "../UiElements/AppBar";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ReactImageMagnify from "react-image-magnify";

import { getCart, setCart } from "../Cart/utils/index";
import { API_URL } from "./url";

const ImageContainer = ({ itemType }) => {
  const [images, setImages] = useState([]);
  const [fallback, setFallback] = useState("");
  const [products, setProducts] = useState([]);
  const [marker, setMarker] = useState(0);
  const [cartItems, setCartItems] = useState(getCart());
  const [updatedItems, setUpdatedItems] = useState(getCart());
  const [look, setCloserLook] = useState({
    productId: "",
    imgName: "",
  });
  const [loading, setLoading] = useState(true);

  const fetchProducts = () => {
    axios
      .get("http://localhost:8000/api/product")
      .then((res) => {
        setProducts(res.data);
        console.log(res);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };

  const remove = (_id) => {
    console.log(_id);
    axios
      .delete(`http://localhost:8000/api/product/delete/${_id}`)
      .then((res) => {
        console.log(res);
        fetchProducts();
      })
      .catch((err) => console.log(err));
  };

  /////

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

  const closerLook = async (_id, img) => {
    setCloserLook({ productId: _id, imgName: img });
  };

  const exitCloserLook = async (_id, img) => {
    setCloserLook({ productId: "", imgName: "" });
  };

  const addToCart = (item) => {
    const alreadyInCart = cartItems.findIndex(
      (product) => product._id === item._id
    );
    if (alreadyInCart === -1) {
      const updatedItems = cartItems.concat({
        ...item,
        quantity: 1,
      });
      setCartItems(updatedItems);
      setUpdatedItems(updatedItems);
      setCart(updatedItems);
    } else {
      const updatedItems = [...cartItems];
      const item = updatedItems[alreadyInCart];
      updatedItems[alreadyInCart] = {
        ...item,
        quantity: item.quantity + 1,
      };
      setCartItems(updatedItems);
      setUpdatedItems(updatedItems);
      setCart(updatedItems);
    }
  };

  const divStyles = {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    margin: "5%",
    marginTop: "0%",
    cursor: "crosshair",
    marginRight: "0",
  };
  const gridStyles = {
    flex: "1",
    maxWidth: "50%",
    margin: "20px",
  };
  const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
    position: absolute;
    top-margin: 50%;
    left-margin: 50%;
  `;

  useEffect(() => {
    getImages();
    fetchProducts();
    itemType !== "" ? setMarker(1) : setMarker(0);
    setLoading(true);
  }, [itemType, marker]);

  useEffect(() => {
    setCart(updatedItems);
    console.log("useEffect with updatedItems: " + JSON.stringify(updatedItems));
  }, [updatedItems]);

  return (
    <>
      <AppBar />
      {look.productId === "" ? (
        <Fade>
          <div>
            {loading && <LoadingSpinner asOverlay />}
            {marker === 1 ? (
              <div style={divStyles}>
                {images.length > 0 ? (
                  products
                    .filter((p) => p.type === itemType)
                    .map((product, i) => (
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          // maxWidth: "40%",
                          // paddingLeft: "5%",
                        }}
                        key={product.id}
                      >
                        {images
                          .filter((img) => img === product.pic)
                          .map((image) => {
                            const margin = i % 2 === 0 ? 10 : -10;
                            console.log(i);

                            return (
                              <div
                                style={{
                                  display: "flex",
                                  alignContent: "center",
                                  justifyContent: "center",
                                  maxWidth: "40%",
                                  marginRight: `${margin}rem`,
                                  marginTop: "10%",
                                }}
                              >
                                <img
                                  style={{
                                    width: "auto",
                                    alignItems: "center",
                                    maxWidth: "100%",
                                    flexWrap: "wrap",
                                  }}
                                  src={configureImage(image)}
                                  key={image.id}
                                  alt={image}
                                  onClick={() => closerLook(product._id, image)}
                                />
                                {<h3>{product.name}</h3>}
                              </div>
                            );
                          })}
                      </div>
                    ))
                ) : (
                  <>
                    <h1>{fallback}</h1> <hr /> <h3>Upload items</h3>
                  </>
                )}
              </div>
            ) : (
              <div style={divStyles}>
                {/* Admin */}
                {loading && <LoadingSpinner asOverlay />}
                {images.length > 0 ? (
                  products.map((product, i) => (
                    <div
                      style={gridStyles}
                      key={product.id}
                      style={{ flexWrap: "wrap", width: "250px", margin: "1%" }}
                    >
                      {images
                        .filter((img) => img === product.pic)
                        .map((image) => (
                          <img
                            style={{ maxWidth: "100%" }}
                            src={configureImage(image)}
                            key={image.id}
                            alt={image}
                            width="300"
                            // height="200"
                            className="image"
                          />
                        ))}

                      <h4>{product.name}</h4>
                      <h4>{product.type}</h4>
                      <h4>{product.description}</h4>
                      <h4>${product.price}</h4>

                      <button onClick={(e) => remove(product._id)}>
                        Delete
                      </button>
                      <Link to={`/update/${product._id}`}>Update</Link>
                    </div>
                  ))
                ) : (
                  <>
                    <h1>{fallback}</h1> <hr /> <h3>Upload items</h3>
                  </>
                )}
              </div>
            )}
          </div>
        </Fade>
      ) : (
        // Closer Look Section
        <div>
          {products
            .filter((p) => p._id === look.productId)
            .map((product, i) => (
              <div
                key={product.id}
                alt="div1"
                style={{
                  display: "flex",
                  // justifyContent: "center",
                  margin: "3rem",
                  // padding: "5%",
                }}
              >
                {images
                  .filter((img) => img === look.imgName)
                  .map((image, i) => (
                    <div
                      key={i}
                      alt="div2"
                      style={{
                        display: "flex",
                        alignContent: "center",
                        flexDirection: "row",
                        // flexWrap: "wrap",
                      }}
                    >
                      <div
                        alt="div3-image"
                        style={{
                          maxWidth: "700px",
                        }}
                      >
                        {/* <img
                          style={{ width: "100%" }}
                          src={configureImage(image)}
                          key={image.id}
                          alt={image}
                        /> */}
                        <ReactImageMagnify
                          style={{ width: "100%" }}
                          {...{
                            smallImage: {
                              alt: "Wristwatch by Ted Baker London",
                              isFluidWidth: true,
                              src: configureImage(image),
                            },
                            largeImage: {
                              src: configureImage(image),
                              width: 1200,
                              height: 1800,
                            },
                          }}
                        />
                      </div>

                      <div
                        alt="div4-words+buttons"
                        style={{
                          display: "flex",
                          justifyContent: "space-around",
                          flexDirection: "column",
                          padding: "5%",
                          // alignItems: "center",
                          // width: "50%",
                        }}
                      >
                        <h1>{product.name}</h1>
                        <h3>{product.description}</h3>
                        <h1>${product.price}</h1>

                        <Button
                          style={{ width: "100px" }}
                          variant="contained"
                          color="secondary"
                          onClick={() => addToCart(product)}
                        >
                          Add to cart
                        </Button>
                        <ArrowBackIcon
                          onClick={() => closerLook("", "")}
                          fontSize="large"
                          style={{ cursor: "pointer" }}
                        />
                      </div>
                      {/* <div alt="div5-gorrilla">
                        <img
                          src="https://i.imgur.com/RfjKEsP.gif"
                          style={{ height: "50%", paddingTop: "25%" }}
                          alt="Gorilla dancing"
                        ></img>
                      </div> */}
                    </div>
                  ))}
              </div>
            ))}
        </div>
      )}
    </>
  );
};

export default ImageContainer;
