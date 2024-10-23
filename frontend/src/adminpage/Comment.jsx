import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { StoreContext } from "../context/StoreContext";
import axiosInstance from "../axiosInstance";
import { toast } from "react-toastify";

function Comment() {
  const [comments, setComments] = useState([]);
  const { url } = useContext(StoreContext);
  const [toggle, setToggle] = useState(false);
  const [user, setUser] = useState({});
  const [replaydata, setReplayData] = useState("");

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

  const handleReplay = async (data) => {
    setToggle(!toggle);
    setUser(data);
  };

  const handleOnChange = async (e) => {
    const value = e.target.value;
    setReplayData(value);
  };

  useEffect(() => {
    fetchCommentData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newurl = url + "addReplay";
      const data = {
        message: replaydata,
        To: user.email,
      };
      const res = await axiosInstance.post(newurl, data);
      if (res.status == 200) {
        toast.success("Email Send Successfully", { autoClose: 1500 });
        setTimeout(() => {
          setToggle(false);
        }, 1500);
        setReplayData({});
        setUser({});
      } else {
        toast.error("Something get Wrong", { autoClose: 1500 });
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div
        className={`addcategory mt-[68px] mb-[40px] flex-grow overflow-y-auto ${
          toggle && "blur-sm"
        }`}
      >
        <div className="grid w-full place-items-center align-start pt-2 h-full">
          {comments && comments.length ? (
            <div className="hero-content flex flex-col max-w-2xl bg-white rounded-md p-8 w-full mx-4 lg:mx-0 shadow-2xl">
              <div className="w-full grid lg:grid-cols-[1fr_1fr_1.5fr_1.5fr_auto] gap-4 items-center text-sm md:text-base font-bold text-center">
                <p>index</p>
                <p>Name</p>
                <p>message</p>
                <p>Date</p>
                <p>Replay</p>
              </div>
              {comments.map((item, index) => (
                <>
                  <div className=" relative">
                    <div className="w-full grid lg:grid-cols-[1fr_1fr_1.5fr_1.5fr_auto] gap-4 items-center text-sm md:text-base text-center">
                      <p>{index + 1}</p>
                      <p>{item.name}</p>
                      <p className="">{item.message}</p>
                      <p className="">{`
                            ${String(
                              new Date(item.createdAt).getDate()
                            ).padStart(2, "0")}
                            -${String(
                              new Date(item.createdAt).getMonth() + 1
                            ).padStart(2, "0")}
                            -${new Date().getFullYear()}`}</p>
                      <button
                        className="link link-success"
                        onClick={() => handleReplay(item)}
                      >
                        Replay
                      </button>
                    </div>
                  </div>
                </>
              ))}
            </div>
          ) : (
            <div className="">no Comments</div>
          )}
        </div>
      </div>
      {toggle && (
        <div className="popup-content p-3 absolute left-[40%] top-[30%] bg-slate-300 rounded-lg">
          <div className="inr-content w-full">
            <div className="p-2">To : {user.email}</div>
            <div className="p-2">
              <textarea
                className="textarea w-full textarea-bordered"
                placeholder="Enter Your Replay"
                required
                name="message"
                onChange={handleOnChange}
              ></textarea>
            </div>
            <div className="p-2 flex gap-4 justify-end">
              <button onClick={handleSubmit} className="btn btn-success">
                Submit
              </button>
              <button
                onClick={() => setToggle(false)}
                className="btn btn-error"
              >
                Cancle
              </button>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}

export default Comment;
