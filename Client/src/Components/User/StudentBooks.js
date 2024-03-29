import Navbar from "../Navbar/Navbar";
import book from "../../img/book.png";
import { useState, useEffect } from "react";
import useBookApi from "../../Services/useBookApi";
import useCartApi from "../../Services/useCartApi";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

function StudentBooks() {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const { getBooksBySubjectId, putBook } = useBookApi();
  const { addCart } = useCartApi();
  const token = JSON.parse(localStorage.getItem("me"))?.token;
  const { subjectId } = useParams();
  useEffect(() => {
    getBooksBySubjectId(token, subjectId).then((res) => {
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
  }, []);

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
      <div className="body">
        {books.map(({ title, subjectName, path, bookId, authorName }) => {
          return (
            <div className="booklist">
              <Link to={`/book1/${bookId}`}>
                <img src={book} alt={book} className="bookImg" />
              </Link>
              <div className="bookDescription">
                <p className="ptitle">{title}</p>
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
    </>
  );
}

export default StudentBooks;
