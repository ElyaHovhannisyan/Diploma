import searchIcon from "../../img/search.png";
import { useState, useEffect } from "react";
import WorkerNavbar from "../Navbar/WorkerNavbar";
import "./Worker.css";
import accept from "../../img/icons8-checkmark-48.png";
import useOrderApi from "../../Services/useOrderApi";
import useDelieverApi from "../../Services/useDelieverApi";
import useSearchApi from "../../Services/useSearchApi";

function Orders() {
  const [orders, setOrders] = useState([]);
  const { deleteOrder, getAllOrder } = useOrderApi();
  const { addDeliever } = useDelieverApi();
  const { orderSearch } = useSearchApi();
  const token = JSON.parse(localStorage.getItem("me"))?.token;
  useEffect(() => {
    getAllOrder(token).then((res) => {
      const newOrders = res.data.map((item) => {
        const bookNumber = item.bookNumber;
        const { Book } = item;
        const { User } = item;
        const userId = item.UserId;
        const bookId = Book.id;
        const title = Book.title;
        const subjectName = Book.Subject.name;
        const name = User.StudentId ? User.Student.name : User.Lecturer.name;
        const surname = User.StudentId
          ? User.Student.surname
          : User.Lecturer.surname;
        return {
          title,
          subjectName,
          bookId,
          userId,
          name,
          surname,
          bookNumber,
        };
      });
      setOrders(newOrders);
    });
  }, []);

  const handleImageClick = (userId, bookId) => {
    addDeliever(token, bookId, userId);
    deleteOrder(token, bookId, userId);
    setOrders(
      orders.filter((item) => item.bookId !== bookId || item.userId !== userId)
    );
  };

  const handleSearchClick = () => {
    const username = document.getElementById("username").value;
    document.getElementById("username").value = "";
    orderSearch(token, username).then((res) => {
      const newOrders = res.data.map((item) => {
        const bookNumber = item.bookNumber;
        const { Book } = item;
        const { User } = item;
        const userId = item.UserId;
        const bookId = Book.id;
        const title = Book.title;
        const subjectName = Book.Subject.name;
        const name = User.StudentId ? User.Student.name : User.Lecturer.name;
        const surname = User.StudentId
          ? User.Student.surname
          : User.Lecturer.surname;
        return {
          title,
          subjectName,
          bookId,
          userId,
          name,
          surname,
          bookNumber,
        };
      });
      setOrders(newOrders);
    });
  };
  return (
    <>
      <WorkerNavbar />
      <div className="searchLine">
        <button className="searchUser">
          <input
            className="usernameInput"
            placeholder="Օգտանուն․․․"
            type="text"
            id="username"
          />
          <img
            src={searchIcon}
            alt="searchIcon"
            onClick={handleSearchClick}
          ></img>
        </button>
      </div>
      <div className="carts">
        {orders.map(
          ({
            title,
            subjectName,
            bookId,
            userId,
            name,
            surname,
            bookNumber,
          }) => {
            return (
              <>
                <div className="listElement">
                  <p>{title}</p>
                  <p>{subjectName}</p>
                  <p>
                    {name} {surname}
                  </p>

                  <p>{bookNumber}</p>
                  <img
                    src={accept}
                    alt={accept}
                    className="acceptImg"
                    onClick={() => handleImageClick(userId, bookId)}
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

export default Orders;
