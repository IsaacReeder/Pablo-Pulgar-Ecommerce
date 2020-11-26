import React, { useState, useEffect } from "react";
import axios from "axios";

import ImageContainer from "../Images/ImageContainer";
import ImageForm from "../Images/ImageForm";

const Admin = (props) => {
  // const { setPage } = props;
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [errors, setErrors] = useState({});
  const [products, setProducts] = useState([]);
  const [newImage, setNewImage] = useState([]);

  const handleNewImage = () => {
    setNewImage(...newImage, "New image!");
  };

  const fetchProducts = () => {
    axios
      .get("http://localhost:8000/api/product")
      .then((res) => {
        setProducts(res.data);
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

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
      {/* /////// */}

      {products.map((p, index) => (
        <div key={p.id}>
          <h1>{p.name}</h1>
          <h1>
            {p.quantity} And Type:{p.type}
          </h1>
          <button onClick={(e) => remove(p._id)}>Delete</button>
        </div>
      ))}
      <div className="App">
        <ImageContainer newImage={newImage} />
        <ImageForm handleNewImage={handleNewImage} />
      </div>
    </div>
  );
};

export default Admin;
