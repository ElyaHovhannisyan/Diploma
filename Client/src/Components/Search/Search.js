import Navbar from "../Navbar/Navbar";
import "./Search.css";
import book from "../../img/book.png";
import useBookApi from "../../Services/useBookApi";
import useCartApi from "../../Services/useCartApi";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useSearchApi from "../../Services/useSearchApi";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

function Search() {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const { bookSearch } = useSearchApi();
  const [books, setBooks] = useState([]);
  const { putBook } = useBookApi();
  const { addCart } = useCartApi();
  const token = JSON.parse(localStorage.getItem("me"))?.token;
  useEffect(() => {
    setBooks([]);
  }, []);
  const onSubmit = (data) => {
    bookSearch(token, data).then(
      (response) => {
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
          setBooks(
            response.data.map((item) => {
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
        }
      },
      (error) => {
        console.log(error.response.data.message);
      }
    );
  };
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
      <Navbar />
      <div className="searchBody">
        {!books.length ? (
          <form
            className="transparent searchForm"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="form-inner">
              <label htmlFor="title">Վերնագիր</label>
              <input type="text" id="title" {...register("title")} />

              <label htmlFor="author">Հեղինակ</label>
              <input
                type="text"
                id="author"
                placeholder="Ազգանուն Ա․ Հ․"
                {...register("author")}
              />

              <label htmlFor="subject">Առարկա</label>
              <input type="text" id="subject" {...register("subject")} />

              <label htmlFor="year">Տարեթիվ</label>
              <input type="text" id="year" {...register("year")} />

              <input type="submit" value="Որոնել" />
            </div>
          </form>
        ) : (
          books.map(({ title, subjectName, path, bookId, authorName }) => {
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
          })
        )}
      </div>
    </>
  );
}

export default Search;
