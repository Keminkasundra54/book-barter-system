/* eslint-disable react-hooks/exhaustive-deps */

import { useContext, useEffect, useState } from "react";
import { StoreContext } from "../context/StoreContext";
import { Link, useNavigate } from "react-router-dom";
import "../index.css";
import axiosInstance from "../axiosInstance";
import { toast } from "react-toastify";
import Navbar from "./Navbar";
import Footer from "./Footer";

function AllCategory() {
  const [categoryData, setCategoryData] = useState([]);
  const { setCategryItem, url } = useContext(StoreContext);
  const navigate = useNavigate();

  const handleEditCategory = async (item) => {
    setCategryItem(item);
  };

  const fetchCategory = async () => {
    const newurl = url + "getAllCategory";
    const response = await axiosInstance.get(newurl);
    if (response.status == 200) {
      setCategoryData(response.data.data);
    } else {
      console.log("err at get category");
    }
  };

  const handleRemoveCategory = async (id) => {
    event.preventDefault();
    const data = { _id: id };
    const newurl = url + "removeCategory";
    const response = await axiosInstance.post(newurl, data);
    if (response.status == 200) {
      toast.success("book delete succesfully", { autoClose: 1500 });
      setTimeout(() => {
        navigate("/categorys");
      }, 1500);
    } else {
      toast.error("Something get wrong", { autoClose: 1500 });
    }
  };
  useEffect(() => {
    fetchCategory();
  }, []);

  return (
    <>
      <Navbar />
      <div className="max-w-screen-2xl mt-[68px] container mx-auto md:px-20 lg:my-10">
        <div className="py-8 px-4">
          <div className="grid lg:grid-cols-[1fr_1.5fr_1fr_1.5fr_auto_auto] grid-cols-[1fr_1.5fr_1.5fr_auto_auto] gap-4 items-center text-sm md:text-base font-bold">
            <p>Items</p>
            <p>Title</p>
            <p className="lg:inline-block hidden">Description</p>
            <p className="text-right pr-5">Edit</p>
            <p className="text-right pr-5">Remove</p>
          </div>
          <br />
          <hr className="lg:my-4 my-2" />
          {categoryData.map((item, index) => {
            return (
              <div key={index}>
                <div className="grid lg:grid-cols-[1fr_1.5fr_1fr_1.5fr_auto_auto] grid-cols-[1fr_1.5fr_1.5fr_auto_auto] gap-4 items-center text-gray-500 my-4 px-2 myclass">
                  <img src={url + item.image} alt="" className="w-12" />
                  <p className="text-black">{item.name}</p>
                  <p className="text-black lg:inline-block hidden">
                    {item.description}
                  </p>
                  <p className="text-right">
                    <Link to="/addcategory">
                      <button
                        onClick={() => handleEditCategory(item)}
                        className="btn btn-primary"
                      >
                        Edit
                      </button>
                    </Link>
                  </p>
                  <p className="text-right">
                    <button
                      onClick={() => handleRemoveCategory(item._id)}
                      className="btn btn-primary"
                    >
                      Remove
                    </button>
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default AllCategory;
