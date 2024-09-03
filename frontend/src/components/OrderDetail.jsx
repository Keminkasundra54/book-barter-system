/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { TiArrowLeft } from "react-icons/ti";
import axiosInstance from "../axiosInstance";
import { StoreContext } from "../context/StoreContext";

function OrderDetail() {
  const { id } = useParams();
  const { url } = useContext(StoreContext);
  const [orderData, setOrderData] = useState({
    _id: "",
    totalAmount: "",
    paymentMethod: "",
    paymentStatus: "",
    orderNo: "",
    createdAt: "",
    address: "",
    status: "",
    items: [],
    trakingNO: "",
  });

  const fetchOrderDetail = async () => {
    const newurl = url + "getOrderDetail";
    const obj = { orderId: id };
    const response = await axiosInstance.post(newurl, obj);
    if (response.status == 200) {
      setOrderData({ ...response.data.data });
    }
  };
  let progress = 0;
  if (orderData.status == "Requested") {
    progress = 0;
  } else if (orderData.status == "Confirmed") {
    progress = 33;
  } else if (orderData.status == "Shipped") {
    progress = 67;
  } else if (orderData.status == "Delevierd") {
    progress = 100;
  }
  useEffect(() => {
    fetchOrderDetail();
  }, []);
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow flex items-center justify-center overflow-y-auto mt-[68px] pb-10">
        <div className="hero-content flex flex-col max-w-3xl bg-white rounded-md p-8 w-full mx-4 lg:mx-0 shadow-2xl">
          <Link to="/myorder" className="w-full">
            <div className="flex items-center justify-start">
              <span>
                <TiArrowLeft />
              </span>
              <p>Orders</p>
            </div>
          </Link>
          <div className="flex font-bold justify-start w-full text-xl">
            <h1>Order Details</h1>
            <p className="pl-2">#00{orderData.orderNo}</p>
          </div>
          <div className="w-full relative">
            <progress
              className="progress progress-success w-full"
              value={progress}
              max="100"
            ></progress>
            <div className="flex justify-between absolute top-1 w-full">
              <p className="badge badge-success badge-md">1</p>
              <p className="badge badge-success badge-md">2</p>
              <p className="badge badge-success badge-md">3</p>
              <p className="badge badge-success badge-md">4</p>
            </div>
            <div className="grid grid-cols-[1.3fr_1.5fr_1.3fr_auto] justify-between">
              <p>Requested</p>
              <p>Confirmed</p>
              <p>Shipped</p>
              <p>Delevierd</p>
            </div>
          </div>
          <div className="flex form-control mb-3 w-full flex-row gap-2">
            <div className="w-1/2">
              <label className="label">
                <span className="label-text">Courier Name</span>
              </label>
              <input
                type="text"
                placeholder="First Name"
                className="input input-bordered text-sm w-full h-9"
                name="firstname"
                value="Adora Express"
                readOnly
                required
              />
            </div>
            <div className="w-1/2">
              <label className="label">
                <span className="label-text">Traking Number</span>
              </label>
              <input
                type="text"
                placeholder="Last Name"
                className="input input-bordered text-sm w-full h-9"
                name="lastname"
                value={orderData.trakingNO}
                required
                readOnly
              />
            </div>
          </div>
          <div className="w-full">
            <h3 className="font-bold text-left pb-4">Item orderd</h3>
            <div className="p-3 bg-slate-200 rounded-md">
              <ul className="flex flex-col gap-4 w-full">
                {orderData.items.map((item, index) => (
                  <>
                    <li key={index} className="flex items-center gap-4 w-full">
                      <img
                        src={url + item.book.images[0]}
                        className="w-20 h-20 rounded-lg"
                        alt={item.book.title}
                      />
                      <span className="flex-1 min-w-[200px]">
                        {item.book.title}
                      </span>{" "}
                      <span className="flex-none w-20 text-center">
                        {item.quantity}x
                      </span>{" "}
                      <span className="flex-none w-28 text-center">
                        {item.book.price * item.quantity}
                      </span>{" "}
                    </li>
                    <hr className="w-full h-[2px] bg-slate-800"></hr>
                  </>
                ))}
              </ul>

              <div className="flex flex-col items-end w-52 gap-3 ml-auto py-4">
                <div className="flex justify-between w-full">
                  <span>Product Total</span>
                  <p>{orderData.totalAmount - 10}</p>
                </div>
                <div className="flex justify-between w-full">
                  <span>Shipping Cost</span>
                  <p>10</p>
                </div>
                <hr className="w-full h-[2px] bg-slate-800"></hr>
                <div className="flex justify-between w-full font-bold">
                  <span>Total</span>
                  <p>{orderData.totalAmount}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default OrderDetail;
