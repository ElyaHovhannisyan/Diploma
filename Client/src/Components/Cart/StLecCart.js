import Navbar from "../Navbar/Navbar";
import book from "../../img/book.png";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../User/User.css";
import "./StLecCart.css";
import useCartApi from "../../Services/useCartApi";
import useBookApi from "../../Services/useBookApi";
import cart from "../../img/cartEmpty.png";

function Cart() {
  const [books, setBooks] = useState([]);
  const { getCart, deleteCart } = useCartApi();
  const { putBook } = useBookApi();
  const token = JSON.parse(localStorage.getItem("me"))?.token;
  const UserId = JSON.parse(localStorage.getItem("me"))?.UserId;
  useEffect(() => {
    getCart(token).then((res) => {
      setBooks(
        res.data.cart.map((item) => {
          const { Book } = item;
          const bookId = Book.id;
          const title = Book.title;
          const subjectName = Book.Subject.name;
          return { title, subjectName, bookId };
        })
      ).then();
    });
  }, []);
  function handleCartRemove(BookId) {
    return function () {
      deleteCart(token, BookId, UserId);
      putBook(token, BookId, "+");
      setBooks(books.filter((item) => item.bookId !== BookId));
    };
  }

  return (
    <>
      <Navbar></Navbar>
      <div>
        {books.length > 0 ? (
          books.map(({ title, subjectName, bookId }) => {
            return (
              <div className="booklist">
                <Link to={`/book2/${bookId}`}>
                  <img src={book} alt={book} className="bookImg" />
                </Link>
                <p className="ptitle">{title}</p>
                <p className="psubject">{subjectName}</p>
                <button
                  className="deleteButton"
                  onClick={handleCartRemove(bookId)}
                >
                  Չեղարկել
                </button>
              </div>
            );
          })
        ) : (
          <div className="emptyOrderBg">
            <div className="emptyOrder">
              <img src={cart} alt="Empty order" />
              <h3>Պատվիրված գրքեր չկան!</h3>
              <p>Դուք չունեք գրքեր, որոնք պետք է վերցնեք գրադարանից</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Cart;
