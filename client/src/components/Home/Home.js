import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import AppBar from "../UiElements/AppBar";

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
import LoadingSpinner from "../UiElements/LoadingSpinner";

const HomeNotes = () => {
  const history = useHistory();
  const [activeHover, setActiveHover] = useState(null);
  const handleButtonClick = (id) => {
    history.push(id);
  };
  const [loading, setLoading] = useState(true);
  const works = [
    { photo: loopwheel, title: "Collage", id: 4 },
    { photo: one, title: "Collage", id: 4 },
    { photo: brap, title: "Painting", id: 3 },
    { photo: playaNegra, title: "Collage", id: 4 },
    { photo: eight, title: "Collage", id: 4 },
    { photo: pional, title: "Collage", id: 4 },
    { photo: vans, title: "Collage", id: 4 },
    { photo: jagged, title: "Print", id: 1 },
    { photo: two, title: "Collage", id: 4 },
    { photo: yungn, title: "Collage", id: 4 },
    { photo: umbro, title: "Collage", id: 4 },
    { photo: owl, title: "Collage", id: 4 },
    { photo: eopa, title: "Collage", id: 4 },
    { photo: sat, title: "Collage", id: 4 },
    { photo: migos, title: "Collage", id: 4 },
    { photo: blues, title: "Fanzines", id: 6 },
    { photo: mister, title: "Collage", id: 4 },
    { photo: pullNbear, title: "Collage", id: 4 },
    { photo: redCar, title: "Painting", id: 3 },
    { photo: three, title: "Collage", id: 4 },
  ];

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <div>
      <AppBar />

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "center",
          margin: "5%",
          marginTop: "25px",
          cursor: "pointer",
        }}
      >
        {/* ༼ つ ◕_◕ ༽つ */}
        {loading && <LoadingSpinner asOverlay />}
        {works.map((work, i) => {
          const margin = i % 2 === 1 ? 0.5 : -0.5;
          return (
            <>
              <div
                style={{
                  display: "flex",
                  position: "relative",
                  flex: "1",
                  minWidth: "300px",
                  margin: "20px",
                  borderTop: "20px solid #ca4246",
                  borderBottom: "20px solid #a7489b",
                  borderLeft: "20px solid #476098",
                  borderRight: "20px solid #f18f43",
                  marginTop: `${margin}rem`,
                }}
                onClick={() => handleButtonClick(`${work.id}`)}
              >
                <img
                  src={work.photo}
                  style={{ width: "100%" }}
                  onMouseOver={() => setActiveHover(work.photo)}
                  onMouseOut={() => setActiveHover(null)}
                />
                {activeHover === work.photo && (
                  <div
                    style={{
                      position: "absolute",
                      top: 50,
                      left: "50%",
                      transform: "translateX(-50%)",
                      margin: "auto",
                      backgroundColor: "white",
                      backgroundImage: `url(
                      "http://www.graphicartsunit.com/images/noise.png"
                    )`,
                      color: "blue",
                      fontSize: "5vw",
                      borderTop: "10px solid hsl(0, 1%, 39%)",
                      borderRight: "10px solid hsl(0, 4%, 76%)",
                      borderBottom: "10px solid hsl(0, 2%, 67%)",
                      borderLeft: "10px solid hsl(0, 1%, 27%)",
                      transition: "2s ease-in-out",
                    }}
                  >
                    <p>{work.title}</p>
                  </div>
                )}
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
};

export default HomeNotes;
