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
                  return {
                    title,
                    subjectName,
                    bookId,
                    path,
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
      getBooksBySubjectId(token, id).then((res) => {
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
            return { title, subjectName, bookId, path, authorsName };
          })
        );
      });
    };
  }
  function handleSemesterSubjects(semester) {
    return function () {
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
              <p onClick={handleSemesterSubjects(1)}>I կիսամյակ</p>
              <p onClick={handleSemesterSubjects(2)}>II կիսամյակ</p>
              <p onClick={handleSemesterSubjects(3)}>III կիսամյակ</p>
              <p onClick={handleSemesterSubjects(4)}>IV կիսամյակ</p>
              <p onClick={handleSemesterSubjects(5)}>V կիսամյակ</p>
              <p onClick={handleSemesterSubjects(6)}>VI կիսամյակ</p>
              <p onClick={handleSemesterSubjects(7)}>VII կիսամյակ</p>
              <p onClick={handleSemesterSubjects(8)}>VIII կիսամյակ</p>
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
          {lecturerId &&
            books.map(({ title, subjectName, path, bookId, authorsName }) => {
              return (
                <div className="booklist">
                  <Link to={`/book1/${bookId}`}>
                    <img src={book} alt={book} className="bookImg" />
                  </Link>
                  <div className="bookDescription">
                    <p className="ptitle">{title}</p>
                    <p className="psubject">{subjectName}</p>
                    {authorsName.map((item) => {
                      return <p>{item}</p>;
                    })}
                    <div className="buttons">
                      {path && (
                        <button className="bookButton">
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
                }
              })()}
            </h2>
            {subjects.map(({ subjectId, subjectName }) => {
              return (
                <Link to={`/subjectBooks/${subjectId}`}>
                  <div className="subjectsElement">
                    <img src={subject} alt={subject} />
                    <p onClick={handleSubjectBooks(subjectId)}>{subjectName}</p>
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
