import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { StoreContext } from "../context/StoreContext";
import axiosInstance from "../axiosInstance";

function Comment() {
  const [comments, setComments] = useState([]);
  const { url } = useContext(StoreContext);

  const fetchCommentData = async () => {
    try {
      const newurl = url + "getAllComment";
      const res = await axiosInstance.get(newurl);
      if (res) {
        setComments(res.data.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchCommentData();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="addcategory mt-[68px] mb-[40px] flex-grow overflow-y-auto">
        <div className="grid w-full place-items-center align-start pt-2 h-full">
          {comments && comments.length ? (
            <div className="hero-content flex flex-col max-w-2xl bg-white rounded-md p-8 w-full mx-4 lg:mx-0 shadow-2xl">
              {comments.map((item) => (
                <>
                  <div className="">{item.message}</div>
                  <div className="">{item.email}</div>
                  <div className="">{item.name}</div>
                  <div className="">{item.createdAt}</div>
                </>
              ))}
            </div>
          ) : (
            <div className="">no Comments</div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Comment;
