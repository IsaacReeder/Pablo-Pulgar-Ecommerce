import React, { useEffect, useState } from "react";
import axios from "axios";

const Items = (props) => {
  const id = Number(`${props.match.params.itemId}`);
  const [products, setProducts] = useState([]);
  const [itemType, setItemType] = useState("");

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
      }}
    >
      <h1>asdf{id} </h1>
      {products
        .filter((work) => work.type === itemType)
        .map((p, index) => (
          <div
            key={index}
            style={{
              flex: "1",
              minWidth: "25%",
              margin: "20px",
              border: "1px solid black",
            }}
          >
            <div>
              <img style={{ width: "100%" }} src="" alt="works" />
            </div>
            <h1>{p.name}</h1>
            <h1>
              Quantity: {p.quantity}
              Type: {p.type}
            </h1>
            {/* JWT Token && <button onClick={(e) => remove(p._id)}>Delete</button> */}
          </div>
        ))}
    </div>
  );
};

export default Items;
