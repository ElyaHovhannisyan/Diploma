import "./Home.css";
import { NavLink } from "react-router-dom";

function Home() {
  return (
    <>
      <div className="header_bottom">
        <NavLink
          to="/login"
          className="login"
          style={{
            textDecoration: "none",
          }}
        >
          Մուտք
        </NavLink>
        <NavLink to="/register">
          <button className="register"> Գրանցում </button>
        </NavLink>
      </div>
      <div className="book_img"></div>
    </>
  );
}

export default Home;
