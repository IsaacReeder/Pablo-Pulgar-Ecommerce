import React, { useEffect, useState } from "react";
import axios from "axios";

const Items = (props) => {
  const id = `${props.match.params.itemId}`;
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
    console.log(id);
    fetchProducts();
    switch (id) {
      case id === 1:
        setItemType("print");
        break;
      default:
        return "Missing Item Type";
    }
  }, [id]);
  // Switch statement translating itemId into string type
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
