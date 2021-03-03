import React, { useState, useEffect } from "react";

import ImageForm from "../Images/ImageForm";
import AdminImageContainer from "../Images/AdminImageContainer";

const Admin = (props) => {
  const [itemType, setItemType] = useState("");

  useEffect(() => {
    setItemType("");
  }, []);

  return (
    <div>
      <AdminImageContainer />
      <ImageForm />
    </div>
  );
};

export default Admin;
