import Navbar from "../Navbar/Navbar";
import book from "../../img/book.png";
import { useState, useEffect } from "react";
import useBookApi from "../../Services/useBookApi";
import useCartApi from "../../Services/useCartApi";
import { useParams } from "react-router-dom";

function BookDetail() {
  const [books, setBooks] = useState([]);
  const { getBookDetails } = useBookApi();
  const { addCart } = useCartApi();
  const token = JSON.parse(localStorage.getItem("me"))?.token;
  const { id } = useParams();
  useEffect(() => {
    getBookDetails(token, id).then((res) => {
      const Book = res.data;
      const bookId = Book.id;
      const title = Book.title;
      const count = Book.count;
      const subjectName = Book.Subject.name;
      const pageCount = Book.pageCount;
      const city = Book.city;
      const date = Book.date;
      const publisher = Book.publisher;
      const path = Book.path;
      let authorsName = [];
      Book.BookDetails.map((item) => {
        authorsName.push(item.Author.name);
      });
      setBooks({
        bookId,
        title,
        count,
        subjectName,
        pageCount,
        city,
        date,
        path,
        publisher,
        authorsName,
      });
    });
  }, []);
  const {
    bookId,
    title,
    subjectName,
    count,
    pageCount,
    city,
    date,
    path,
    publisher,
    authorsName,
  } = books;
  function handleCartAdd(bookId) {
    return function () {
      addCart(token, bookId);
      //updatecount-
    };
  }
  return (
    <>
      <Navbar></Navbar>
      <div className="main">
        <div>
          <div className="booklist">
            <img src={book} alt={book} className="bookImg" />
            <div className="bookDescription">
              <p className="ptitle">{title}</p>
              <p className="psubject">{subjectName}</p>
              {authorsName &&
                authorsName.map((item) => {
                  return <p>{item}</p>;
                })}
              <p> {publisher} </p>
              <p>
                {city} {date}
              </p>
              <p>{pageCount} էջ</p>
              {path && (
                <a
                  href="https://libbook.s3.eu-north-1.amazonaws.com/Khndragirq.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Էլ․ տարբերակ
                </a>
              )}
              <p> Առկա է՝ {count}</p>
              <button className="cartButton" onClick={handleCartAdd(bookId)}>
                Պատվիրել
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BookDetail;
