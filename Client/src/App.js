import Home from "./Components/Home/Home";
import Login from "./Components/Login/Login";
import Footer from "./Components/Footer/Footer";
import Header from "./Components/Header/Header";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Register from "./Components/Register/Register";
import Search from "./Components/Search/Search";
import User from "./Components/User/User";
function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route exact path={"/"} element={<Home />} />
        <Route exact path={"/home"} element={<Home />} />
        <Route exact path={"/login"} element={<Login />} />
        <Route exact path={"/register"} element={<Register />} />
        <Route exact path={"/search"} element={<Search />} />
        <Route exact path={"/user"} element={<User />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
