import React, { useState } from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

import { uploadAction } from "./uploadAction";

const ImageForm = () => {
  const [image, setImage] = useState([]);
  const [preview, setPreview] = useState(false);
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [errors, setErrors] = useState({});
  // const [products, setProducts] = useState([]);
  const [newImage, setNewImage] = useState([]);
  const [associatedImages, setAssociatedImages] = useState([]);

  const handleNewImage = () => {
    setNewImage(...newImage, "New image!");
  };

  const handleImageUpload = (e) => {
    setImage(e.target.files[0]);

    setPreview(true);
    // setAssociatedImages(e.target.name[0]);
  };

  const clearImage = () => {
    setPreview(false);
    setImage("");
  };

  ////

  const create = (e) => {
    // console.log("target name is " + e.target.value);
    e.preventDefault();
    uploadAction(image);
    setPreview(false);
    setImage(false);
    handleNewImage();
    // var filename = e.target.value.match(/[^\\/]*$/)[0];
    // console.log(filename);
    // setAssociatedImages(associatedImages.concat(filename));
    const pic = image.name;
    //get previous image name array, copy it, append new image name and overwrite original image name array before upload to Mongodb
    const newProduct = { name, type, description, quantity, price, pic };
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

  const useStyles = makeStyles((theme) => ({
    margin: {
      margin: theme.spacing(1),
    },
    extendedIcon: {
      marginRight: theme.spacing(1),
    },
  }));
  const classes = useStyles();

  //  upload photo, and add photo name to photo name array for types (painting, print, etc.) for .filter.map in the image container
  //  get concurrently working
  return (
    <div style={{ display: "flex", alignItems: "center", margin: "3%" }}>
      <h4>Add new items</h4>
      {preview ? (
        <>
          <form
            onSubmit={create}
            noValidate
            autoComplete="off"
            style={{
              display: "flex",
              alignContent: "center",
            }}
          >
            <img
              style={{ maxWidth: "50%" }}
              src={URL.createObjectURL(image)}
              alt="Preview of upload"
            ></img>
            <div
              style={{
                display: "flex",
                alignContent: "center",
                flexDirection: "column",
              }}
            >
              <Button
                variant="contained"
                color="primary"
                size="medium"
                className={classes.margin}
                style={{ maxHeight: "100px" }}
                type="submit"
              >
                Upload Image
              </Button>
              <Button
                variant="contained"
                color="secondary"
                size="medium"
                className={classes.margin}
                style={{ maxHeight: "100px" }}
                onClick={clearImage}
              >
                Clear Image
              </Button>
              <div>
                <div>
                  {/* <label>Name</label> */}
                  <input
                    type="text"
                    placeholder="Name"
                    onChange={(e) => setName(e.target.value)}
                  ></input>
                  {errors.name ? <h3>{errors.name.properties.message}</h3> : ""}
                </div>

                <div>
                  {/* <label>Description</label> */}
                  <input
                    type="text"
                    placeholder="Description"
                    onChange={(e) => setDescription(e.target.value)}
                  ></input>
                </div>
              </div>

              <div>
                <input
                  type="number"
                  placeholder="Price"
                  onChange={(e) => setPrice(e.target.value)}
                ></input>
              </div>
              <div>
                {/* <label>Type</label> */}
                <select
                  name="Type"
                  type="text"
                  placeholder="Type"
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
                {type === "print" ? (
                  <>
                    <label>Quantity</label>
                    <input
                      type="number"
                      placeholder="Quantity"
                      onChange={(e) => setQuantity(e.target.value)}
                    ></input>
                  </>
                ) : (
                  ""
                )}
              </div>
            </div>
          </form>
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
