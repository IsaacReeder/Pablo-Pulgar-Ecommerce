import React, { useState, useEffect } from "react";

import ImageContainer from "../Images/ImageContainer";
import ImageForm from "../Images/ImageForm";

const Admin = (props) => {
  const [itemType, setItemType] = useState("");

  useEffect(() => {
    setItemType("");
  }, []);

  return (
    <div className="App">
      <ImageContainer itemType={itemType} />
      <ImageForm />
    </div>
  );
};

export default Admin;
