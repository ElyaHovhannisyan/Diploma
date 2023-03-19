import Navbar from "../Navbar/Navbar";
import book from "../../img/book.png";
import { useState, useEffect } from "react";
import useBookApi from "../../Services/useBookApi";
import { useParams } from "react-router-dom";

function BookDetail() {
  const [books, setBooks] = useState([]);
  const { getBookDetails } = useBookApi();
  const token = JSON.parse(localStorage.getItem("me"))?.token;
  const { id } = useParams();
  useEffect(() => {
    getBookDetails(token, id).then((res) => {
      const Book = res.data;
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

              {authorsName.map((item) => {
                return <p>{item}</p>;
              })}
              <p> {publisher} </p>
              <p>
                {city} {date}
              </p>
              <p>{pageCount} էջ</p>
              <a
                href="https://libbook.s3.eu-north-1.amazonaws.com/Khndragirq.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                Էլ․ տարբերակ
              </a>
              <p> Առկա է՝ {count}</p>
              <button className="cartButton">Պատվիրել</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BookDetail;
