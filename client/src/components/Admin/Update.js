import React, { useState, useEffect } from "react";
import axios from "axios";
import { navigate } from "@reach/router";
import Button from "@material-ui/core/Button";
import { green } from "@material-ui/core/colors";
import { createMuiTheme } from "@material-ui/core/styles";

import { API_URL } from "../Images/url";
import Appbar from "../UiElements/AppBar";

const Update = (props) => {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  // const [errors, setErrors] = useState({});
  const [images, setImages] = useState([]);
  // const [fallback, setFallback] = useState("");
  const [products, setProducts] = useState([]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);
  // const id = Number(`${props.match.params.itemId}`);

  useEffect(() => {
    console.log("useEffect fired");
    getImages();
    fetchProducts();
    setLoading(true);
    // ${props._id}
    axios
      .get(`http://localhost:8000/api/product/5fd8dcc9c86f8a0498f59bd2`)
      .then((res) => {
        console.log(res);
        setName(res.data.name);
        setType(res.data.type);
        setPrice(res.data.price);
        setDescription(res.data.description);
        setQuantity(res.data.quantity);
      })
      .catch((errors) => console.log(errors));
  }, [props._id]);

  const UpdateProduct = (e) => {
    e.preventDefault();
    const product = { name, type, description, quantity };
    console.log("updated");
    axios
      .put(`http://localhost:8000/api/product/update/${props.id}`, product)
      .then((res) => {
        if (res.data.errors) {
          // setErrors(res.data.errors);
        } else {
          console.log(res);
          navigate("/");
        }
      })
      .catch((err) => console.log(err));
    console.log("at the bottom");
  };
  const fetchProducts = () => {
    axios
      .get("http://localhost:8000/api/product")
      .then((res) => {
        setLoading(false);
        setProducts(res.data);
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  const getImages = async () => {
    try {
      const res = await axios.get(API_URL + "api/images");
      if (!res.data.files) {
        // setFallback(JSON.stringify(res.data.msg));
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

  const theme = createMuiTheme({
    palette: {
      primary: green,
    },
  });

  return (
    <div>
      <Appbar />
      {products
        .filter((p) => p._id === "5fd8dcc9c86f8a0498f59bd2")
        .map((product, i) => (
          <div key={product.id} style={{ margin: "5%" }}>
            {images
              .filter((img) => img === product.pic)
              .map((image, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    marginTop: "5%",
                    backgroundColor: "#e3e1e1",
                    // width: "40%",
                    // flexWrap: "wrap",
                  }}
                >
                  <img
                    style={{
                      width: "40%",
                      height: "auto",
                      alignSelf: "center",
                    }}
                    src={configureImage(image)}
                    key={image.id}
                    alt={image}
                  />
                  <div
                    style={{
                      alignSelf: "stretch",
                      display: "flex",
                      width: "100%",
                      padding: "5%",
                      flexDirection: "column",
                      justifyContent: "center",
                    }}
                  >
                    {/* Form */}
                    <form onSubmit={UpdateProduct}>
                      <div>
                        <h3>Name</h3>
                        <input
                          style={{
                            // height: "50px",
                            marginBottom: "10%",
                            maxWidth: "50%",
                            fontSize: "50px",
                            backgroundColor: "transparent",
                            color: "black",
                          }}
                          type="text"
                          onChange={(e) => setName(e.target.value)}
                          value={name}
                        ></input>
                        {errors.name ? (
                          <h4>{errors.name.properties.message}</h4>
                        ) : (
                          ""
                        )}
                      </div>
                      <div>
                        <h3>Description</h3>
                        <textarea
                          style={{
                            // height: "50px",
                            marginBottom: "10%",
                            minWidth: "100%",
                            fontSize: "50px",
                            backgroundColor: "transparent",
                            color: "black",
                            fontSize: "25px",
                          }}
                          type="text"
                          onChange={(e) => setDescription(e.target.value)}
                          value={description}
                        ></textarea>
                        {errors.name ? (
                          <h4>{errors.name.properties.message}</h4>
                        ) : (
                          ""
                        )}
                      </div>
                      <div>
                        <h3>Price</h3>
                        <input
                          style={{
                            // height: "50px",
                            marginBottom: "10%",
                            maxWidth: "50%",
                            fontSize: "50px",
                            backgroundColor: "transparent",
                            color: "black",
                          }}
                          type="text"
                          onChange={(e) => setPrice(e.target.value)}
                          value={price}
                        ></input>
                        {errors.name ? (
                          <h4>{errors.name.properties.message}</h4>
                        ) : (
                          ""
                        )}
                      </div>
                      <div>
                        <h3>Quantity</h3>
                        <input
                          style={{
                            // height: "50px",
                            marginBottom: "10%",
                            maxWidth: "50%",
                            fontSize: "50px",
                            backgroundColor: "transparent",
                            color: "black",
                          }}
                          type="text"
                          onChange={(e) => setQuantity(e.target.value)}
                          value={quantity}
                        ></input>
                        {errors.name ? (
                          <h4>{errors.name.properties.message}</h4>
                        ) : (
                          ""
                        )}
                      </div>
                      <div>
                        <label>Type</label>
                        <select
                          name="Type"
                          type="text"
                          onChange={(e) => setType(e.target.value)}
                        >
                          <option value={"misc"}>Select Type</option>
                          <option value={"painting"}>Painting</option>
                          <option value={"installation"}>Installation</option>
                          <option value={"collage"}>Collage</option>
                          <option value={"print"}>Print</option>
                        </select>
                      </div>

                      <Button
                        size="large"
                        variant="outlined"
                        color="primary"
                        type="submit"
                      >
                        Update
                      </Button>
                    </form>
                  </div>
                </div>
              ))}
          </div>
        ))}
    </div>
  );
};

export default Update;
