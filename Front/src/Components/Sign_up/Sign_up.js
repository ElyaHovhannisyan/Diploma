import { NavLink } from "react-router-dom";
import search_icon from "../../img/icons8-search-20.png";

function Sign_up() {
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
      </div>
      <div className="book_img">
        <form className="transparent">
          <div className="form-inner">
            <label className="username">Մուտքանուն</label>
            <input type="text" />
            <label className="email">Էլեկտրոնային հասցե</label>
            <input type="text" />
            <label>Գաղտնաբառ</label>
            <input type="password" />
            <label>Գաղտնաբառի կրկնություն</label>
            <input type="password" />
            <input type="submit" value="Գրանցում" />
          </div>
        </form>
      </div>
    </>
  );
}

export default Sign_up;
