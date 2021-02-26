import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./Home.css";

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
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import LoadingSpinner from "../UiElements/LoadingSpinner";

import Typography from "@material-ui/core/Typography";

import AppBar from "../UiElements/AppBar";
import "./Home.css";

const Test = () => {
  const history = useHistory();
  const handleButtonClick = (id) => {
    history.push(id);
  };
  const [loading, setLoading] = useState(true);
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
    <div>
      <>
        <AppBar />

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
          {/* ༼ つ ◕_◕ ༽つ */}
          {loading && <LoadingSpinner asOverlay />}
          {works.map((work, i) => (
            <div key={i} className="container">
              <div style={{ display: "flex" }}>
                <Card
                  style={{ maxWidth: "345" }}
                  onClick={() => handleButtonClick(`${work.id}`)}
                >
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      alt="Contemplative Reptile"
                      src={work.photo}
                      title="Contemplative Reptile"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        {work.title}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </div>
              {/* {this.renderRedirect()} */}
              {/* <div className="text">{work.title}</div> */}
            </div>
          ))}
        </div>
      </>
      <button
        type="button"
        style={{ height: "100px" }}
        value="/3"
        onClick={handleButtonClick}
      >
        Navigate Me!
      </button>
    </div>
  );
};

export default Test;
