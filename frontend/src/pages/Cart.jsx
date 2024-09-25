import { useContext } from "react";
import { StoreContext } from "../context/StoreContext";
import "../index.css";
import axiosInstance from "../axiosInstance";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { toast } from "react-toastify";
import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";
import { Link } from "react-router-dom";
import { FaBoxOpen } from "react-icons/fa6";

function Cart() {
  const { url, bookData, cartData, fetchCart, setTotalBil, fetchOneBook } =
    useContext(StoreContext);
  const handleRemove = async (cartId) => {
    const newurl = url + "removeCart";
    const data = { _id: cartId };
    const response = await axiosInstance.post(newurl, data);
    if (response.status == 200) {
      toast.success("Book Remove From Cart", { autoClose: 1500 });
      setTimeout(() => {
        fetchCart();
      }, 1500);
    } else {
      toast.error("Something get wrong", { autoClose: 1500 });
    }
  };

  const handleplus = async (cartId, qty, itemId) => {
    let realQuantity = await fetchOneBook(itemId);
    if (qty < realQuantity) {
      const obj = {
        cartId: cartId,
        qty: qty + 1,
      };
      const newurl = url + "updateCart";
      const response = await axiosInstance.post(newurl, obj);
      if (response) {
        fetchCart();
      }
    } else {
      toast.error(`Oops! We have only ${realQuantity} Product left.`, {
        autoClose: 1500,
      });
    }
  };

  const handleminus = async (cartId, qty) => {
    if (qty > 1) {
      const obj = {
        cartId: cartId,
        qty: qty - 1,
      };
      const newurl = url + "updateCart";
      const response = await axiosInstance.post(newurl, obj);
      if (response) {
        fetchCart();
      } else {
        console.log("err at update Quantity");
      }
    }
  };

  const gettotal = () => {
    let totalAmount = 0;
    for (let i in cartData) {
      let itemInfo = bookData.find(
        (product) => product._id == cartData[i].book._id
      );
      totalAmount += itemInfo.price * cartData[i].quantity;
    }

    let formattedAmount = totalAmount.toFixed(2);
    setTotalBil(Number(formattedAmount));

    localStorage.setItem("totalBill", formattedAmount);
    return Number(formattedAmount);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow overflow-y-auto max-w-screen-2xl mt-[68px] container mx-auto md:px-20 my-10 h-full">
        <div className="py-8">
          {cartData.length ? (
            <>
              <div className="grid grid-cols-[1fr_1.5fr_1fr_1fr_1.5fr_auto_auto] gap-4 items-center text-sm md:text-base font-bold">
                <p>Items</p>
                <p>Title</p>
                <p>price</p>
                <p>Quantity</p>
                <p>Total</p>
                <p className="text-right pr-5">Remove</p>
              </div>
              <br />
              <hr className="my-4" />
              {cartData.map((item, index) => {
                return (
                  <>
                    <div key={index}>
                      <div className="grid grid-cols-[1fr_1.5fr_1fr_1fr_1.5fr_auto_auto] gap-4 items-center text-gray-500 my-4">
                        <img
                          src={url + item.book.images[0]}
                          alt=""
                          className="w-12 h-12"
                        />
                        <p className="text-black">{item.book.title}</p>
                        <p className="text-black">{item.book.price}</p>
                        <div className="text-black flex gap-1 items-center">
                          <CiCirclePlus
                            onClick={() =>
                              handleplus(item._id, item.quantity, item.book._id)
                            }
                            className="w-6 h-6 text-black"
                          />
                          <p>{item.quantity}</p>
                          <CiCircleMinus
                            className={`${
                              item.quantity <= 0 && "disabled"
                            } w-6 h-6 text-black`}
                            onClick={() => handleminus(item._id, item.quantity)}
                          />
                        </div>

                        <p className="text-black">
                          {item.book.price * item.quantity || item.book.price}
                        </p>
                        <p className="text-right">
                          <button
                            className="btn btn-primary"
                            onClick={() => handleRemove(item._id)}
                          >
                            Remove
                          </button>
                        </p>
                      </div>
                    </div>
                  </>
                );
              })}

              <div className="cart-bottom mx-[80px] flex justify-between gap-6 p-4">
                <div className="cart-total flex flex-1 flex-col gap-5 w-96">
                  <h2 className="font-semibold text-xl">Cart Total</h2>
                  <div>
                    <div className="cart-total-details flex justify-between text-gray-800 p-1">
                      <p>subtotal</p>
                      <p>{gettotal()}</p>
                    </div>
                    <hr />
                    <div className="cart-total-details flex justify-between text-gray-800 p-1">
                      <p>Delivery Fee</p>
                      <p>{gettotal() === 0 ? 0 : 10}</p>
                    </div>
                    <hr className="mb-10" />
                    <div className="cart-total-details flex justify-between text-gray-800 p-1">
                      <b>Total</b>
                      <b>
                        {gettotal() === 0 ? 0 : (gettotal() + 10).toFixed(2)}
                      </b>
                    </div>
                  </div>
                  {cartData.length && (
                    <div className="btn-class flex w-full justify-end">
                      <Link to="/addAddress">
                        <button className="btn btn-info max-w-max">Next</button>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center absolute top-1/3 left-[46%]">
              <h4 className="">Your Cart Is Empty</h4>{" "}
              <FaBoxOpen className="w-10" />
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Cart;
