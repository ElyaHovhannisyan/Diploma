import Navbar from "../Navbar/Navbar";
import book from "../../img/book.png";
import { Link } from "react-router-dom";
import "./User.css";
import { useState, useEffect } from "react";
import useBookApi from "../../Services/useBookApi";
import useCartApi from "../../Services/useCartApi";
import useSubjectApi from "../../Services/useSubjectApi";
import { useNavigate } from "react-router-dom";

function User() {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [error, setError] = useState([]);
  const { getLecturerBooks, getStudentBooks, putBook } = useBookApi();
  const { addCart } = useCartApi();
  const { getSubjects } = useSubjectApi();
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
              count,
              authorsName = [];
            item.map((book) => {
              bookId = book.id;
              title = book.title;
              subjectName = book.Subject.name;
              path = book.path;
              count = book.count;
              book.BookDetails.map((item) => {
                authorsName.push(item.Author.name);
              });
            });
            return { title, subjectName, path, bookId, count, authorsName };
          })
        );
      });
    else if (lecturerId) {
      getSubjects(token)
        .then((res) => {
          const subjects = res.data.map((item) => {
            const subjectId = item.SubjectId;
            const subjectName = item.Subject.name;
            return { subjectId, subjectName };
          });
          setSubjects(subjects);
          return subjects;
        })
        .then((subjects) => {
          if (subjects.length > 0) {
            getLecturerBooks(token, subjects[0].subjectId).then((res) => {
              setBooks(
                res.data.map((item) => {
                  const bookId = item.id;
                  const title = item.title;
                  const subjectName = item.Subject.name;
                  const path = item.path;
                  const count = item.count;
                  const authorsName = item.BookDetails.map((item) => {
                    return item.Author.name;
                  });
                  return {
                    title,
                    subjectName,
                    bookId,
                    path,
                    count,
                    authorsName,
                  };
                })
              );
            });
          }
        });
    }
  }, []);
  function handleSubjectBooks(id) {
    return function () {
      getLecturerBooks(token, id).then((res) => {
        setBooks(
          res.data.map((item) => {
            const bookId = item.id;
            const title = item.title;
            const subjectName = item.Subject.name;
            const path = item.path;
            const count = item.count;
            const authorsName = item.BookDetails.map((item) => {
              return item.Author.name;
            });
            return { title, subjectName, bookId, path, count, authorsName };
          })
        );
      });
    };
  }
  function handleSemesterBooks(semester) {
    return function () {
      getStudentBooks(token, semester).then((res) => {
        setBooks(
          res.data.map((item) => {
            let bookId,
              title,
              subjectName,
              path,
              count,
              authorsName = [];
            item.map((book) => {
              bookId = book.id;
              title = book.title;
              subjectName = book.Subject.name;
              path = book.path;
              count = book.count;
              book.BookDetails.map((item) => {
                authorsName.push(item.Author.name);
              });
            });
            return { title, subjectName, path, bookId, count, authorsName };
          })
        );
      });
    };
  }
  function handleCartAdd(bookId, bookCount) {
    return function () {
      if ((bookCount = 0)) {
        setError("Գիրքն այս պահին առկա չէ");
      } else {
        addCart(token, bookId).then((response) => {
          if (response.data.message) setError(response.data.message);
          else {
            putBook(token, bookId, "-");
            navigate("/cart");
          }
        });
      }
    };
  }
  return (
    <>
      <Navbar></Navbar>
      <div className="main">
        <div className="needslist">
          {studentId && (
            <>
              <p onClick={handleSemesterBooks(1)}>I կիսամյակ</p>
              <p onClick={handleSemesterBooks(2)}>II կիսամյակ</p>
              <p onClick={handleSemesterBooks(3)}>III կիսամյակ</p>
              <p onClick={handleSemesterBooks(4)}>IV կիսամյակ</p>
              <p onClick={handleSemesterBooks(5)}>V կիսամյակ</p>
              <p onClick={handleSemesterBooks(6)}>VI կիսամյակ</p>
              <p onClick={handleSemesterBooks(7)}>VII կիսամյակ</p>
              <p onClick={handleSemesterBooks(8)}>VIII կիսամյակ</p>
            </>
          )}
          {lecturerId &&
            subjects.map(({ subjectId, subjectName }) => {
              return (
                <p onClick={handleSubjectBooks(subjectId)}>{subjectName}</p>
              );
            })}
        </div>
        <div>
          {books.map(
            ({ title, subjectName, path, bookId, count, authorsName }) => {
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
                        onClick={handleCartAdd(bookId, count)}
                      >
                        Պատվիրել
                      </button>
                    </div>
                    {error && <p>{error}</p>}
                  </div>
                </div>
              );
            }
          )}
        </div>
      </div>
    </>
  );
}

export default User;
