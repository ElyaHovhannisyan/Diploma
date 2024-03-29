import Home from "./Components/Home/Home";
import Login from "./Components/Login/Login";
import Footer from "./Components/Footer/Footer";
import Header from "./Components/Header/Header";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Register from "./Components/Register/Register";
import Search from "./Components/Search/Search";
import User from "./Components/User/User";
import Cart from "./Components/Cart/StLecCart";
import BookDetail from "./Components/BookDetails/BookDetail";
import Worker from "./Components/Worker/Worker";
import "./App.css";
import Subject from "./Components/Subject/Subject";
import Orders from "./Components/Worker/Orders";
import Order from "./Components/User/Order";
import StudentBooks from "./Components/User/StudentBooks";
import Deliever from "./Components/User/Deliever";
import Fine from "./Components/User/Fine";
import Fines from "./Components/Worker/Fines";
import Books from "./Components/Worker/Books";
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
        <Route exact path={"/cart"} element={<Cart />} />
        <Route
          exact
          path={"/book1/:id/"}
          element={<BookDetail text="Պատվիրել" />}
        />
        <Route
          exact
          path={"/book2/:id/"}
          element={<BookDetail text="Չեղարկել" />}
        />
        <Route
          exact
          path={"/subjectBooks/:subjectId"}
          element={<StudentBooks />}
        />
        <Route exact path={"/worker"} element={<Worker />} />
        <Route exact path={"/orders"} element={<Orders />} />
        <Route exact path={"/order"} element={<Order />} />
        <Route exact path={"/fine"} element={<Fine />} />
        <Route exact path={"/fines"} element={<Fines />} />
        <Route exact path={"/delievered"} element={<Deliever />} />
        <Route exact path={"/subjects"} element={<Subject />} />
        <Route exact path={"/bookChange"} element={<Books />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
