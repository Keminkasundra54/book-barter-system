/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { StoreContext } from "../context/StoreContext";
import axiosInstance from "../axiosInstance";

function ReciveOrder() {
  const { url } = useContext(StoreContext);
  const [sellerData, setSellerData] = useState();

  const fetchSellerBook = async () => {
    const newurl = url + "getSellerOrder";
    const response = await axiosInstance.get(newurl);
    if (response.status == 200) {
      setSellerData(response.data.data);
    }
  };

  useEffect(() => {
    fetchSellerBook();
  }, []);

  return (
    <div className="flex flex-col min-h-screen ">
      <Navbar />
      <div className="flex-grow overflow-y-auto mt-[68px] pb-10 ">
        <div className="grid w-full place-items-center align-start pt-2">
          {sellerData && sellerData.length > 0 ? (
            <>
              <div className="hero-content flex flex-col max-w-5xl bg-white rounded-md p-8 w-full mx-4 lg:mx-0 shadow-2xl">
                <div className="grid grid-cols-[1fr_1.5fr_1fr_1fr_1fr_auto] gap-4 items-center text-sm md:text-base font-bold w-full">
                  <p className="text-center">Order</p>
                  <p className="text-center">Name</p>
                  <p className="text-center">Date</p>
                  <p className="text-center">Status</p>
                  <p className="text-center">Items</p>
                </div>
                <hr className="my-4 w-full" />
                {sellerData.map((item, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-[1fr_1.5fr_1fr_1fr_1fr_auto] gap-4 items-center text-sm md:text-base w-full"
                  >
                    <img
                      className="w-20 h-20 mx-auto"
                      src={url + item.book.images[0]}
                    ></img>
                    <p className="text-center">{item.book.title}</p>
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
                    <p className="text-center">{item.quantity} items</p>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center absolute top-1/3 left-[46%]">
              <h4 className="">You Have No Recive any Order!</h4>{" "}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ReciveOrder;
