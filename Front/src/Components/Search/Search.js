import { NavLink } from "react-router-dom";
function Search() {
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
        <NavLink to="/sign_up">
          <button className="sign_up"> Գրանցում </button>
        </NavLink>
      </div>
      <div className="book_img">
        <form className="transparent">
          <div className="form-inner">
            <label>Վերնագիր</label>
            <input type="text" />
            <label>Հեղինակ</label>
            <input type="text" />
            <label>Առարկա</label>
            <input type="text" />
            <label>ISBN</label>
            <input type="text" />
            <input type="submit" value="Որոնել" />
          </div>
        </form>
      </div>
    </>
  );
}

export default Search;
