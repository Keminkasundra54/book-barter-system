/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import { GiBookshelf } from "react-icons/gi";
import "../index.css";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../context/StoreContext";
import { assets } from "../assets/assets";
import { CgSearch } from "react-icons/cg";
import Modal from "./Model";
import { BsCart2 } from "react-icons/bs";
// eslint-disable-next-line react/prop-types
function Navbar({ setlogin }) {
  const [sticky, setSticky] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const { user, setuser, setBookItem, url, setCategryItem, cartData } =
    useContext(StoreContext);

  const handleLogout = () => {
    navigate("/");
    localStorage.removeItem("token");
    localStorage.removeItem("userdata");
    setuser(null); // Clear user state
    setIsModalOpen(false); // Close the modal after logging out
  };

  const handlelogin = () => {
    navigate("/");
    setlogin(true);
    window.scrollTo({
      top: 0, // Scroll to the top
      behavior: "smooth", // Optional: Smooth scroll
    });
  };
  useEffect(() => {
    const handlestate = () => {
      if (window.scrollY > 0) {
        setSticky(true);
      } else {
        setSticky(false);
      }
    };
    window.scrollTo(0, 0);
    window.addEventListener("scroll", handlestate);

    const isuser = localStorage.getItem("userdata");
    if (isuser) {
      const jsonuser = JSON.parse(isuser);
      setuser(jsonuser);
    }

    return () => {
      window.removeEventListener("scroll", handlestate);
    };
  }, []);

  const handleBook = () => {
    setBookItem({
      _id: "",
      title: "",
      author: "",
      description: "",
      category: "",
      page: "",
      condition: "",
      price: "",
      language: "",
      quantity: "",
      publicationYear: "",
      address: "",
      images: "",
      isAvailable: "",
      radio: "",
    });
  };

  const navitem = (
    <>
      <li>
        <Link to={"/"}>Home</Link>
      </li>
      <li>
        <Link to="/books">Books</Link>
      </li>
      <li>
        <Link to="/addtosell" onClick={handleBook}>
          Add To Sell
        </Link>
      </li>
      <li>
        <a>About</a>
      </li>
    </>
  );
  return (
    <div
      className={`max-w-full fixed z-50 container mx-auto md:px-20 flex justify-center top-0 left-0 right-0 ${
        sticky &&
        "sticky-navbar shadow-md bg-base-200 duration-300 transition-all ease-in-out "
      }`}
    >
      <div className="navbar max-w-screen-2xl lg:px-10">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              {navitem}
            </ul>
          </div>
          <Link className="lg:text-2xl font-bold cursor-pointer flex flex-row items-center">
            <p className="inline-block lg:text-2xl text-xl">Book Barter</p>
            <GiBookshelf className="mx-1 text-blue-900" />
          </Link>
        </div>
        <div className="navbar-end space-x-3">
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">{navitem}</ul>
          </div>
          {/* search icon */}
          <div className="hidden md:block">
            <label
              className={`px-3 py-2 border rounded-md flex items-center gap-2`}
            >
              <input
                type="text"
                className={`grow outline-none ${
                  sticky &&
                  "bg-base-200 duration-300 transition-all ease-in-out"
                }`}
                placeholder="Search"
              />
              <CgSearch />
            </label>
          </div>
          {/* them icon */}
          <div className="main-cart relative">
            <div className="cart">
              <Link to="/cart">
                <BsCart2 className="w-6 h-6 cursor-pointer" />
              </Link>
            </div>
            {cartData.length >= 1 && (
              <div className="absolute -top-0 -right-1 w-2 h-2 z-10 rounded-full bg-pink-500"></div>
            )}
          </div>

          {user && user._id ? (
            <>
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div className="w-10 rounded-full">
                    <img
                      alt="Tailwind CSS Navbar component"
                      src={
                        user && user.profile
                          ? url + user.profile
                          : assets.profile
                      }
                    />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
                >
                  <Link to="/profile">
                    <li>
                      <p>Profile</p>
                    </li>
                  </Link>
                  <Link to="/mysellbook">
                    <li>
                      <p>my Books</p>
                    </li>
                  </Link>
                  {user && user.role == 1 && (
                    <Link to="/addCategory" onClick={() => setCategryItem({})}>
                      <li>
                        <p>Add Category</p>
                      </li>
                    </Link>
                  )}
                  <Link to="/cart">
                    <li>
                      <button>My Cart</button>
                    </li>
                  </Link>
                  <Link to="/myorder">
                    <li>
                      <button>My Order</button>
                    </li>
                  </Link>
                  <li>
                    <button onClick={() => setIsModalOpen(true)}>Logout</button>
                  </li>
                </ul>
                <Modal
                  isOpen={isModalOpen}
                  onClose={() => setIsModalOpen(false)}
                  onConfirm={handleLogout}
                />
              </div>
            </>
          ) : (
            <div className="" onClick={handlelogin}>
              <p className="bg-pink-600 text-white px-3 py-2 rounded-md hover:bg-slate-800 duration-300 cursor-pointer">
                Login
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
