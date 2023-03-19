import useCartApi from "../../Services/useCartApi";
import { useState, useEffect } from "react";
function Worker() {
  const [carts, setCarts] = useState([]);
  const { getAllCart } = useCartApi();
  const token = JSON.parse(localStorage.getItem("me"))?.token;
  useEffect(() => {
    getAllCart(token).then((res) => {
      setCarts(
        res.data.map((item) => {
          const { Book } = item;
          const { User } = item.Cart;
          const userId = item.Cart.UserId;
          const bookId = Book.id;
          const title = Book.title;
          const subjectName = Book.Subject.name;
          const name = User.StudentId ? User.Student.name : User.Lecturer.name;
          const surname = User.StudentId
            ? User.Student.surname
            : User.Lecturer.surname;
          return { title, subjectName, bookId, userId, name, surname };
        })
      );
    });
  }, []);
  console.log(carts);
  return (
    <>
      {carts.map(({ title, subjectName, bookId, userId, name, surname }) => {
        return (
          <p>
            {title} {subjectName} {name} {surname}
          </p>
        );
      })}
    </>
  );
}

export default Worker;
