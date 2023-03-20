import Navbar from "../Navbar/Navbar";
import book from "../../img/book.png";
import { Link } from "react-router-dom";
import "./User.css";
import { useState, useEffect } from "react";
import useBookApi from "../../Services/useBookApi";
import useCartApi from "../../Services/useCartApi";
import useSubjectApi from "../../Services/useSubjectApi";

function User() {
  const [books, setBooks] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const { getLecturerBooks, getStudentBooks } = useBookApi();
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
                  const authorsName = item.BookDetails.map((item) => {
                    return item.Author.name;
                  });
                  return { title, subjectName, bookId, path, authorsName };
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
            const authorsName = item.BookDetails.map((item) => {
              return item.Author.name;
            });
            return { title, subjectName, bookId, path, authorsName };
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
                      onClick={handleCartAdd(bookId)}
                    >
                      Պատվիրել
                    </button>
                  </div>
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
