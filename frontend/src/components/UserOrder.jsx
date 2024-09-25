/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { StoreContext } from "../context/StoreContext";
import axiosInstance from "../axiosInstance";
import { useNavigate } from "react-router-dom";
import { FaBoxOpen } from "react-icons/fa";

function UserOrder() {
  const [orderData, setOrderData] = useState([]);
  const { url } = useContext(StoreContext);

  const fetchOrderData = async () => {
    const newurl = url + "getUserOrder";
    const response = await axiosInstance.get(newurl);
    if (response.status == 200) {
      setOrderData(response.data.data);
    }
  };
  useEffect(() => {
    fetchOrderData();
  }, []);

  const navigate = useNavigate();

  const handleViewClick = (orderId) => {
    navigate(`/order-details/${orderId}`);
  };
  return (
    <div className="flex flex-col min-h-screen ">
      <Navbar />
      <div className="flex-grow overflow-y-auto mt-[68px] pb-10 ">
        <div className="grid w-full place-items-center align-start pt-2">
          {orderData != null && orderData.length > 0 ? (
            <>
              <div className="hero-content flex flex-col max-w-5xl bg-white rounded-md p-8 w-full mx-4 lg:mx-0 shadow-2xl">
                <div className="grid grid-cols-[1fr_1.5fr_1fr_1fr_1fr_auto] gap-4 items-center text-sm md:text-base font-bold w-full">
                  <p className="text-center">Order</p>
                  <p className="text-center">Date</p>
                  <p className="text-center">Status</p>
                  <p className="text-center">Total</p>
                  <p className="text-center">Items</p>
                  <p className="text-right pr-5">View</p>
                </div>
                <hr className="my-4 w-full" />

                {orderData.length > 0 && (
                  <>
                    {orderData.map((item, index) => (
                      <div
                        key={index}
                        className="grid grid-cols-[1fr_1.5fr_1fr_1fr_1fr_auto] gap-4 items-center text-sm md:text-base w-full"
                      >
                        <p className="text-center"> 00{item.orderNo}</p>
                        <p className="text-center">
                          {`
                          ${String(new Date(item.createdAt).getDate()).padStart(
                            2,
                            "0"
                          )}-${String(
                            new Date(item.createdAt).getMonth() + 1
                          ).padStart(2, "0")}-${new Date().getFullYear()}
                          `}
                        </p>
                        <p className="text-center">{item.status}</p>
                        <p className="text-center">{(item.totalAmount).toFixed(2)}</p>
                        <p className="text-center">{item.items.length} items</p>
                        <button
                          className="btn btn-link text-right pr-5"
                          onClick={() => handleViewClick(item._id)}
                        >
                          View
                        </button>
                      </div>
                    ))}
                  </>
                )}
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center absolute top-1/3 left-[46%]">
              <h4 className="">You Have No Any Order</h4>{" "}
              <FaBoxOpen className="w-10" />
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default UserOrder;
