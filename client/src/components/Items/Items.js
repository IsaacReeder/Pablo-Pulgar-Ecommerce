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
      default:
        return "Missing Item Type";
    }
  }, []);

  // Switch statement translating itemId into string type. Wont work ........
  return (
    <div>
      <h1>asdf{id} </h1>
      {products
        .filter((work) => work.type === itemType)
        .map((p, index) => (
          <div key={p.id}>
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
