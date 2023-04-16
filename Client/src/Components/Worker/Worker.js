import useCartApi from "../../Services/useCartApi";
import { useState, useEffect } from "react";
import WorkerNavbar from "../Navbar/WorkerNavbar";
import "./Worker.css";
import accept from "../../img/icons8-checkmark-48.png";
import useOrderApi from "../../Services/useOrderApi";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import searchIcon from "../../img/search.png";

function Worker() {
  const navigate = useNavigate();
  const [carts, setCarts] = useState([]);
  const [bookNumber, setBookNumber] = useState([]);
  const { getAllCart, deleteCart } = useCartApi();
  const { addOrder } = useOrderApi();
  const token = JSON.parse(localStorage.getItem("me"))?.token;
  useEffect(() => {
    getAllCart(token).then((res) => {
      const newCarts = res.data.map((item) => {
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
      });
      setCarts(newCarts);
      setBookNumber(newCarts.map(() => ({ bookNumber: "" })));
    });
  }, []);

  const handleInputChange = (event, index) => {
    const newBookNumber = [...bookNumber];
    newBookNumber[index].bookNumber = event.target.value;
    setBookNumber(newBookNumber);
  };
  const handleImageClick = (index, userId, bookId) => {
    if (bookNumber[index].bookNumber.trim() === "") {
      Swal.fire({
        icon: "warning",
        title: "Մուտքագրել գրքի համարը",
        iconColor: "#850c23",
        confirmButtonColor: "#850c23",
        confirmButtonText: "Լավ",
        customClass: {
          title: "my-swal-title-class",
        },
      });
      return;
    }
    addOrder(token, bookId, bookNumber[index].bookNumber, userId).then(
      deleteCart(token, bookId, userId).then(navigate("/orders"))
    );
    const newBookNumber = [...bookNumber];
    newBookNumber[index].bookNumber = "";
    setBookNumber(newBookNumber);
  };
  return (
    <>
      <WorkerNavbar />
      <div className="searchLine">
        <button className="searchUser">
          <input className="usernameInput" placeholder="Օգտանուն․․․" />
          <img src={searchIcon} alt="searchIcon"></img>
        </button>
      </div>
      <div className="carts">
        {carts.map(
          ({ title, subjectName, bookId, userId, name, surname }, index) => {
            return (
              <>
                <div className="listElement">
                  <p>{title}</p>
                  <p>{subjectName}</p>
                  <p>
                    {name} {surname}
                  </p>

                  <input
                    type={Text}
                    placeholder="Գրքի համար"
                    className="numberInput"
                    value={bookNumber[index].bookNumber}
                    onChange={(event) => handleInputChange(event, index)}
                  ></input>
                  <img
                    src={accept}
                    alt={accept}
                    className="acceptImg"
                    onClick={() => handleImageClick(index, userId, bookId)}
                  />
                </div>
              </>
            );
          }
        )}
      </div>
    </>
  );
}

export default Worker;
