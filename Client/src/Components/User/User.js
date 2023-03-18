import Navbar from "../Navbar/Navbar";
import book from "../../img/book.png";
import { Link } from "react-router-dom";
import "./User.css";

function User() {
  return (
    <>
      <Navbar></Navbar>
      <div className="main">
        <div className="needslist">
          <p>I կիսամյակ</p>
          <p>II կիսամյակ</p>
          <p>III կիսամյակ</p>
          <p>IV կիսամյակ</p>
          <p>V կիսամյակ</p>
          <p>VI կիսամյակ</p>
          <p>VII կիսամյակ</p>
          <p>VIII կիսամյակ</p>
        </div>
        <div>
          <div className="booklist">
            <Link to={`/book/id`}>
              <img src={book} alt={book} className="bookImg" />
            </Link>
            <div className="bookDescription">
              <p className="ptitle">title</p>
              <p className="psubject">Subject</p>
              <p>Authors</p>
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
        </div>
      </div>
    </>
  );
}

export default User;
