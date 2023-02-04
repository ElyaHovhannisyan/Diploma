import Home from "./Components/Home/Home";
import Login from "./Components/Login/Login";
import Footer from "./Components/Footer/Footer";
import Header from "./Components/Header/Header";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import SIGN_UP from "./Components/Sign_up/Sign_up";
import Search from "./Components/Search/Search";
function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route exact path={"/"} element={<Home />} />
        <Route exact path={"/home"} element={<Home />} />
        <Route exact path={"/login"} element={<Login />} />
        <Route exact path={"/sign_up"} element={<SIGN_UP />} />
        <Route exact path={"/search"} element={<Search />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
