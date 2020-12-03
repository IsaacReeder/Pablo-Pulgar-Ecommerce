import React, { useState, useEffect } from "react";
import axios from "axios";

import { API_URL } from "./url";

const ImageContainer = ({ itemType }) => {
  const [images, setImages] = useState([]);
  const [fallback, setFallback] = useState("");
  const [products, setProducts] = useState([]);
  const [marker, setMarker] = useState(0);

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
    console.log(marker);
  }, [itemType, marker]);

  const configureImage = (image) => {
    return API_URL + image;
  };

  console.log(itemType);
  return (
    <div>
      {marker === 1 ? (
        <div>
          {images.length > 0 ? (
            products
              .filter((p, i) => p.type === itemType)
              .map((product) => (
                <div key={product}>
                  <h4>{product.name}</h4>
                  <h4>{product.type}</h4>
                  {images
                    .filter((img) => img === product.pic)
                    .map((image) => (
                      <img
                        src={configureImage(image)}
                        key={image}
                        alt={image}
                        width="200"
                        height="200"
                        className="image"
                      />
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
        <div>
          admin
          {images.length > 0 ? (
            products.map((product, i) => (
              <div key={i}>
                <h4>{product.name}</h4>
                <h4>{product.type}</h4>
                {images
                  .filter((img) => img === product.pic)
                  .map((image) => (
                    <img
                      src={configureImage(image)}
                      key={image}
                      alt={image}
                      width="200"
                      height="200"
                      className="image"
                    />
                  ))}
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
  );
};

export default ImageContainer;
