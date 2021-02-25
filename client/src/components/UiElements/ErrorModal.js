import React, { useState, useEffect } from "react";

import Modal from "./Modal";

const ErrorModal = (props) => {
  const [ip, setIp] = useState();
  useEffect(() => {
    fetch("https://api.ipify.org?format=jsonp?callback=?", {
      method: "GET",
      headers: {},
    })
      .then((res) => {
        return res.text();
      })
      .then((ip) => {
        console.log("ip", ip);
        setIp(ip);
      });
  }, []);

  return (
    <Modal
      onCancel={props.onClear}
      header="Wait a second"
      show={!!props.error}
      footer={<button onClick={props.onClear}>Oh shit</button>}
    >
      <div style={{ padding: "10%" }}>
        {/* <p>{props.error}</p> */}
        <h1>Your IP address: {ip}</h1>
        <img src="https://pm1.narvii.com/6867/a4e41eb09c7e7ffbbda883251fc5e8d415785989r1-696-534v2_00.jpg"></img>
      </div>
    </Modal>
  );
};

export default ErrorModal;
