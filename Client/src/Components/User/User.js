import Navbar from "../Navbar/Navbar";
import book from "../../img/book.png";
import { Link } from "react-router-dom";
import "./User.css";

function User() {
  return (
    <>
      <Navbar></Navbar>
      <div className="booklist">
        <Link to={`/book/id`}>
          <img src={book} alt={book} className="bookImg" />
        </Link>
        <p className="ptitle">title</p>
        <p className="psubject">Subject</p>
        <p>Download PDF</p>
        <button className="buttonclass">Պատվիրել</button>
      </div>
    </>
  );
}

export default User;
