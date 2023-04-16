import { NavLink } from "react-router-dom";
import logout from "../../img/icons8-logout-20.png";
import searchIcon from "../../img/icons8-search-20.png";
import "./Navbar.css";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import AuthService from "../../Services/auth.service";
function Navbar() {
  const navigate = useNavigate();
  const handleLogoutClick = () => {
    AuthService.logout().then((data) => {
      navigate("/home");
    });
  };
  const location = useLocation();

  useEffect(() => {
    // This will be called whenever the location object changes
    // Check if the current location is the one you want to trigger a re-render on
    // If it is, force a re-render of the component by updating its state or props
  }, [location]);
  return (
    <>
      <div className="navbar">
        <div className="navbarLeft">
          <NavLink
            to="/user"
            className="user home"
            activeClassName="active"
            style={{
              textDecoration: "none",
            }}
          >
            Գլխավոր
          </NavLink>
          <NavLink
            to="/subjects"
            className="user subject"
            style={{
              textDecoration: "none",
            }}
          >
            Առարկաներ
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

          <button className="search">
            <img src={searchIcon} alt="searchIcon"></img>
            <NavLink
              to="/search"
              style={{
                textDecoration: "none",
                color: "#002147",
              }}
            >
              <span>Փնտրել․․․</span>
            </NavLink>
          </button>
        </div>
        <div className="navbarRight" onClick={handleLogoutClick}>
          <NavLink
            to="/home"
            className="user logout"
            style={{
              textDecoration: "none",
            }}
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
