/* eslint-disable react/prop-types */
import axios from "axios";
import { createContext, useEffect, useState } from "react";
import axiosInstance from "../axiosInstance";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [login, setlogin] = useState(false);
  const url = "http://192.168.1.10:5000/";
  const [user, setuser] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    street: "",
    city: "",
    gender: "",
    state: "",
    country: "",
    zip: "",
    token: "",
    role: "",
    profile: "",
    phone: "",
  });
  const [role, setrole] = useState(null);
  const [token, setToken] = useState({});
  const [category, setcategory] = useState("All");
  const [categoryData, setCategoryData] = useState([]);
  const [bookData, setBookData] = useState([]);
  const [bookItem, setBookItem] = useState({});
  const [categoryItem, setCategryItem] = useState({});
  const [cartData, setCartData] = useState({});
  const [totalBil, setTotalBil] = useState(0);
  const [requestedBookData, setRequestedBookData] = useState([]);
  const [requestedBook, setRequestedBook] = useState({});
  const [requestedBookId, setRequestedBookId] = useState({});

  const fetchCategoryMenu = async () => {
    const response = await axios.get(url + "getAllCategory");
    if (response.status == 200) {
      setCategoryData(response.data.data);
    } else {
      console.log("some error for category get");
    }
  };

  const fetchBookdata = async () => {
    const response = await axios.get(url + "bookData");
    if (response.status == 200) {
      setBookData(response.data.data);
    } else {
      console.log("some error for category get");
    }
  };

  const fetchCart = async () => {
    const newurl = url + "getUserCart";
    const response = await axiosInstance.get(newurl);
    if (response.status == 200) {
      setCartData(response.data.data);
    }
  };

  const fetchRequestedBook = async () => {
    const newurl = url + "getRequestedBook";
    const response = await axiosInstance.get(newurl);
    if (response.status == 200) {
      setRequestedBookData(response.data.data);
    }
  };

  const fetchOneBook = async (itemId) => {
    const myurl = url + "getOneBook";
    const obj = { bookId: itemId };
    const getbook = await axiosInstance.post(myurl, obj);
    if (getbook.status == 200) {
      const fetchedData = getbook.data.data;
      if (JSON.stringify(requestedBook) !== JSON.stringify(fetchedData)) {
        setRequestedBook(fetchedData);
      }
      const realQuantity = getbook.data.data.quantity;
      return realQuantity;
    }
  };

  useEffect(() => {
    async function loadData() {
      await fetchCategoryMenu();
      await fetchBookdata();
      await fetchCart();
      await fetchRequestedBook();
    }
    loadData();
  }, []);

  const contextvalue = {
    login,
    setlogin,
    url,
    user,
    setuser,
    category,
    setcategory,
    categoryData,
    bookData,
    role,
    setrole,
    bookItem,
    setBookItem,
    token,
    setToken,
    categoryItem,
    setCategryItem,
    cartData,
    setCartData,
    fetchCart,
    totalBil,
    setTotalBil,
    fetchOneBook,
    requestedBook,
    setRequestedBook,
    requestedBookData,
    setRequestedBookData,
    requestedBookId,
    setRequestedBookId,
    fetchBookdata,
  };

  return (
    <StoreContext.Provider value={contextvalue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
