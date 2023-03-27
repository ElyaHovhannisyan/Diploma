import Navbar from "../Navbar/Navbar";
import book from "../../img/book.png";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import useBookApi from "../../Services/useBookApi";
import useCartApi from "../../Services/useCartApi";
import useSubjectApi from "../../Services/useSubjectApi";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function Subject() {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [activeColor, setActiveColor] = useState("");
  const { getBooksBySubjectId, putBook } = useBookApi();
  const { addCart } = useCartApi();
  const { getAllSubjects } = useSubjectApi();
  const token = JSON.parse(localStorage.getItem("me"))?.token;

  useEffect(() => {
    getAllSubjects(token)
      .then((res) => {
        const subjects = res.data.map((item) => {
          const subjectId = item.id;
          const subjectName = item.name;
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
          {subjects.map(({ subjectId, subjectName }, index) => {
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
          {books.map(({ title, subjectName, path, bookId, authorsName }) => {
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

export default Subject;
