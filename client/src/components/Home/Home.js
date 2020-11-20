import React, { Component } from "react";
import one from "../../assets/Works/1.gif";

class Home extends Component {
  render() {
    const works = [{ photo: one, title: "twistr" }];
    return (
      <div>
        {works.map((work, i) => (
          <>
            <img src={work.photo} alt="works"></img>
            <h3>{work.title}</h3>
          </>
        ))}
      </div>
    );
  }
}

export default Home;
