import React, { useEffect, useState } from "react";
import axios from "axios";
import ImageContainer from "../Images/ImageContainer";
import { API_URL } from "../Images/url";

const Items = (props) => {
  const id = Number(`${props.match.params.itemId}`);
  // const [products, setProducts] = useState([]);
  const [itemType, setItemType] = useState("");
  // const [images, setImages] = useState([]);

  // const fetchProducts = () => {
  //   axios
  //     .get("http://localhost:8000/api/product")
  //     .then((res) => {
  //       setProducts(res.data);
  //       console.log(res);
  //     })
  //     .catch((err) => console.log(err));
  // };
  // const getImages = async () => {
  //   try {
  //     const res = await axios.get(API_URL + "api/images");
  //     if (!res.data.files) {
  //       alert("No images present");
  //       return;
  //     } else {
  //       setImages(res.data.files);
  //     }
  //   } catch (err) {
  //     console.log(err.message);
  //   }
  // };
  // const configureImage = (image) => {
  //   return API_URL + image;
  // };

  useEffect(() => {
    // getImages();
    // fetchProducts();
    switch (id) {
      case 1:
        setItemType("print");
        break;
      case 2:
        setItemType("installation");
        break;
      case 3:
        setItemType("painting");
        break;
      case 4:
        setItemType("collage");
        break;
      case 5:
        setItemType("clothing");
        break;
      case 6:
        setItemType("fanzines");
        break;
      case 7:
        setItemType("video");
        break;
      default:
        return "Missing Item Type";
    }
  }, [id]);
  console.log(itemType);

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "center",
        margin: "5%",
        marginTop: "0%",
        cursor: "crosshair",
        border: "1px solid black",
      }}
    >
      ImageContainer
      <ImageContainer itemType={itemType} />
      {/* {products
        .filter((work) => work.type === itemType)
        .map((product, index) => (
          <div
            key={index}
            style={{
              flex: "1",
              minWidth: "25%",
              margin: "20px",
              border: "1px solid black",
            }}
          >
            <h1>{product.name}</h1>
            <h1>Quantity: {product.quantity}</h1>
            <h1> Type: {product.type}</h1>
            {images
              .filter((img) => img === product.pic)
              .map((image) => (
                <img
                  style={{ width: "100%" }}
                  src=""
                  alt="works"
                  src={configureImage(image)}
                  key={image}
                  alt={image}
                  width="200"
                  height="200"
                  className="image"
                />
              ))}
            JWT Token && <button onClick={(e) => remove(p._id)}>Delete</button>
          </div>
        ))} */}
    </div>
  );
};

export default Items;
