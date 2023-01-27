import "./Home.css";
import logo from "../img/polytechnic_logo.png";
import search_icon from "../img/icons8-search-20.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faTelegram,
  faTwitter,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";

function Home() {
  return (
    <>
      <div class="header_container">
        <img src={logo} alt="logo" class="header_logo"></img>
        <h1>Հայաստանի ազգային պոլիտեխնիկական համալսարանի գրադարան</h1>
      </div>
      <div class="header_bottom">
        <form class="header_form">
          <input type="text" id="search" placeholder="Փնտրել..."></input>
          <img src={search_icon} alt="icon"></img>
        </form>
        <div class="header_bottom_right">
          <a class="login">Մուտք</a>
          <a>
            <button class="sign_up"> Գրանցում </button>
          </a>
        </div>
      </div>
      <div class="book_img"></div>
      <footer class="footer-distributed">
        <div class="footer_left">
          <h2>Միացի՜ր պոլիտեխնիկին</h2>
          <div className="social_media">
            <a href="https://www.facebook.com/polytech.am/" target="_blank">
              <FontAwesomeIcon icon={faFacebook} />
            </a>
            <a href="https://twitter.com/polytech_am/" target="_blank">
              <FontAwesomeIcon icon={faTwitter} />
            </a>
            <a
              href="https://www.instagram.com/polytech_armenia/"
              target="_blank"
            >
              <FontAwesomeIcon icon={faInstagram} />
            </a>
            <a href="https://t.me/polytech_am/" target="_blank">
              <FontAwesomeIcon icon={faTelegram} />
            </a>
            <a
              href="https://www.linkedin.com/school/polytech-armenia/"
              target="_blank"
            >
              <FontAwesomeIcon icon={faLinkedin} />
            </a>
          </div>
        </div>
        <div class="footer_mid">
          <img src={logo} alt="logo" class="footer_logo"></img>
          <h2>Հայաստանի ազգային պոլիտեխնիկական համալսարանի գրադարան © 2023</h2>
        </div>
        <div className="footer_right">
          <p>Հայաստան, ք.Երևան, Տերյան 105, 0009</p>
          <p>+374 10 58 01 02</p>
          <p>info@polytechnic.am</p>
        </div>
      </footer>
    </>
  );
}

export default Home;
