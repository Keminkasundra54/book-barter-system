/* eslint-disable react/prop-types */
import axios from "axios";
import { createContext, useEffect, useState } from "react";
import axiosInstance from "../axiosInstance";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [login, setlogin] = useState(false);
  const url = "http://192.168.1.8:4000/";
  const [user, setuser] = useState({});
  const [role, setrole] = useState(null);
  const [token, setToken] = useState({});
  const [category, setcategory] = useState("All");
  const [categoryData, setCategoryData] = useState([]);
  const [bookData, setBookData] = useState([]);
  const [bookItem, setBookItem] = useState({});
  const [categoryItem, setCategryItem] = useState({});
  const [cartData, setCartData] = useState({});
  const [totalBil, setTotalBil] = useState(0);

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

  const fetchOneBook = async (itemId) => {
    const myurl = url + "getOneBook";
    const obj = { bookId: itemId };
    const getbook = await axiosInstance.post(myurl, obj);
    if (getbook.status == 200) {
      const realQuantity = getbook.data.data.quantity;
      return realQuantity;
    }
  };

  useEffect(() => {
    async function loadData() {
      await fetchCategoryMenu();
      await fetchBookdata();
      await fetchCart();
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
  };

  return (
    <StoreContext.Provider value={contextvalue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
