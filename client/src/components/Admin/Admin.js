import React, { useState } from "react";
import axios from "axios";

const Admin = (props) => {
  // const { setPage } = props;
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [errors, setErrors] = useState({});

  const create = (e) => {
    e.preventDefault();
    const newProduct = { name, type, description, quantity };
    console.log(newProduct);

    axios
      .post("http://localhost:8000/api/product/new", newProduct)
      .then((res) => {
        console.log(res.data);
        if (res.data.errors) {
          setErrors(res.data.errors);
        } else {
          // Navigate to display
          console.log("Successfully POSTed to the server!");
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <h1>Welcome</h1>
      <form onSubmit={create} noValidate autoComplete="off">
        <div>
          <label>Name</label>
          <input type="text" onChange={(e) => setName(e.target.value)}></input>
          {errors.name ? <h3>{errors.name.properties.message}</h3> : ""}
        </div>
        <div>
          <label>Type</label>
          <input type="text" onChange={(e) => setType(e.target.value)}></input>
        </div>
        <div>
          <label>Description</label>
          <input
            type="text"
            onChange={(e) => setDescription(e.target.value)}
          ></input>
        </div>
        <div>
          <label>Quantity</label>
          <input
            type="number"
            onChange={(e) => setQuantity(e.target.value)}
          ></input>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Admin;
