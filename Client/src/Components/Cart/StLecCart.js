import Navbar from "../Navbar/Navbar";
import book from "../../img/book.png";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../User/User.css";
import useCartApi from "../../Services/useCartApi";

function Cart() {
  const [books, setBooks] = useState([]);
  const { getCart } = useCartApi();
  useEffect(() => {
    getCart()
      .then((res) => res.json())
      .then((res) => {
        if (!res.error) {
          console.log(res.cart);
          setBooks(
            res.cart.map((item) => {
              const { Book } = item;
              console.log(Book.Subject.name);
              const title = Book.title;
              const name = Book.Subject.name;
              return { ...Book };
            })
          );
        }
      });
    console.log(books);
  }, []);
  return books.map(({ title, name }) => {
    <>
      <Navbar></Navbar>
      <div className="booklist">
        <Link to={`/book/id`}>
          <img src={book} alt={book} className="bookImg" />
        </Link>
        <p className="ptitle">{title}</p>
        <p className="psubject">{name}</p>
      </div>
    </>;
  });
}

export default Cart;
