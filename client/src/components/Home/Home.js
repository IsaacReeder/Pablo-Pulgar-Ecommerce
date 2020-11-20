import React, { Component } from "react";
import one from "../../assets/Works/1.gif";
import redCar from "../../assets/Works/1.jpg";
import two from "../../assets/Works/2.gif";
import three from "../../assets/Works/3.gif";
import eight from "../../assets/Works/8.jpg";
import blues from "../../assets/Works/blues.jpg";
import brap from "../../assets/Works/brap.jpg";
import eopa from "../../assets/Works/eopa.png";
import jagged from "../../assets/Works/jagged.jpg";
import loopwheel from "../../assets/Works/loopwheel.png";
import migos from "../../assets/Works/migos.jpg";
import mister from "../../assets/Works/mister.jpg";
import owl from "../../assets/Works/owl.jpg";
import pional from "../../assets/Works/pional14.jpg";
import playaNegra from "../../assets/Works/playaNegra.png";
import pullNbear from "../../assets/Works/pull&bear.png";
import sat from "../../assets/Works/sat.jpg";
import umbro from "../../assets/Works/umbro.jpg";
import vans from "../../assets/Works/vans.gif";
import yungn from "../../assets/Works/yungn.jpg";

class Home extends Component {
  render() {
    const works = [
      { photo: one, title: "twistr" },
      { photo: redCar, title: "redCar" },
      { photo: two, title: "two" },
      { photo: three, title: "three" },
      { photo: eight, title: "eight" },
      { photo: blues, title: "blues" },
      { photo: brap, title: "brap" },
      { photo: eopa, title: "eopa" },
      { photo: jagged, title: "jagged" },
      { photo: loopwheel, title: "loopwheel" },
      { photo: migos, title: "migos" },
      { photo: mister, title: "mister" },
      { photo: owl, title: "owl" },
      { photo: pional, title: "pional" },
      { photo: playaNegra, title: "playaNegra" },
      { photo: pullNbear, title: "pullNbear" },
      { photo: sat, title: "sat" },
      { photo: umbro, title: "umbro" },
      { photo: vans, title: "vans" },
      { photo: yungn, title: "yungn" },
    ];
    const overlay = {
      position: "absolute",
      bottom: "0",
      background: "rgba(48, 9, 155, 0.5)",
      width: "78%",
      transition: ".5s ease",
      opacity: "0",
      color: "rgb(251, 255, 0)",
      fontSize: "25px",
      fontWeight: "bolder",
      padding: "20px",
      textAlign: "center",
    };
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          flexWrap: "wrap",
        }}
      >
        {works.map((work, i) => (
          <div
            className="hover"
            style={{
              display: "flex",
              flex: "1 0 20%",
              justifyContent: "center",
              margin: "5px",
            }}
          >
            <img style={{ width: "70%" }} src={work.photo} alt="works"></img>
            <h3 class={overlay}>{work.title}</h3>
          </div>
        ))}
      </div>
    );
  }
}

export default Home;
