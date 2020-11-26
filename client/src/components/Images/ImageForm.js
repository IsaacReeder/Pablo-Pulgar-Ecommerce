import React, { useState } from "react";
import axios from "axios";

import { uploadAction } from "./uploadAction";

const ImageForm = () => {
  const [image, setImage] = useState([]);
  const [preview, setPreview] = useState(false);
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [errors, setErrors] = useState({});
  // const [products, setProducts] = useState([]);
  const [newImage, setNewImage] = useState([]);

  const handleNewImage = () => {
    setNewImage(...newImage, "New image!");
  };

  const handleImageUpload = (e) => {
    setImage(e.target.files[0]);
    setPreview(true);
  };

  const clearImage = () => {
    setPreview(false);
    setImage("");
  };

  const handleSubmit = () => {
    uploadAction(image);
    setPreview(false);
    setImage(false);
    handleNewImage();
  };

  ////

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
  //  upload photo, and add photo name to photo name array for types (painting, print, etc.) for .filter.map in the image container
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

      {/* image form */}

      {preview ? (
        <>
          <button onClick={clearImage}>X</button>
          <h5>Image Preview</h5>
          <img src={URL.createObjectURL(image)} alt="Preview of upload"></img>
          <button onClick={handleSubmit}>Submit</button>
        </>
      ) : (
        <>
          <input
            type="file"
            onChange={handleImageUpload}
            accept="png jpg jpeg"
          />
        </>
      )}
    </div>
  );
};

export default ImageForm;
