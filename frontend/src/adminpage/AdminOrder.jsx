/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { StoreContext } from "../context/StoreContext";
import axiosInstance from "../axiosInstance";
import "../index.css";
import { useRef } from "react";
import Loader from "react-js-loader";

function AdminOrder() {
  const [orderData, setOrderData] = useState([]);
  const detailsRef = useRef(null);
  const detailsRef2 = useRef(null);
  const { url } = useContext(StoreContext);
  const [month, setMonth] = useState(null);
  const [year, setYear] = useState(null);
  const [loader, setloader] = useState(false);

  const handleMonthClick = (month) => {
    setloader(true);
    setTimeout(() => {
      setloader(false);
    }, 1000);

    if (detailsRef.current) {
      detailsRef.current.open = false; // Close the <details> element
    }
    setMonth(month);
  };

  const handleYearClick = (year) => {
    setloader(true);
    setTimeout(() => {
      setloader(false);
    }, 1000);
    if (detailsRef2.current) {
      detailsRef2.current.open = false; // Close the <details> element
    }
    setYear(year);
  };

  const handleStatus = async (e, itemid) => {
    const newurl = url + "updateOrder";
    const obj = {
      orderId: itemid,
      status: e.target.value,
    };
    const response = await axiosInstance.post(newurl, obj);
    if (response.status == 200) {
      fetchOrderData();
    }
  };

  const handleSellerStatus = async (e, itemId) => {
    const newurl = url + "updateSellerStatus";
    const obj = {
      sellerOrderId: itemId,
      status: e.target.value,
    };
    const response = await axiosInstance.post(newurl, obj);
    if (response.status == 200) {
      fetchOrderData();
    }
  };

  const getDate = async () => {
    const date = new Date();
    const month = date.getMonth();
    const year = date.getFullYear();
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const monthName = monthNames[month];
    setMonth(monthName);
    setYear(year);
  };

  useEffect(() => {
    getDate();
    detailsRef.current.open = false;
    detailsRef2.current.open = false;
    fetchOrderData();
  }, []);

  useEffect(() => {
    fetchOrderData();
  }, [year, month]);

  const fetchOrderData = async () => {
    const newurl = url + "getAllOrderData";
    const obj = {
      month: month,
      year: year,
    };
    const response = await axiosInstance.post(newurl, obj);
    if (response.status == 200) {
      setOrderData(response.data.data);
    }
  };

  return (
    <div>
      <div className="flex flex-col min-h-screen ">
        <Navbar />
        <div className="flex-grow overflow-y-auto mt-[68px] pb-10 ">
          <div className="grid w-full place-items-center align-start pt-2">
            <div className="absolute top-[73px] right-1/4 z-30 bg-slate-300  border-[1px] border-black">
              <ul className="max-h-36 overflow-y-scroll w-29 border rounded scrollbar-hide">
                <li key="1">
                  <details ref={detailsRef} className="overflow-hidden" open>
                    <summary className="border-b-2 w-full cursor-pointer bg-gray-100 py-2 px-4 sticky top-0">
                      {month}
                    </summary>
                    <ul className="pt-1 max-h-24 overflow-y-scroll px-4">
                      {[
                        "January",
                        "February",
                        "March",
                        "May",
                        "June",
                        "July",
                        "August",
                        "September",
                        "October",
                        "November",
                        "December",
                      ].map((month, index) => (
                        <li key={index} className="py-1">
                          <a
                            href="#"
                            className="block text-sm hover:text-blue-500"
                            onClick={() => handleMonthClick(month)}
                          >
                            {month}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </details>
                </li>
              </ul>
            </div>
            <div className="absolute top-[73px] right-[18%] z-30 bg-slate-300  border-[1px] border-black">
              <ul className="max-h-36 overflow-y-scroll w-28 border rounded scrollbar-hide">
                <li key="2">
                  <details ref={detailsRef2} className="overflow-hidden" open>
                    <summary className="border-b-2 w-full cursor-pointer bg-gray-100 py-2 px-4">
                      {year}
                    </summary>
                    <ul className="pt-1 max-h-24 overflow-y-scroll px-4">
                      {[
                        "2014",
                        "2015",
                        "2016",
                        "2017",
                        "2018",
                        "2019",
                        "2020",
                        "2021",
                        "2022",
                        "2023",
                        "2024",
                      ].map((year, index) => (
                        <li key={index} className="py-1">
                          <a
                            href="#"
                            className="block text-sm hover:text-blue-500"
                            onClick={() => handleYearClick(year)}
                          >
                            {year}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </details>
                </li>
              </ul>
            </div>
            {loader ? (
              <div className="container mx-auto px-4  md:flex md:space-x-10 w-full absolute top-1/3 left-1/2">
                <div className="">
                  <Loader
                    type="puff"
                    bgColor={"#8f9193"}
                    color={"white"}
                    height={100}
                    width={100}
                  />
                </div>
              </div>
            ) : (
              <>
                {orderData && orderData.length > 0 ? (
                  <div className="hero-content flex flex-col w-full bg-white max-h-screen rounded-md p-8 mt-[42px] mx-4 lg:mx-0 shadow-2xl">
                    {orderData.map((item) => (
                      <>
                        <div className="border-2 border-[darkkhaki] font-black w-full">
                          <div className="top flex justify-between p-2 bg-slate-300">
                            <div className="top-right">
                              <div className="pb-2">
                                Order No : #00{item.orderNo}
                              </div>
                              <div className="">
                                Order Date:{" "}
                                {`
                          ${String(new Date(item.createdAt).getDate()).padStart(
                            2,
                            "0"
                          )}-${String(
                                  new Date(item.createdAt).getMonth() + 1
                                ).padStart(2, "0")}-${new Date().getFullYear()}
                          `}
                              </div>
                            </div>
                            <div className="form-control flex-row items-center">
                              <label className="label">
                                <span className="label-text">Order Status</span>
                              </label>
                              <select
                                className="select select-bordered w-full text-sm min-h-9 h-9 text-gray-800"
                                name="status"
                                value={item.status || ""}
                                onChange={(e) => handleStatus(e, item._id)}
                              >
                                <option
                                  value=""
                                  disabled
                                  className="text-[#bebebe]"
                                >
                                  status
                                </option>
                                <option value="Requested">Requested</option>
                                <option value="Confirmed">Confirmed</option>
                                <option value="Shipped">Shipped</option>
                                <option value="Delevierd">Delevierd</option>
                              </select>
                            </div>
                          </div>
                          <div className="center flex rounded-sm p-2">
                            <div className="center-left pr-3 w-3/4">
                              <div className="pt-4 pb-3">Order Items</div>
                              <div className="bottom bg-slate-300 rounded-sm ">
                                <div className="grid bg-slate-700 p-3 text-white grid-cols-[1fr_1fr_1fr_1fr_1.5fr_1fr_auto] gap-4 items-center text-sm md:text-base font-bold w-full">
                                  <p className="text-center">book Name</p>
                                  <p className="text-center">quantity</p>
                                  <p className="text-center">seller Name</p>
                                  <p className="text-center">seller Phone</p>
                                  <p className="text-center">Address</p>
                                  <p className="text-center">status</p>
                                </div>

                                {item.items.map((sellerData) => (
                                  <>
                                    <div className="border-b-2 p-2">
                                      <div className="grid grid-cols-[1fr_1fr_1fr_1fr_1.5fr_1.3fr_auto] gap-4 items-center text-sm md:text-base font-bold w-full">
                                        <p className="text-center">
                                          {" "}
                                          {sellerData.book.title}
                                        </p>
                                        <p className="text-center">
                                          {sellerData.quantity}
                                        </p>
                                        <p className="text-center">
                                          {" "}
                                          {sellerData.seller.firstname}{" "}
                                          {sellerData.seller.lastname}
                                        </p>
                                        <p className="text-center">
                                          {sellerData.seller.phone}
                                        </p>
                                        <p className="text-center">
                                          {sellerData.seller.city},{" "}
                                          {sellerData.seller.street},{" "}
                                          {sellerData.seller.state},{" "}
                                          {sellerData.seller.zip},{" "}
                                          {sellerData.seller.country}
                                        </p>
                                        <p className="text-center">
                                          <select
                                            className="select select-bordered w-full text-sm min-h-9 h-9 text-gray-800"
                                            name="status"
                                            value={sellerData.status || ""}
                                            onChange={(e) =>
                                              handleSellerStatus(
                                                e,
                                                sellerData._id
                                              )
                                            }
                                          >
                                            <option
                                              value=""
                                              disabled
                                              className="text-[#bebebe]"
                                            >
                                              status
                                            </option>
                                            <option value="Requested">
                                              Requested
                                            </option>
                                            <option value="Received">
                                              Received
                                            </option>
                                          </select>
                                        </p>
                                      </div>
                                    </div>
                                  </>
                                ))}
                              </div>
                            </div>
                            <div className="center-right pl-3 w-1/4">
                              <div className="pt-4">user Details</div>
                              <div className="space-y-2 rounded-lg w-full text-gray-500 pt-3">
                                <div className="flex items-center">
                                  <span className="w-40">User Name:</span>
                                  <span className="font-thin">
                                    {item.userId.firstname}{" "}
                                    {item.userId.lastname}
                                  </span>
                                </div>
                                <div className="flex items-center">
                                  <span className="font-semibold  w-40">
                                    Phone:
                                  </span>
                                  <span className="font-thin">
                                    {item.userId.phone}
                                  </span>
                                </div>
                                <div className="flex items-center">
                                  <span className="font-semibold w-40">
                                    Payment Method:
                                  </span>
                                  <span className="font-thin">
                                    {item.paymentMethod}
                                  </span>
                                </div>
                                <div className="flex items-center">
                                  <span className="font-semibold w-40">
                                    Total Amount:
                                  </span>
                                  <span className="font-thin">
                                    {item.totalAmount}
                                  </span>
                                </div>
                                <div className="flex items-start">
                                  <span className="font-semibold w-40">
                                    Deliver To:
                                  </span>
                                  <span className="font-thin w-60">
                                    {item.address}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    ))}
                  </div>
                ) : (
                  <div className="absolute top-1/3">
                    <p>You Are Not Recive Any Order In This Month !</p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default AdminOrder;