import Navbar from "../Navbar/Navbar";
import book from "../../img/book.png";
import { Link } from "react-router-dom";
import "./User.css";
import { useState, useEffect } from "react";
import useBookApi from "../../Services/useBookApi";

function User() {
  const [books, setBooks] = useState([]);
  const { getLecturerBooks, getStudentBooks } = useBookApi();
  const token = JSON.parse(localStorage.getItem("me"))?.token;
  const studentId = JSON.parse(localStorage.getItem("me"))?.StudentId;
  const lecturerId = JSON.parse(localStorage.getItem("me"))?.LecturerId;
  useEffect(() => {
    if (studentId)
      getStudentBooks(token, 1).then((res) => {
        setBooks(
          res.data.map((item) => {
            let bookId,
              title,
              subjectName,
              path,
              authorsName = [];
            item.map((book) => {
              bookId = book.id;
              title = book.title;
              subjectName = book.Subject.name;
              path = book.path;
              book.BookDetails.map((item) => {
                console.log(item);
                authorsName.push(item.Author.name);
              });
            });
            return { title, subjectName, path, bookId, authorsName };
          })
        );
      });
    else if (lecturerId) {
    }
  }, []);
  function handleBooksGet(semester) {
    return function () {
      getStudentBooks(token, semester).then((res) => {
        setBooks(
          res.data.map((item) => {
            let bookId,
              title,
              subjectName,
              path,
              authorsName = [];
            item.map((book) => {
              bookId = book.id;
              title = book.title;
              subjectName = book.Subject.name;
              path = book.path;
              book.BookDetails.map((item) => {
                authorsName.push(item.Author.name);
              });
            });
            return { title, subjectName, path, bookId, authorsName };
          })
        );
      });
    };
  }
  return (
    <>
      <Navbar></Navbar>
      <div className="main">
        <div className="needslist">
          <p onClick={handleBooksGet(1)}>I կիսամյակ</p>
          <p onClick={handleBooksGet(2)}>II կիսամյակ</p>
          <p onClick={handleBooksGet(3)}>III կիսամյակ</p>
          <p onClick={handleBooksGet(4)}>IV կիսամյակ</p>
          <p onClick={handleBooksGet(5)}>V կիսամյակ</p>
          <p onClick={handleBooksGet(6)}>VI կիսամյակ</p>
          <p onClick={handleBooksGet(7)}>VII կիսամյակ</p>
          <p onClick={handleBooksGet(8)}>VIII կիսամյակ</p>
        </div>
        <div>
          {books.map(({ title, subjectName, path, bookId, authorsName }) => {
            return (
              <div className="booklist">
                <Link to={`/book/${bookId}`}>
                  <img src={book} alt={book} className="bookImg" />
                </Link>
                <div className="bookDescription">
                  <p className="ptitle">{title}</p>
                  <p className="psubject">{subjectName}</p>
                  {authorsName.map((item) => {
                    return <p>{item}</p>;
                  })}

                  <a
                    href="https://libbook.s3.eu-north-1.amazonaws.com/Khndragirq.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Էլ․ տարբերակ
                  </a>
                  <button className="cartButton">Պատվիրել</button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default User;
