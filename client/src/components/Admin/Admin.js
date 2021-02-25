import React, { useState, useEffect } from "react";

import ImageContainer from "../Images/ImageContainer";
import ImageForm from "../Images/ImageForm";
import AppBar from "../UiElements/AppBar";

const Admin = (props) => {
  const [itemType, setItemType] = useState("");

  useEffect(() => {
    setItemType("");
  }, []);

  return (
    <div className="App">
      <AppBar />
      <ImageForm />
      <ImageContainer itemType={itemType} />
    </div>
  );
};

export default Admin;
