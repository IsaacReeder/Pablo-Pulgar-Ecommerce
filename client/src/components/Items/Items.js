import React from "react";

const Items = (props) => {
  const id = `${props.match.params.itemId}`;
  return (
    <div>
      <h1>asdf{id} </h1>
    </div>
  );
};

export default Items;
