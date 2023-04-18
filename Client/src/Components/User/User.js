import Navbar from "../Navbar/Navbar";
import book from "../../img/book.png";
import subject from "../../img/bookS.png";
import { Link } from "react-router-dom";
import "./User.css";
import { useState, useEffect } from "react";
import useBookApi from "../../Services/useBookApi";
import useCartApi from "../../Services/useCartApi";
import useSubjectApi from "../../Services/useSubjectApi";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function User() {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [currentSemester, setCurrentSemester] = useState("");
  const [activeColor, setActiveColor] = useState("");
  const { getBooksBySubjectId, putBook } = useBookApi();
  const { addCart } = useCartApi();
  const { getSubjects, getSemesterSubjectsByGroup, getSemesterSubjects } =
    useSubjectApi();
  const token = JSON.parse(localStorage.getItem("me"))?.token;
  const studentId = JSON.parse(localStorage.getItem("me"))?.StudentId;
  const lecturerId = JSON.parse(localStorage.getItem("me"))?.LecturerId;
  useEffect(() => {
    if (studentId) {
      getSemesterSubjectsByGroup(token).then((res) => {
        const subjects = res.data.lessons.map((item) => {
          const subjectId = item.SubjectId;
          const subjectName = item.Subject.name;
          return { subjectId, subjectName };
        });
        setSubjects(subjects);
        setCurrentSemester(res.data.semester);
        setActiveColor(res.data.semester);
      });
    } else if (lecturerId) {
      getSubjects(token)
        .then((res) => {
          const subjects = res.data.map((item) => {
            const subjectId = item.SubjectId;
            const subjectName = item.Subject.name;
            return { subjectId, subjectName };
          });
          setSubjects(subjects);
          setActiveColor(0);
          return subjects;
        })
        .then((subjects) => {
          if (subjects.length > 0) {
            getBooksBySubjectId(token, subjects[0].subjectId).then((res) => {
              setBooks(
                res.data.map((item) => {
                  const bookId = item.id;
                  const title = item.title;
                  const subjectName = item.Subject.name;
                  const path = item.path;
                  const authorsName = item.BookDetails.map((item) => {
                    return item.Author.name;
                  });
                  const authorName = authorsName[0];
                  return {
                    title,
                    subjectName,
                    bookId,
                    path,
                    authorName,
                  };
                })
              );
            });
          }
        });
    }
  }, []);
  function handleSubjectBooks(id, index) {
    return function () {
      setActiveColor(index);
      getBooksBySubjectId(token, id).then((res) => {
        setBooks(
          res.data.map((item) => {
            const bookId = item.id;
            const title = item.title;
            const subjectName = item.Subject.name;
            const path = item.path;
            const authorsName = item.BookDetails.map((item) => {
              return item.Author.name;
            });
            const authorName = authorsName[0];
            return {
              title,
              subjectName,
              bookId,
              path,
              authorName,
            };
          })
        );
      });
    };
  }
  function handleSemesterSubjects(semester) {
    return function () {
      setActiveColor(semester);
      getSemesterSubjects(token, semester).then((res) => {
        const subjects = res.data.map((item) => {
          const subjectId = item.SubjectId;
          const subjectName = item.Subject.name;
          return { subjectId, subjectName };
        });
        setSubjects(subjects);
      });
      setCurrentSemester(semester);
    };
  }
  function handleCartAdd(bookId) {
    return function () {
      addCart(token, bookId).then((response) => {
        if (response.data.message) {
          Swal.fire({
            icon: "warning",
            title: response.data.message,
            iconColor: "#850c23",
            confirmButtonColor: "#850c23",
            confirmButtonText: "Լավ",
            customClass: {
              title: "my-swal-title-class",
            },
          });
        } else {
          putBook(token, bookId, "-");
          navigate("/cart");
        }
      });
    };
  }
  return (
    <>
      <Navbar></Navbar>
      <div className="main">
        <div className="needslist">
          {studentId && (
            <>
              <p
                onClick={handleSemesterSubjects(1)}
                className={activeColor === 1 ? "active" : ""}
              >
                I կիսամյակ
              </p>
              <p
                onClick={handleSemesterSubjects(2)}
                className={activeColor === 2 ? "active" : ""}
              >
                II կիսամյակ
              </p>
              <p
                onClick={handleSemesterSubjects(3)}
                className={activeColor === 3 ? "active" : ""}
              >
                III կիսամյակ
              </p>
              <p
                onClick={handleSemesterSubjects(4)}
                className={activeColor === 4 ? "active" : ""}
              >
                IV կիսամյակ
              </p>
              <p
                onClick={handleSemesterSubjects(5)}
                className={activeColor === 5 ? "active" : ""}
              >
                V կիսամյակ
              </p>
              <p
                onClick={handleSemesterSubjects(6)}
                className={activeColor === 6 ? "active" : ""}
              >
                VI կիսամյակ
              </p>
              <p
                onClick={handleSemesterSubjects(7)}
                className={activeColor === 7 ? "active" : ""}
              >
                VII կիսամյակ
              </p>
              <p
                onClick={handleSemesterSubjects(8)}
                className={activeColor === 8 ? "active" : ""}
              >
                VIII կիսամյակ
              </p>
            </>
          )}
          {lecturerId &&
            subjects.map(({ subjectId, subjectName }, index) => {
              return (
                <p
                  onClick={handleSubjectBooks(subjectId, index)}
                  key={index}
                  className={activeColor === index ? "active" : ""}
                >
                  {subjectName}
                </p>
              );
            })}
        </div>
        <div>
          {lecturerId &&
            books.map(({ title, subjectName, path, bookId, authorName }) => {
              return (
                <div className="booklist">
                  <Link to={`/book1/${bookId}`}>
                    <img src={book} alt={book} className="bookImg" />
                  </Link>
                  <div className="bookDescription">
                    <div className="title">
                      <p className="ptitle">{title}</p>
                    </div>
                    <p className="psubject">{subjectName}</p>
                    <p>{authorName}</p>
                    <div className="buttons">
                      {path && (
                        <button className="bookButton leftButton">
                          <a
                            href="https://libbook.s3.eu-north-1.amazonaws.com/Khndragirq.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Էլ․ տարբերակ
                          </a>
                        </button>
                      )}
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
        {studentId && (
          <div className="subjects">
            <h2>
              {(() => {
                switch (currentSemester) {
                  case 1:
                    return "I կիսամյակ";
                  case 2:
                    return "II կիսամյակ";
                  case 3:
                    return "III կիսամյակ";
                  case 4:
                    return "IV կիսամյակ";
                  case 5:
                    return "V կիսամյակ";
                  case 6:
                    return "VI կիսամյակ";
                  case 7:
                    return "VII կիսամյակ";
                  case 8:
                    return "VIII կիսամյակ";
                  default:
                    return "Something wrong";
                }
              })()}
            </h2>
            {subjects.map(({ subjectId, subjectName }) => {
              return (
                <Link to={`/subjectBooks/${subjectId}`}>
                  <div
                    className="subjectsElement"
                    onClick={handleSubjectBooks(subjectId)}
                  >
                    <img src={subject} alt={subject} />
                    <div className="subjectName">
                      <p>{subjectName}</p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}

export default User;
