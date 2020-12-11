import React, { useState, useEffect } from "react";
import axios from "axios";
import Fade from "react-reveal/Fade";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";

import { getCart, setCart } from "../Cart/utils/index";
import { API_URL } from "./url";
import AppBar from "../UiElements/AppBar";

const ImageContainer = ({ itemType }) => {
  const [images, setImages] = useState([]);
  const [fallback, setFallback] = useState("");
  const [products, setProducts] = useState([]);
  const [marker, setMarker] = useState(0);
  const [cartItems, setCartItems] = useState(getCart());
  const [updatedItems, setUpdatedItems] = useState([]);
  const [look, setCloserLook] = useState({
    productId: "",
    imgName: "",
  });

  const fetchProducts = () => {
    axios
      .get("http://localhost:8000/api/product")
      .then((res) => {
        setProducts(res.data);
        console.log(res);
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

  const addToCart = (item) => {
    const alreadyInCart = cartItems.findIndex(
      (product) => product._id === item._id
    );
    if (alreadyInCart === -1) {
      const updatedItems = cartItems.concat({
        ...item,
        quantity: 1,
      });

      setUpdatedItems(updatedItems);
      setCartItems(updatedItems);
    } else {
      const updatedItems = [...cartItems];
      const item = updatedItems[alreadyInCart];
      updatedItems[alreadyInCart] = {
        ...item,
        quantity: item.quantity + 1,
      };
      setUpdatedItems(updatedItems);
      setCartItems(updatedItems);
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

  useEffect(() => {
    getImages();
    fetchProducts();
    itemType !== "" ? setMarker(1) : setMarker(0);
  }, [itemType, marker]);

  // useEffect(
  //   (updatedItems) => {
  //     setCart(updatedItems);
  //   },
  //   [updatedItems]
  // );
  useEffect(() => {
    setCart(updatedItems);
  }, [updatedItems]);

  return (
    <>
      {/* <NavBar /> */}
      <AppBar />
      {look.productId === "" ? (
        <Fade>
          <div>
            {marker === 1 ? (
              <div style={divStyles}>
                {images.length > 0 ? (
                  products
                    .filter((p) => p.type === itemType)
                    .map((product, i) => (
                      <div style={gridStyles} key={i}>
                        {/* <h1>{product.name}</h1> */}
                        {images
                          .filter((img) => img === product.pic)
                          .map((image) => (
                            <div
                              style={{
                                display: "flex",
                                alignContent: "center",
                                justifyContent: "center",
                              }}
                            >
                              <img
                                style={{
                                  width: "auto",
                                  alignItems: "center",

                                  flexWrap: "wrap",
                                }}
                                src={configureImage(image)}
                                key={image}
                                alt={image}
                                onClick={() => closerLook(product._id, image)}
                              />
                            </div>
                          ))}
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
                Admin
                {images.length > 0 ? (
                  products.map((product, i) => (
                    <div style={gridStyles} key={i}>
                      <h4>{product.name}</h4>
                      <h4>{product.type}</h4>
                      {images
                        .filter((img) => img === product.pic)
                        .map((image) => (
                          <img
                            style={{ width: "100%" }}
                            src={configureImage(image)}
                            key={image}
                            alt={image}
                            width="200"
                            height="200"
                            className="image"
                          />
                        ))}
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
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            // paddingRight: "10%",
          }}
        >
          {products
            .filter((p) => p._id === look.productId)
            .map((product, i) => (
              <div key={product._id}>
                {images
                  .filter((img) => img === look.imgName)
                  .map((image, i) => (
                    <Fade right>
                      <div
                        key={i}
                        style={{
                          display: "flex",
                          marginTop: "5%",
                        }}
                      >
                        <img
                          style={{ width: "200%", height: "auto" }}
                          src={configureImage(image)}
                          key={image}
                          alt={image}
                        />
                        <div
                          style={{
                            display: "flex",
                            width: "100%",
                            padding: "5%",
                            flexDirection: "column",
                            justifyContent: "space-around",
                          }}
                        >
                          <h1>{product.name}</h1>
                          <h3>{product.description}</h3>
                          <h1>${product.price}</h1>
                        </div>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => addToCart(product)}
                        >
                          Primary
                        </Button>
                      </div>
                    </Fade>
                  ))}
              </div>
            ))}
        </div>
      )}
    </>
  );
};

export default ImageContainer;
