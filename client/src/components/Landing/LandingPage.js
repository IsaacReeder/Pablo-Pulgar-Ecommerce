import React, { Component } from "react";
import pabMovie from "../../assets/landing-video.mov";
import signature from "../../assets/signature.png";

import { Redirect } from "react-router-dom";

class LandingPage extends Component {
  state = {
    redirect: false,
  };
  setRedirect = () => {
    this.setState({ redirect: true });
    console.log("clicked");
  };
  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to="/home" />;
    }
  };
  render() {
    const { redirector } = this.state;
    return (
      <div
        style={{
          display: "flex",
          backgroundColor: "green",
          justifyContent: "center",
        }}
      >
        <img
          style={{
            marginTop: "15%",
            width: "25%",
            position: "absolute",
            cursor: "grab",
            zIndex: "1000",
          }}
          onClick={this.setRedirect}
          src={signature}
          alt="Pablo Pulgar: Artist, warrior, musician, and financial virtuoso."
        ></img>
        {this.renderRedirect()}

        <video
          style={{
            position: "absolute",
            minWidth: "100%",
            minHeight: "100vh",
            flexBasis: "100%",
            height: "101%",
          }}
          className="videoTag"
          autoPlay
          loop
          muted
        >
          <source src={pabMovie} type="video/mp4" />
        </video>
      </div>
    );
  }
}

export default LandingPage;
