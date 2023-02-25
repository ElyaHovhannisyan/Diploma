import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faTelegram,
  faTwitter,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import logo from "../../img/polytechnic_logo.png";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer-distributed">
      <div className="footer_left">
        <h2>Միացի՜ր պոլիտեխնիկին</h2>
        <div className="social_media">
          <a
            href="https://www.facebook.com/polytech.am/"
            target="_blank"
            rel="noreferrer"
          >
            <FontAwesomeIcon icon={faFacebook} />
          </a>
          <a
            href="https://twitter.com/polytech_am/"
            target="_blank"
            rel="noreferrer"
          >
            <FontAwesomeIcon icon={faTwitter} />
          </a>
          <a
            href="https://www.instagram.com/polytech_armenia/"
            target="_blank"
            rel="noreferrer"
          >
            <FontAwesomeIcon icon={faInstagram} />
          </a>
          <a href="https://t.me/polytech_am/" target="_blank" rel="noreferrer">
            <FontAwesomeIcon icon={faTelegram} />
          </a>
          <a
            href="https://www.linkedin.com/school/polytech-armenia/"
            target="_blank"
            rel="noreferrer"
          >
            <FontAwesomeIcon icon={faLinkedin} />
          </a>
        </div>
      </div>
      <div className="footer_mid">
        <img src={logo} alt="logo" className="footer_logo"></img>
        <h2>Հայաստանի ազգային պոլիտեխնիկական համալսարանի գրադարան © 2023</h2>
      </div>
      <div className="footer_right">
        <p>Հայաստան, ք.Երևան, Տերյան 105, 0009</p>
        <p>+374 10 58 01 02</p>
        <p>info@polytechnic.am</p>
      </div>
    </footer>
  );
}
export default Footer;
