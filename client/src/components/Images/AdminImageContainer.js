import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { API_URL } from "./url";
import axios from "axios";
import LoadingSpinner from "../UiElements/LoadingSpinner";
import AppBar from "../UiElements/AppBar";

const AdminImageContainer = () => {
  const [images, setImages] = useState([]);
  const [fallback, setFallback] = useState("");
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

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

  const configureImage = (image) => {
    return API_URL + image;
  };

  useEffect(() => {
    getImages();
    fetchProducts();

    setLoading(true);
  }, []);

  const divStyles = {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    margin: "5%",
    marginTop: "0%",
    cursor: "pointer",
    marginRight: "0",
  };

  const gridStyles = {
    flex: "1",
    maxWidth: "50%",
    margin: "20px",
  };

  return (
    <div>
      <AppBar />
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

              <button onClick={(e) => remove(product._id)}>Delete</button>
              <Link to={`/update/${product._id}`}>Update</Link>
            </div>
          ))
        ) : (
          <>
            <h1>{fallback}</h1> <hr /> <h3>Upload items</h3>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminImageContainer;
