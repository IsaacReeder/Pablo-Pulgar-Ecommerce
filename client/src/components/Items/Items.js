import React, { useEffect, useState } from "react";
import ImageContainer from "../Images/ImageContainer";

const Items = (props) => {
  const id = Number(`${props.match.params.itemId}`);
  const [itemType, setItemType] = useState("");

  useEffect(() => {
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
    <div>
      <ImageContainer itemType={itemType} />
    </div>
  );
};

export default Items;
