import { NavLink } from "react-router-dom";
import logout from "../../img/icons8-logout-20.png";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";
import AuthService from "../../Services/auth.service";
function WorkerNavbar() {
  const navigate = useNavigate();
  const handleLogoutClick = () => {
    AuthService.logout().then((data) => {
      navigate("/home");
    });
  };
  return (
    <>
      <div className="navbar">
        <div className="navbarLeft navbarLeftworker">
          <NavLink
            to="/worker"
            className="user cart"
            style={{
              textDecoration: "none",
            }}
          >
            Պատվերներ
          </NavLink>
          <NavLink
            to="/orders"
            className="user order"
            style={{
              textDecoration: "none",
            }}
          >
            Հաստատվածներ
          </NavLink>
          <NavLink
            to="/fines"
            className="user fine"
            style={{
              textDecoration: "none",
            }}
          >
            Տուգանքներ
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
export default WorkerNavbar;
