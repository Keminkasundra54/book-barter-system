/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import axiosInstance from "../axiosInstance";
import { StoreContext } from "../context/StoreContext";
import Cards from "./Cards";
import Navbar from "./Navbar";
import Footer from "./Footer";

function UserBook() {
  const { url, token } = useContext(StoreContext);
  const [myBookData, setMyBookData] = useState([]);

  const fetchData = async () => {
    try {
      const newUrl = `${url}getUserSellBook`;
      const response = await axiosInstance.get(newUrl);
      if (response.status == 200) {
        setMyBookData(response.data.data);
      } else {
        setMyBookData([]);
      }
    } catch (err) {
      console.log("Error fetching books:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="mt-[90px] max-w-screen-2xl container mx-auto mb-12">
        <Cards
          bookData={myBookData}
          token={token}
          className="flex-grow overflow-y-auto"
        />
      </div>
      <Footer />
    </div>
  );
}

export default UserBook;
