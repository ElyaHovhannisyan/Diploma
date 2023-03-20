import useCartApi from "../../Services/useCartApi";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import logout from "../../img/icons8-logout-20.png";
import { useNavigate } from "react-router-dom";
import AuthService from "../../Services/auth.service";
function Worker() {
  const [carts, setCarts] = useState([]);
  const { getAllCart } = useCartApi();
  const token = JSON.parse(localStorage.getItem("me"))?.token;
  useEffect(() => {
    getAllCart(token).then((res) => {
      setCarts(
        res.data.map((item) => {
          const { Book } = item;
          const { User } = item.Cart;
          const userId = item.Cart.UserId;
          const bookId = Book.id;
          const title = Book.title;
          const subjectName = Book.Subject.name;
          const name = User.StudentId ? User.Student.name : User.Lecturer.name;
          const surname = User.StudentId
            ? User.Student.surname
            : User.Lecturer.surname;
          return { title, subjectName, bookId, userId, name, surname };
        })
      );
    });
  }, []);
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
      {carts.map(({ title, subjectName, bookId, userId, name, surname }) => {
        return (
          <p>
            {title} {subjectName} {name} {surname}
          </p>
        );
      })}
    </>
  );
}

export default Worker;
