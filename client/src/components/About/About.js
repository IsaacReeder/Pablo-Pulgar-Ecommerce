import React from "react";
import sid from "../../assets/Works/sid.jpeg";
import Popper from "./popper";

import Link from "@material-ui/core/Link";
import EmailIcon from "@material-ui/icons/Email";
import InstagramIcon from "@material-ui/icons/Instagram";

const About = () => {
  const Mailto = ({ email, subject = "", body = "", children }) => {
    let params = subject || body ? "?" : "";
    if (subject) params += `subject=${encodeURIComponent(subject)}`;
    if (body) params += `${subject ? "&" : ""}body=${encodeURIComponent(body)}`;

    return <a href={`mailto:${email}${params}`}>{children}</a>;
  };
  return (
    <div>
      <div style={{ display: "flex", flexDirection: "row", padding: "10%" }}>
        <div
          name="parent"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            minWidth: "40%",
            alignContent: "flex-start",
          }}
        >
          <div style={{ paddingRight: "15%" }}>
            Pablo Pulgar is a Spanish Fartist born in Madrid. He has exhibited
            his work in several galleries in Spain and Netherlands. With a
            background in graffiti and graphic design, his work is in between
            the digital world and the physical. A place where the choice of
            media used plays an important role ranging from painting and collage
            to fanzines, photography and video installations. Fashion, popular
            culture and music references are mixed with heavy usage of
            typography and color to make digital hand made landscapes with a
            sense for formal art. Pablo is currently based in Spain.
          </div>
          <h2>Selected Exhibitions:</h2>
          <h3>Group shows:</h3>
          <ul>
            <h4>2011</h4>
            <li>- Ilumina el invierno. Galeria 1arte, Madrid</li>
            <h4>2013</h4>
            <li>- Formato 18x24. Galeria Isala, Madrid</li>
            <h4>2014</h4>

            <li>- Matisse is Back. Espacio Ananás, Madrid</li>
            <li>- Macedonia Bazar. Espacio Trapézio, Madrid</li>

            <h4>2015</h4>
            <li>
              - Stock de obras. Centro Cultural Isabel de Farnesio. Aranjuez,
              Spain
            </li>
            <li>- Who ́s the ruler. ArtEz BFA. Arnhem, Netherlands</li>
            <h4>2016</h4>

            <li>- The Age of Retalin. De Kring. Amsterdam, Netherlands</li>
            <li>- Amongst Others. Het Instituut. Amsterdam, Netherlands</li>
            <li>
              - There is some rocks. Sainte Gertrude 19. Brussels, Belgium
            </li>
            <li>- Poder Planetario. Watdafac Gallery. Madrid</li>
            <li>- New Exhibition. ArtEz BFA. Arnhem, Netherlands</li>
            <li>- Retina #04. La Casa Encendida. Madrid</li>

            <h4>2017</h4>
            <li>- Expo 01. Nautilus. La Coruña</li>
            <li>- 28224. Espacio Volturno. Madrid</li>
            <h4>2019</h4>
            <li>- W/J Juan Rico. Balasi. Madrid</li>
            <h4>2020</h4>
            <li>-Beyond the canvas. Flaco Studio. A Coruña</li>
            <li>-Cosas de casa. Flaco Studio. A Coruña</li>
          </ul>
        </div>
        <div>
          <img src={sid} style={{ maxWidth: "100%" }} alt="el sid" />
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-start",
            }}
          >
            <Link href="https://www.instagram.com/ppmf_/" color="disabled">
              <InstagramIcon fontSize="large" />
            </Link>
            <Popper />
            <Mailto
              email="pablopulgarmf@gmail.com"
              subject="Contacting from your website."
              body="YO Pablo!"
            >
              <EmailIcon fontSize="large" />
            </Mailto>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
