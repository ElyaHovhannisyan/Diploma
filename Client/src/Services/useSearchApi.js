import axios from "axios";
const useSearchApi = () => {
  const url = "/api/search";

  const bookSearch = async (token, data) => {
    const title = data.title.trim();
    const date = data.year.trim();
    const subjectName = data.subject.trim();
    const authorName = data.author.trim();
    if (!title && !date && !subjectName && !authorName) {
      return { data: { message: "Դաշտերից գոնե մեկը անհրաժեշտ է լրացնել" } };
    }
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    return axios.post(
      url + "/book",
      { title, date, subjectName, authorName },
      {
        headers: headers,
      }
    );
  };
  const cartSearch = async (token, username) => {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    return axios.post(url + "/cart", username, {
      headers: headers,
    });
  };

  const orderSearch = async (token, username) => {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    return axios.post(url + "/order", username, {
      headers: headers,
    });
  };

  return {
    bookSearch,
    cartSearch,
    orderSearch,
  };
};

export default useSearchApi;
