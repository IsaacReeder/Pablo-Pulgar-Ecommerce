import React, { useState, useEffect } from "react";
import axios from "axios";

import NavBar from "../UiElements/NavBar";
import { API_URL } from "./url";

const ImageContainer = ({ itemType }) => {
  const [images, setImages] = useState([]);
  const [fallback, setFallback] = useState("");
  const [products, setProducts] = useState([]);
  const [marker, setMarker] = useState(0);
  const [look, setCloserLook] = useState({ productId: 0, imgName: "" });

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

  useEffect(() => {
    getImages();
    fetchProducts();
    itemType !== "" ? setMarker(1) : setMarker(0);
  }, [itemType, marker]);

  const configureImage = (image) => {
    return API_URL + image;
  };

  const closerLook = async (_id, img) => {
    setCloserLook({ productId: _id, imgName: img });
  };

  let rando = `"${Math.floor(Math.random(10) * 1000)}%"`;

  const divStyles = {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    margin: "5%",
    marginTop: "0%",
    cursor: "crosshair",
    marginRight: `${rando}`,
  };
  const gridStyles = {
    flex: "1",
    maxWidth: "50%",
    margin: "20px",
    // border: "1px solid black",
  };

  console.log(rando);

  return (
    <>
      <NavBar />
      {look.productId === 0 ? (
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
              admin
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
                    <button onClick={(e) => remove(product._id)}>Delete</button>
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
      ) : (
        products
          .filter((p) => p._id === look.productId)
          .map((product) => (
            <h1>
              {product.name}
              {images
                .filter((img) => img === look.imgName)
                .map((image) => (
                  <img
                    style={{ width: "80%", height: "80%" }}
                    src={configureImage(image)}
                    key={image}
                    alt={image}
                    width="200"
                    height="200"
                    className="image"
                  />
                ))}
            </h1>
          ))
      )}
    </>
  );
};

export default ImageContainer;
