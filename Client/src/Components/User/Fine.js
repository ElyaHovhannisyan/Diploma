import Navbar from "../Navbar/Navbar";
import book from "../../img/book.png";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import notice from "../../img/notice.png";
import useFineApi from "../../Services/useFineApi";

function Fine() {
  const [books, setBooks] = useState([]);
  const { getFine } = useFineApi();
  const token = JSON.parse(localStorage.getItem("me"))?.token;
  useEffect(() => {
    getFine(token).then((res) => {
      console.log(res);
      setBooks(
        res.data.map((item) => {
          const { Book } = item.Order;
          const bookId = Book.id;
          const title = Book.title;
          const subjectName = Book.Subject.name;
          return { title, subjectName, bookId };
        })
      ).then();
    });
  }, []);
  return (
    <>
      <Navbar></Navbar>
      <div className="body">
        {books.length > 0 ? (
          books.map(({ title, subjectName, bookId }) => {
            return (
              <div className="booklist">
                <Link to={`/book/${bookId}`}>
                  <img src={book} alt={book} className="bookImg" />
                </Link>
                <p className="ptitle">{title}</p>
                <p className="psubject">{subjectName}</p>
              </div>
            );
          })
        ) : (
          <div className="emptyOrderBg">
            <div className="emptyOrder">
              <img src={notice} alt="Empty fine notice" />
              <h3>Տուգանքներ չկան!</h3>
              <p>Դուք չունեք գրքեր, որոնք չեք հանձնել ժամանակին</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Fine;
