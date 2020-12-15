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
import { Redirect } from "react-router-dom";

import NavBar from "../UiElements/NavBar";
import "./Home.css";

class Home extends Component {
  state = {
    redirect: false,
    itemId: 0,
  };
  setRedirect = (id) => {
    this.setState({ redirect: true, itemId: id });
  };

  renderRedirect = () => {
    if (this.state.redirect && this.state.itemId > 0) {
      return <Redirect to={`/${this.state.itemId}`} />;
    }
  };
  render() {
    const works = [
      { photo: redCar, title: "redCar", id: 3 },
      { photo: eight, title: "eight", id: 4 },
      { photo: blues, title: "blues", id: 6 },
      { photo: brap, title: "brap", id: 3 },
      { photo: eopa, title: "eopa", id: 4 },
      { photo: jagged, title: "jagged", id: 1 },
      { photo: loopwheel, title: "loopwheel", id: 4 },
      { photo: migos, title: "migos", id: 4 },
      { photo: mister, title: "mister", id: 4 },
      { photo: owl, title: "owl", id: 4 },
      { photo: pional, title: "pional", id: 4 },
      { photo: playaNegra, title: "playaNegra", id: 4 },
      { photo: one, title: "twistr", id: 4 },
      { photo: pullNbear, title: "pullNbear", id: 4 },
      { photo: sat, title: "sat", id: 4 },
      { photo: three, title: "three", id: 4 },
      { photo: umbro, title: "umbro", id: 4 },
      { photo: two, title: "two", id: 4 },
      { photo: vans, title: "vans", id: 4 },
      { photo: yungn, title: "yungn", id: 4 },
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
            <div key={i} className="container">
              <div style={{ display: "flex" }}>
                <div className="middle">
                  <div className="text">{work.title}</div>
                </div>
                <img
                  className="image"
                  src={work.photo}
                  alt="works"
                  onClick={() => this.setRedirect(work.id)}
                />
              </div>
              {this.renderRedirect()}
              {/* <div className="text">{work.title}</div> */}
            </div>
          ))}
        </div>
      </>
    );
  }
}

export default Home;
