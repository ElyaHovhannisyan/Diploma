import Navbar from "../Navbar/Navbar";
import book from "../../img/book.png";
import { useState, useEffect } from "react";
import useBookApi from "../../Services/useBookApi";
import useCartApi from "../../Services/useCartApi";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function BookDetail(props) {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const { getBookDetails, putBook } = useBookApi();
  const { addCart, deleteCart } = useCartApi();
  const token = JSON.parse(localStorage.getItem("me"))?.token;
  const UserId = JSON.parse(localStorage.getItem("me"))?.UserId;
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
    addCart(token, bookId).then((response) => {
      if (response.data.message) alert(response.data.message);
      else {
        putBook(token, bookId, "-");
        navigate("/cart");
      }
    });
  }
  function handleCartRemove(BookId) {
    deleteCart(token, BookId, UserId).then(
      putBook(token, BookId, "+").then(navigate("/cart"))
    );
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
              <p>Առկա է՝ {count}</p>
              {/* {path && ( */}
              <div className="buttons">
                <button className="bookButton">
                  <a
                    href="https://libbook.s3.eu-north-1.amazonaws.com/Khndragirq.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Էլ․ տարբերակ
                  </a>
                </button>
                {/* )} */}
                <button
                  className="bookButton"
                  onClick={() => {
                    if (props.text === "Պատվիրել") {
                      handleCartAdd(bookId);
                    } else {
                      handleCartRemove(bookId);
                    }
                  }}
                >
                  {props.text}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BookDetail;
