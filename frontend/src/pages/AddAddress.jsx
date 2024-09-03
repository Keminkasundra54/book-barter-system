import { useContext, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { StoreContext } from "../context/StoreContext";
import axiosInstance from "../axiosInstance";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function AddAddress() {
  const [isDisabled, setIsDisabled] = useState(true);
  const navigate = useNavigate();
  const userdata = JSON.parse(localStorage.getItem("userdata"));
  let totalBill = Number(localStorage.getItem("totalBill"));
  const { url, cartData, fetchCart, setlogin } = useContext(StoreContext);
  const [address, setAddress] = useState(
    `${userdata.street}, ${userdata.city}, ${userdata.state}, ${userdata.zip}, ${userdata.country}`
  );

  const handleToggleTextarea = () => {
    setIsDisabled((prevState) => !prevState); // Toggle the disabled state
  };

  const handleChange = (e) => {
    setAddress(e.target.value); // Update state with new textarea value
  };

  const handleOrder = async () => {
    const newurl = url + "addOrder";
    const obj = {
      address: address,
      cartData: cartData,
      totalAmount: totalBill + 10,
    };
    const response = await axiosInstance.post(newurl, obj);
    if (response.status == 200) {
      toast.success("your Order Add Sucessfully", { autoClose: 1500 });
      setTimeout(() => {
        navigate("/");
        fetchCart();
      }, 1500);
    } else {
      toast.error("error");
    }
  };

  return (
    <>
      <Navbar setlogin={setlogin} />
      <div className="max-w-screen-2xl container mx-auto lg:px-10 md:flex-row items-center my-20">
        <div className="flex-grow flex items-center justify-center pt-8">
          <div className="max-w-screen-2xl container mx-auto px-4 md:px-20 my-10 w-full">
            <div className="max-w-lg bg-white rounded-md p-8 shadow-2xl space-y-4 mx-auto">
              <div className="bill">
                Your Total Bill Is{" "}
                {totalBill != 0 ? totalBill + 10 : totalBill + 0}{" "}
              </div>
              <hr></hr>
              <div className="w-full flex">
                <div className="main-address py-3 left-cart w-1/2 pr-3">
                  <h3 className="font-bold pl-3 pb-3">Billing deatils</h3>

                  <div className="address w-full ">
                    <textarea
                      className={`w-full h-24 p-4 border-gray-300 border-2 rounded-2xl ${
                        isDisabled
                          ? "bg-gray-100 cursor-not-allowed"
                          : "bg-white"
                      }`}
                      rows="3"
                      name="address"
                      value={address} // Controlled value
                      onChange={handleChange} // Update state on change
                      disabled={isDisabled} // Disable based on state
                    ></textarea>
                  </div>
                </div>
                <div className="title right-cart py-3 pl-3 w-1/2">
                  <div className="right-top pb-3">
                    <h3 className="font-bold pb-3">Order Summary</h3>
                    <div className="flex justify-between pb-1">
                      <p>Order Total </p>
                      <p>Rs. {totalBill}</p>
                    </div>
                    <div className="flex justify-between">
                      <p>Delivery Charges</p>
                      <p>Rs. {totalBill != 0 ? 10 : 0}</p>
                    </div>
                  </div>
                  <hr className="pb-3"></hr>
                  <div className="right- flex justify-between">
                    <p>Total Payable</p>
                    <p>Rs. {totalBill != 0 ? totalBill + 10 : totalBill + 0}</p>
                  </div>
                </div>
              </div>
              <div className="btns flex justify-between gap-2">
                <button
                  className="px-4 py-2 btn btn-success"
                  onClick={handleToggleTextarea}
                >
                  {isDisabled ? "Change Address" : "Confirm Address"}
                </button>
                <div className="btn btn-success" onClick={handleOrder}>
                  checkout
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default AddAddress;
