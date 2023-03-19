import Navbar from "../Navbar/Navbar";
import book from "../../img/book.png";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../User/User.css";
import "./StLecCart.css";
import useCartApi from "../../Services/useCartApi";

function Cart() {
  const [books, setBooks] = useState([]);
  const { getCart, deleteCart } = useCartApi();
  const token = JSON.parse(localStorage.getItem("me"))?.token;
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
      );
    });
  }, []);
  function handleCartRemove(BookId) {
    return function () {
      deleteCart(token, BookId);
      //updateBook count;
      setBooks(books.filter((item) => item.bookId !== BookId));
    };
  }

  return (
    <>
      <Navbar></Navbar>
      {books.map(({ title, subjectName, bookId }) => {
        return (
          <div className="booklist">
            <Link to={`/book/id`}>
              <img src={book} alt={book} className="bookImg" />
            </Link>
            <p className="ptitle">{title}</p>
            <p className="psubject">{subjectName}</p>
            <button className="deleteButton" onClick={handleCartRemove(bookId)}>
              Չեղարկել
            </button>
          </div>
        );
      })}
    </>
  );
}

export default Cart;
