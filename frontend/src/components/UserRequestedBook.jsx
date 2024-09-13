/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import axiosInstance from "../axiosInstance";
import { StoreContext } from "../context/StoreContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FaBoxOpen } from "react-icons/fa";

function UserRequestedBook() {
  const [orderData, setOrderData] = useState([]);
  const { url } = useContext(StoreContext);

  const fetchOrderData = async () => {
    const newurl = url + "getRequestedBook";
    const response = await axiosInstance.get(newurl);
    if (response.status == 200) {
      console.log(response.data.data);
      setOrderData(response.data.data);
    }
  };
  useEffect(() => {
    fetchOrderData();
  }, []);

  return (
    <div className="flex flex-col min-h-screen ">
      <Navbar />
      <div className="flex-grow overflow-y-auto mt-[68px] pb-10 ">
        <div className="grid w-full place-items-center align-start pt-2">
          {orderData != null && orderData.length > 0 ? (
            <>
              <div className="hero-content flex flex-col max-w-5xl bg-white rounded-md p-8 w-full mx-4 lg:mx-0 shadow-2xl">
                <div className="grid grid-cols-[1fr_1.5fr_1fr__1.5fr_1fr_auto] gap-4 items-center text-sm md:text-base font-bold w-full">
                  <p className="text-center">Order No</p>
                  <p className="text-center">Item</p>
                  <p className="text-center">Book Name</p>
                  <p className="text-center">Description</p>
                  <p className="text-center">Date</p>
                  <p className="text-center">Status</p>
                </div>
                <hr className="my-4 w-full" />

                {orderData.length > 0 && (
                  <>
                    {orderData.map((item, index) => (
                      <div
                        key={index}
                        className="grid grid-cols-[1fr_1.5fr_1fr_1.5fr_1fr_auto] gap-4 items-center text-sm md:text-base w-full"
                      >
                        <p className="text-center"> 00{item.orderNo}</p>
                        <div className="flex justify-center items-center h-full">
                          <img
                            className="w-32 h-28"
                            src={url + item.book.images[0]}
                            alt="Book"
                          />
                        </div>
                        <p className="text-center"> {item.book.title}</p>
                        <p className="text-center"> {item.description}</p>

                        <p className="text-center">
                          {`
                              ${String(
                                new Date(item.createdAt).getDate()
                              ).padStart(2, "0")}-${String(
                            new Date(item.createdAt).getMonth() + 1
                          ).padStart(2, "0")}-${new Date().getFullYear()}
                              `}
                        </p>
                        <p className="text-center">{item.status}</p>
                      </div>
                    ))}
                  </>
                )}
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center absolute top-1/3 left-[46%]">
              <h4 className="">You Have No Any Book In Request</h4>{" "}
              <FaBoxOpen className="w-10" />
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default UserRequestedBook;
