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

import "./Home.css";
import NavBar from "../UiElements/NavBar";

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

    return (
      <>
        <NavBar />

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "center",
            margin: "5%",
            marginTop: "0%",
            cursor: "crosshair",
          }}
        >
          {works.map((work, i) => (
            <div key={i} style={{ flex: "1", minWidth: "25%", margin: "20px" }}>
              <div>
                <img style={{ width: "100%" }} src={work.photo} alt="works" />
              </div>
              {/* <div className="text">{work.title}</div> */}
            </div>
          ))}
        </div>
      </>
    );
  }
}

export default Home;
