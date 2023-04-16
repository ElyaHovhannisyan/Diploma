import Navbar from "../Navbar/Navbar";
import book from "../../img/book.png";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import order from "../../img/order.png";
import "./Order.css";
import useOrderApi from "../../Services/useOrderApi";

function Order() {
  const [books, setBooks] = useState([]);
  const { getOrder } = useOrderApi();
  const token = JSON.parse(localStorage.getItem("me"))?.token;
  useEffect(() => {
    getOrder(token).then((res) => {
      setBooks(
        res.data.map((item) => {
          const { Book } = item;
          const bookId = Book.id;
          const title = Book.title;
          const subjectName = Book.Subject.name;
          return { title, subjectName, bookId };
        })
      ).then();
    });
  }, []);

  return (
    <>
      <Navbar></Navbar>
      <div className="body">
        {books.length > 0 ? (
          books.map(({ title, subjectName, bookId }) => {
            return (
              <div className="booklist">
                <Link to={`/book/${bookId}`}>
                  <img src={book} alt={book} className="bookImg" />
                </Link>
                <p className="ptitle">{title}</p>
                <p className="psubject">{subjectName}</p>
              </div>
            );
          })
        ) : (
          <div className="emptyOrderBg">
            <div className="emptyOrder">
              <img src={order} alt="Empty order" />
              <h3>Հաստատված գրքեր չկան!</h3>
              <p>Դուք չունեք գրքեր, որոնք վերցրել եք գրադարանից</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Order;
