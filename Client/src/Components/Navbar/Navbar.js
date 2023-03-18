import { NavLink } from "react-router-dom";
import logout from "../../img/icons8-logout-20.png";
import searchIcon from "../../img/icons8-search-20.png";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";
import AuthService from "../../Services/auth.service";
function Navbar() {
  const navigate = useNavigate();
  return (
    <>
      <div className="navbar">
        <div className="navbarLeft">
          <NavLink
            to="/user"
            className="user home"
            style={{
              textDecoration: "none",
            }}
          >
            Գլխավոր
          </NavLink>
          <NavLink
            to="/cart"
            className="user cart"
            style={{
              textDecoration: "none",
            }}
          >
            Պատվերներ
          </NavLink>
          <NavLink
            to="/order"
            className="user order"
            style={{
              textDecoration: "none",
            }}
          >
            Դուրս տրված
          </NavLink>
          <NavLink to="/search">
            <button className="search">
              <img src={searchIcon} alt="searchIcon"></img>
              <span>Փնտրել․․․</span>
            </button>
          </NavLink>
        </div>
        <div className="navbarRight">
          <NavLink
            to="/home"
            className="user logout"
            style={{
              textDecoration: "none",
            }}
            onClick={() =>
              AuthService.logout().then((data) => {
                navigate("/home");
              })
            }
          >
            Դուրս գալ
          </NavLink>
          <img src={logout} alt="logoutImg" className="logoutImg"></img>
        </div>
      </div>
    </>
  );
}

export default Navbar;
