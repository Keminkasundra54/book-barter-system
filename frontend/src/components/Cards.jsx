/* eslint-disable react/prop-types */

import { useContext, useState } from "react";
import { StoreContext } from "../context/StoreContext";
import { Link, useNavigate } from "react-router-dom";
import "../index.css";
import axiosInstance from "../axiosInstance";
import { toast } from "react-toastify";
import { MdOutlineFavorite } from "react-icons/md";
import { MdFavoriteBorder } from "react-icons/md";

function Cards({ bookData, category, token, limited, showfour }) {
  const {
    setBookItem,
    url,
    cartData,
    fetchCart,
    fetchOneBook,
    setlogin,
    fetchBookdata,
  } = useContext(StoreContext);

  const navigate = useNavigate();
  const isuser = JSON.parse(localStorage.getItem("userdata"));
  const [currentIndexes, setCurrentIndexes] = useState({});
  const [like, setIsLike] = useState(true);

  const handleNext = (item, cardIndex) => {
    setCurrentIndexes((prevIndexes) => ({
      ...prevIndexes,
      [cardIndex]:
        (prevIndexes[cardIndex] ?? 0) + 1 >= item.images.length
          ? 0
          : (prevIndexes[cardIndex] ?? 0) + 1,
    }));
  };

  const setLike = async (itemId) => {
    setIsLike(!like);
    await handleLike(itemId);
  };

  const handleLike = async (itemId) => {
    try {
      const callapi = await isLiked(itemId);
      let newurl = callapi ? url + "disLikeBook" : url + "likeBook";
      const data = {
        bookId: itemId,
      };
      const res = await axiosInstance.post(newurl, data);
      if (res.status == 200) {
        fetchBookdata();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const addToCart = async (itemId, qty) => {
    if (isuser != null) {
      let realQuantity = await fetchOneBook(itemId);

      if (qty < realQuantity) {
        const newurl = url + "addToCart";
        const data = { bookId: itemId, quantity: qty };
        const response = await axiosInstance.post(newurl, data);
        if (response.status == 200) {
          toast.success("item add into cart", { autoClose: 1500 });
          setTimeout(() => {
            fetchCart();
          }, 1500);
        }
      } else {
        toast.error(`Oops! We currently have only ${realQuantity} left.`, {
          autoClose: 1500,
        });
      }
    } else {
      setlogin(true);
      navigate("/");
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  const handleRequest = async (itemId) => {
    navigate(`/AddRequestBook/${itemId}`);
  };

  const handlePrev = (item, cardIndex) => {
    setCurrentIndexes((prevIndexes) => ({
      ...prevIndexes,
      [cardIndex]:
        (prevIndexes[cardIndex] ?? 0) - 1 < 0
          ? item.images.length - 1
          : (prevIndexes[cardIndex] ?? 0) - 1,
    }));
  };

  const handleEditBook = async (item) => {
    setBookItem(item);
  };

  const isLiked = (itemid) => {
    if (isuser != null) {
      if (Array.isArray(bookData) && bookData.length > 0) {
        return bookData.some(
          (item) =>
            Array.isArray(item.likedBy) &&
            item.likedBy.some(
              (user) => user.userId === isuser._id && user.bookId === itemid
            )
        );
      }
    }

    return false;
  };

  const isInCart = (itemId) => {
    if (cartData.length >= 1) {
      return cartData.some((cartItem) => cartItem.book._id == itemId);
    }
  };

  const filteredBookData = category
    ? bookData.filter(
        (item) => category === "All" || category === item.category
      )
    : bookData;
  const booksForSell = filteredBookData.filter((book) => book.radio === "sell");
  const limitedBookData = limited ? booksForSell.slice(0, 4) : filteredBookData;

  return (
    <>
      {filteredBookData.length && limitedBookData.length ? (
        <div className="container mx-auto px-4  md:flex md:space-x-10">
          <div className={`book-display-section `}>
            <div
              className={`card-container ${
                limited || showfour
                  ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10"
                  : "md:grid md:grid-cols-3 justify-items-center md:gap-14"
              }`}
            >
              {limitedBookData.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="flex flex-col p-4 card card-compact bg-base-100 shadow-xl cursor-pointer hover:scale-105 hover:shadow-neutral-500 transition-transform duration-200"
                  >
                    <div className="relative w-full h-48 overflow-hidden">
                      <div
                        className="flex transition-transform duration-500 ease-in-out"
                        style={{
                          transform: `translateX(-${
                            (currentIndexes[index] ?? 0) * 100
                          }%)`,
                        }}
                      >
                        {item.images.map((imageUrl, idx) => (
                          <div
                            key={idx}
                            className="w-full h-full flex-shrink-0"
                          >
                            <img
                              src={url + imageUrl}
                              alt={`Book Image ${idx}`}
                              className="object-cover w-full h-full"
                            />
                          </div>
                        ))}
                      </div>
                      {item.images.length > 1 && (
                        <>
                          <button
                            onClick={() => handlePrev(item, index)}
                            className="absolute left-0 top-1/2 transform -translate-y-1/2 text-blue p-2 rounded-full"
                          >
                            &#10094;
                          </button>
                          <button
                            onClick={() => handleNext(item, index)}
                            className="absolute right-0 top-1/2 transform -translate-y-1/2 text-blue p-2 rounded-full"
                          >
                            &#10095;
                          </button>
                        </>
                      )}
                    </div>

                    <div className="card-body mt-4">
                      <h2 className="card-title">{item.title}</h2>
                      <p>{item.description}</p>
                      <div className="flex justify-between">
                        <h3 className="flex gap-2">
                          <p
                            className={`${
                              item.radio === "donate" && "line-through"
                            }`}
                          >
                            <span className="font-bold">Price:</span> ₹
                            {item.price}
                          </p>
                        </h3>

                        <h3>
                          {item.quantity <= 0 ? (
                            <span className="font-bold">sold out</span>
                          ) : (
                            <>
                              <span className="font-bold">Quantity:</span>{" "}
                              {item.quantity}{" "}
                            </>
                          )}
                        </h3>
                      </div>
                      <div className="flex justify-between">
                        <h3>
                          <span className="font-bold">Condition:</span>{" "}
                          {item.condition}
                        </h3>
                        <h3>
                          <span className="font-bold">Lang:</span>{" "}
                          {item.language}
                        </h3>
                      </div>

                      <h3>
                        <span className="font-bold">By </span>
                        {item.author}
                      </h3>
                      <div className="card-actions justify-end items-center">
                        <div
                          className="absolute -top-[2%] -right-[7%] bg-white rounded-full"
                          onClick={() => setLike(item._id)}
                        >
                          {isLiked(item._id) ? (
                            <MdOutlineFavorite
                              className="w-7 h-7 m-3"
                              style={{ fill: "red" }}
                            />
                          ) : (
                            <MdFavoriteBorder
                              className="w-7 h-7 m-3"
                              style={{ fill: "red" }}
                            />
                          )}
                        </div>
                        {!token ? (
                          item.radio === "donate" ? (
                            <button
                              className={`btn btn-success`}
                              onClick={() => handleRequest(item._id)}
                            >
                              Request
                            </button>
                          ) : (
                            <button
                              className={`btn btn-primary ${
                                isInCart(item._id) ||
                                (item.quantity <= 0 && "btn-disabled")
                              }`}
                              onClick={() => addToCart(item._id, 1)}
                            >
                              {isInCart(item._id)
                                ? "Added to Cart"
                                : "Add to Cart"}
                            </button>
                          )
                        ) : (
                          <Link to="/addtosell">
                            <button
                              onClick={() => handleEditBook(item)}
                              className="btn btn-primary"
                            >
                              Edit
                            </button>
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full min-h-screen text-center flex align-center justify-center items-center">
          <h1 className="font-bold text-2xl">No Book Found</h1>
        </div>
      )}
    </>
  );
}

export default Cards;
