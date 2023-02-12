import "./Login.css";
import search_icon from "../../img/icons8-search-20.png";
import { NavLink } from "react-router-dom";
import { useState } from "react";

function Login() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const handleLoginChange = (event) => {
    setLogin(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    console.log(password);
  };
  const handleUserLogin = (event) => {
    event.preventDefault();
    console.log(login + " +++" + password);
    setLogin("");
    setPassword("");
  };
  return (
    <>
      <div className="header_bottom">
        <NavLink to="/search">
          <button className="search">
            <img src={search_icon} alt="icon"></img>
            <span>Փնտրել․․․</span>
          </button>
        </NavLink>
        <NavLink to="/sign_up">
          <button className="sign_up"> Գրանցում </button>
        </NavLink>
      </div>
      <div className="book_img">
        <form className="transparent" onSubmit={handleUserLogin}>
          <div className="form-inner">
            <label className="user">Մուտքանուն</label>
            <input
              type="text"
              id="username"
              value={login}
              onChange={handleLoginChange}
            />
            <label>Գաղտնաբառ</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={handlePasswordChange}
              autoComplete="new-password"
            />
            <input type="submit" value="Մուտք" />
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;