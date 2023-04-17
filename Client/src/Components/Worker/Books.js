import add from "../../img/add.png";
import check from "../../img/check.png";
import WorkerNavbar from "../Navbar/WorkerNavbar";
function Books() {
  return (
    <>
      <WorkerNavbar />
      <div className="bookBody">
        <div className="Add">
          <img
            src={add}
            alt="add"
            // onClick={handleSearchClick}
          ></img>
          <p>Ավելացնել</p>
        </div>
        <div className="check">
          <img
            src={check}
            alt="check"
            // onClick={handleSearchClick}
          ></img>
          <p>Փոփոխել/Ջնջել</p>
        </div>
      </div>
    </>
  );
}

export default Books;
