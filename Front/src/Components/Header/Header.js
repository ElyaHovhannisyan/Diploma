import logo from "../../img/polytechnic_logo.png";
import "./Header.css";
function Header() {
  return (
    <div className="header_container">
      <img src={logo} alt="logo" className="header_logo"></img>
      <h1>Հայաստանի ազգային պոլիտեխնիկական համալսարանի գրադարան</h1>
    </div>
  );
}
export default Header;
