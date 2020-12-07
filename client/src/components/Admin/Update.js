import React, { useState, useEffect } from "react";
import axios from "axios";
import { navigate } from "@reach/router";

const Update = (props) => {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    console.log("useEffect fired");
    axios
      .get(`http://localhost:8000/api/product/${props._id}`)
      .then((res) => {
        console.log(res.data.name);
        setName(res.data.name);
        setType(res.data.type);
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
      .put(`http://localhost:8000/api/product/update/${props._id}`, product)
      .then((res) => {
        if (res.data.errors) {
          setErrors(res.data.errors);
        } else {
          console.log(res);
          navigate("/");
        }
      })
      .catch((err) => console.log(err));
    console.log("at the bottom");
  };
  return (
    <div>
      <div
        style={{
          display: "flex",
          // flexDirection: "column",
          justifyContent: "flex-start",
        }}
      >
        <form onSubmit={UpdateProduct}>
          <div>
            <input
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
            ></input>
            {errors.name ? <h4>{errors.name.properties.message}</h4> : ""}
          </div>
          <div>
            <input
              type="text"
              onChange={(e) => setType(e.target.value)}
              value={type}
            ></input>
            {errors.type ? <h4>{errors.type.properties.message}</h4> : ""}
          </div>
          <div>
            <input
              type="text"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
            ></input>
            {errors.description ? (
              <h4>{errors.description.properties.message}</h4>
            ) : (
              ""
            )}
          </div>
          <div>
            <input
              type="number"
              onChange={(e) => setQuantity(e.target.value)}
              value={quantity}
            ></input>
            {errors.quantity ? (
              <h4>{errors.quantity.properties.message}</h4>
            ) : (
              ""
            )}
          </div>
          <input type="submit" value="Update Product" />
        </form>
      </div>{" "}
    </div>
  );
};

export default Update;
