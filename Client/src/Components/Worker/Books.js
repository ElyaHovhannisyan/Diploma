import add from "../../img/add.png";
import check from "../../img/check.png";
import WorkerNavbar from "../Navbar/WorkerNavbar";
import "./Book.css";

function Books() {
  return (
    <>
      <WorkerNavbar />
      <div className="bookBody">
        <div className="change">
          <div className="i">
            <img
              src={add}
              alt="add"
              // onClick={handleSearchClick}
            ></img>
          </div>
          <p>Ավելացնել</p>
        </div>
        <div className="change">
          <div className="i">
            <img
              src={check}
              alt="check"
              // onClick={handleSearchClick}
            ></img>
          </div>
          <p>Փոփոխել/Ջնջել</p>
        </div>
      </div>
    </>
  );
}

export default Books;
