import { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axiosInstance from "../axiosInstance";
import { StoreContext } from "../context/StoreContext";

function Report() {
  const [sellReq, setSellReq] = useState([]);
  const [sellDel, setSellDel] = useState([]);
  const [donateReq, setSonateReq] = useState([]);
  const [donateAprv, setDonateAprv] = useState([]);
  const { url } = useContext(StoreContext);

  const fetchAllData = async () => {
    const newurl = url + "getAllRequestedOrder";
    const response = await axiosInstance.get(newurl);
    if (response.status == 200) {
      setSellReq(response.data.data);
    }

    const newurl2 = url + "getAllDeliverOrder";
    const response2 = await axiosInstance.get(newurl2);
    if (response2.status == 200) {
      setSellDel(response2.data.data);
    }

    const newurl3 = url + "getAllDonatedRequest";
    const response3 = await axiosInstance.get(newurl3);
    if (response3.status == 200) {
      setSonateReq(response3.data.data);
    }

    const newurl4 = url + "getAllDonated";
    const response4 = await axiosInstance.get(newurl4);
    if (response4.status == 200) {
      setDonateAprv(response4.data.data);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow overflow-y-auto mt-[68px] pb-10">
        <div className="grid w-full place-items-center align-start pt-2">
          <div className="hero-content flex flex-col max-w-5xl bg-white rounded-md p-8 w-full mx-4 lg:mx-0 shadow-2xl">
            <div className="grid grid-cols-[1fr_1.5fr_1fr_1fr_1fr_auto] gap-4 items-center text-sm md:text-base font-bold w-full">
              <p className="text-center">index</p>
              <p className="text-center">Sell(R)</p>
              <p className="text-center">Sell(D)</p>
              <p className="text-center">Donate(R)</p>
              <p className="text-center">Donate(D)</p>
            </div>
            <hr className="my-4 w-full" />
            <div className="grid grid-cols-[1fr_1.5fr_1fr_1fr_1fr_auto] gap-4 items-center text-sm md:text-base w-full">
              <p className="text-center">1</p>
              <p className="text-center">{sellReq.length}</p>
              <p className="text-center">{sellDel.length}</p>
              <p className="text-center">{donateReq.length}</p>
              <p className="text-center">{donateAprv.length}</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Report;
