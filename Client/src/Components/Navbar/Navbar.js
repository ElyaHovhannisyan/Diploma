import { NavLink } from "react-router-dom";
import logout from "../../img/icons8-logout-20.png";
import searchIcon from "../../img/icons8-search-20.png";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";
import AuthService from "../../Services/auth.service";
function Navbar() {
  const navigate = useNavigate();
  const handleLogoutClick = () => {
    AuthService.logout().then((data) => {
      navigate("/home");
    });
  };
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
            Պատվեր
          </NavLink>
          <NavLink
            to="/order"
            className="user order"
            style={{
              textDecoration: "none",
            }}
          >
            Հաստատված
          </NavLink>
          <NavLink
            to="/delievered"
            className="user delievered"
            style={{
              textDecoration: "none",
            }}
          >
            Հանձնած
          </NavLink>
          <NavLink
            to="/fine"
            className="user fine"
            style={{
              textDecoration: "none",
            }}
          >
            Տուգանք
          </NavLink>
          <NavLink
            to="/subjects"
            className="user subject"
            style={{
              textDecoration: "none",
            }}
          >
            Առարկա
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
            onClick={handleLogoutClick}
          >
            Դուրս գալ
          </NavLink>
          <img
            src={logout}
            alt="logoutImg"
            className="logoutImg"
            onClick={handleLogoutClick}
          ></img>
        </div>
      </div>
    </>
  );
}

export default Navbar;
