import React, { useState, useEffect } from "react";
import axios from "axios";

import { API_URL } from "./url";

const ImageContainer = ({ newImage, marker }) => {
  const [images, setImages] = useState([]);
  const [fallback, setFallback] = useState("");
  const [products, setProducts] = useState([]);

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
  }, [newImage]);

  const configureImage = (image) => {
    return API_URL + image;
  };

  console.log(images);
  // Combine below .maps with a .filter to match name of image with name of product
  return (
    <div>
      {products.map((p, index) => (
        <div key={p.id}>
          <h1>{p.name}</h1>
          <h1>
            {p.quantity} And Type:{p.type}
          </h1>
          <button onClick={(e) => remove(p._id)}>Delete</button>
        </div>
      ))}
      {/* {marker > 0 ? "description with filter"} */}
      {images.length > 0 ? (
        images.map((image) => (
          <img
            src={configureImage(image)}
            key={image}
            alt={image}
            width="200"
            height="200"
            className="image"
          />
        ))
      ) : (
        <>
          <h1>{fallback}</h1> <hr /> <h3>Upload images in the form below</h3>
        </>
      )}
    </div>
  );
};

export default ImageContainer;
