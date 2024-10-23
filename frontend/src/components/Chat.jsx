import { useContext, useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import Navbar from "./Navbar";
import { IoSearchOutline } from "react-icons/io5";
import "../index.css";
import { StoreContext } from "../context/StoreContext";
import { assets } from "../assets/assets";
import { IoMdSend } from "react-icons/io";

function Chat() {
  const [socket, setSocket] = useState(null);
  const [users, setUsers] = useState([]);
  const { url } = useContext(StoreContext);
  const [sender, setSender] = useState({});
  const [message, setMessage] = useState("");
  const [myData, setMyData] = useState({});
  const [chatData, setChatData] = useState([]);
  const targetRef = useRef(null);

  const chatRef = useRef(null);
  const [isScrollable, setIsScrollable] = useState(false);

  const checkScroll = () => {
    console.log("call")
    console.log(chatRef.current.scrollHeight)
    console.log(chatRef.current.clientHeight)
    if (chatRef.current.scrollHeight <= chatRef.current.clientHeight) {
      setIsScrollable(true);
    } else {
      setIsScrollable(false);
    }
  }


  useEffect(() => {
    checkScroll()
    const tokenData = localStorage.getItem("token");
    const userdata = localStorage.getItem("userdata");
      setMyData(JSON.parse(userdata));
    const newSocket = io("http://localhost:5000", {
      extraHeaders: {
        Authorization: `Bearer ${tokenData}`,
      },
    });
    setSocket(newSocket);
    return () => newSocket.disconnect();
  }, []);

  
  useEffect(() => {
    if (socket && myData._id) {
      socket.on("connect", () => {
        console.log("Connected to server");
      });
      const obj = { _id: myData._id };
      socket.emit("getUsers", obj);
      socket.on("getUsers", (data) => {
        if (data.length) {
          setUsers(data);
        }
      });
      return () => {
        socket.off("getUsers");
        socket.off("connect");
      };
    }
  }, [socket, myData._id]);

  const handleSender = (item) => {
    checkScroll()
    setSender(item);
    const obj = {
      from: item._id,
      to: myData._id,
    };
    socket.emit("getMessage", obj);

    socket.on("getMessage", (data) => {
      if (data != null) {
        setChatData(data);
      }
    });
  };

  const handleInputData = (e) => {
    const value = e.target.value;
    setMessage(value);
  };

  const handleScroll = () => {
    if (targetRef.current) {
      targetRef.current.scrollIntoView({ behavior: 'smooth' }); 
    }
  };

  useEffect(() => {
    if (socket && myData._id) {
    socket.on("sendMessage", (data) => {
      setChatData((prevChatData) => [...prevChatData, data]);
    });
    handleScroll();
    return () => {
      socket.off("sendMessage");
    };
  }
  }, [socket]);
  
  const sendData = () => {
    const obj = {
      message: message,
      from: sender._id,
      to: myData._id,
    };

    if (message !== "" && message !== null) {
      socket.emit("sendMessage", obj); 
      setMessage(""); 
    }
    handleScroll();
  };
 
  return (
    <>
      <Navbar />
      <div className="max-w-screen-2xl container mx-auto lg:px-10 md:flex-row items-center">
        <div className="flex-grow flex items-center justify-center pt-8">
          <div className="max-w-screen-2xl container mx-auto px-4 md:px-20 my-10 w-full">
            <div className="bg-white min-h-[calc(100vh-7rem)] rounded-md p-8 shadow-2xl w-full flex gap-5">
              <div className="left-part w-1/4">
                <label className="input input-bordered flex items-center gap-2 w-full bg-zinc-200 text-black">
                  <input
                    type="text"
                    className="grow placeholder-black"
                    placeholder="Search"
                  />
                  <IoSearchOutline />
                </label>
                {users.map((item) => (
                  <>
                    <div className="user-detail">
                      <div className="flex items-center gap-3">
                        <div className="py-2">
                          <img
                            className="w-20 h-16 rounded-full"
                            src={
                              item.profile != null
                                ? url + item.profile
                                : assets.profile
                            }
                          ></img>
                        </div>
                        <div
                          className="w-full"
                          onClick={() => handleSender(item)}
                        >
                          <h3 className="font-serif">
                            {item.firstname} {item.lastname}
                          </h3>
                          <h5 className="text-gray-300 font-serif">
                            hey how are you
                          </h5>
                        </div>
                      </div>
                    </div>
                  </>
                ))}
              </div>
              <div className="right-part w-3/4 m-0">
                {sender && (
                  <>
                    <div className="title text-2xl font-semibold">
                      <h2 className="font-serif">
                        {sender.firstname} {sender.lastname}
                      </h2>
                    </div>
                    <div className="pt-1 subtitle text-sm">
                      last seen 2h ago
                    </div>
                  </>
                )}
                <hr className="my-2"></hr>
                <div ref={chatRef} className={`chat-data min-h-[630px] max-h-[630px] ${isScrollable ? 'overflow-y-scroll' : ''}`}>
                {chatData && (
                  <>
                    {chatData.map((item) => (
                      <>
                        <div className="p-1">
                          <div className={`flex ${item.to == myData._id? "justify-end": "justify-start"}`}>
                            <p className="p-1 font-serif bg-slate-300 rounded-lg">{item.message}</p>
                          </div>
                        </div>
                      </>
                    ))}
                     <div ref={targetRef} />
                     </>
                )}
                </div>
                <div  className="relative chat-input w-full bottom-0">
                  <div className="">
                    <input
                      name="message"
                      type="text"
                      className="border w-full rounded-md p-1 font-serif"
                      placeholder="send message"
                      onChange={handleInputData}
                      value={message}
                      required="true"
                    ></input>
                    <div className="absolute right-[9px] top-[9px] z-30"><IoMdSend onClick={sendData} /></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Chat;
