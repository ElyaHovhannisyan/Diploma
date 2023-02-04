import "./Home.css";
import { NavLink } from "react-router-dom";
import search_icon from "../../img/icons8-search-20.png";

function Home() {
  return (
    <>
      <div className="header_bottom">
        <NavLink to="/search">
          <button className="search">
            <img src={search_icon} alt="icon"></img>
            <span>Փնտրել․․․</span>
          </button>
        </NavLink>
        <NavLink
          to="/login"
          className="login"
          style={{
            textDecoration: "none",
          }}
        >
          Մուտք
        </NavLink>
        <NavLink to="/sign_up">
          <button className="sign_up"> Գրանցում </button>
        </NavLink>
      </div>
      <div className="book_img"></div>
    </>
  );
}

export default Home;
