import { useContext, useState } from "react";
import Navbar from "../components/Navbar";
import { StoreContext } from "../context/StoreContext";
import Footer from "../components/Footer";
import { assets } from "../assets/assets";
import { CiMail } from "react-icons/ci";
import { IoCallOutline } from "react-icons/io5";
import { PiMapPinLineThin } from "react-icons/pi";
import axiosInstance from "../axiosInstance";
import { toast } from "react-toastify";

function AboutUs() {
  const { url, setlogin } = useContext(StoreContext);
  const [commentData, setCommentData] = useState({
    name: "",
    message: "",
    email: "",
  });

  const handleChangeInput = async (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setCommentData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newurl = url + "addComment";
      const data = commentData;
      const res = await axiosInstance.post(newurl, data);
      if (res.status == 200) {
        toast.success("Your Message Sent SuccessFully", { autoClose: 1500 });
        setCommentData({
          name: "",
          message: "",
          email: "",
        });
      } else {
        toast.error("Somthing get Wrong", { autoClose: 1500 });
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <div className="flex flex-col min-h-screen">
        <Navbar setlogin={setlogin} />
        <div className="flex-grow flex items-center justify-center pt-8">
          <div className="max-w-screen-2xl container mx-auto md:px-20 my-10 w-full">
            <div className="top-content py-5">
              <div className="top-title py-5">
                <h2 className="text-4xl font-semibold">Our Mission</h2>
              </div>
              <div className="top-inr-content flex w-full justify-center items-center gap-20">
                <div className="top-left w-1/2 ">
                  <p className="py-2 text-justify capitalize">
                    Welcome to our Book Barter System, a unique platform
                    dedicated to connecting book lovers and fostering a
                    community of knowledge sharing. Our mission is to make
                    reading more accessible by allowing users to exchange books
                    they no longer need for ones they ve been eager to read.
                    Whether youre looking to pass on a cherished novel or
                    discover a new favorite, our system ensures a simple and
                    rewarding experience.
                  </p>
                  <p className="py-2 text-justify capitalize">
                    By promoting sustainable reading habits and reducing waste,
                    we aim to create a positive impact on both individuals and
                    the environment. Join us in building a world where books
                    circulate freely, and stories are shared widely!
                  </p>
                </div>
                <div className="top-right w-1/2">
                  <div
                    className="top-right-image max-w-[647px] max-h-[400px] h-[400px] bg-contain bg-center rounded-lg overflow-hidden"
                    style={{ backgroundImage: `url(${assets.group})` }}
                  ></div>
                </div>
              </div>
            </div>
            <div className="top-content py-5">
              <div className="top-title py-5">
                <h2 className="text-4xl font-semibold ">
                  Share the Gift of Knowledge
                </h2>
              </div>
              <div className="top-inr-content flex  flex-row-reverse w-full justify-center items-center gap-20">
                <div className="top-left w-1/2">
                  <p className="py-2 text-justify capitalize">
                    Welcome to our Book Barter System, a unique platform
                    dedicated to connecting book lovers and fostering a
                    community of knowledge sharing. Our mission is to make
                    reading more accessible by allowing users to exchange books
                    they no longer need for ones they have been eager to read.
                    Whether you are looking to pass on a cherished novel or
                    discover a new favorite, our system ensures a simple and
                    rewarding experience.
                  </p>
                  <p className="py-2 text-justify capitalize">
                    By promoting sustainable reading habits and reducing waste,
                    we aim to create a positive impact on both individuals and
                    the environment. Join us in building a world where books
                    circulate freely, and stories are shared widely!
                  </p>
                </div>
                <div className="top-right w-1/2">
                  <div
                    className="top-right-image max-w-[647px] max-h-[400px] h-[400px] bg-contain bg-center rounded-lg overflow-hidden"
                    style={{ backgroundImage: `url(${assets.group2})` }}
                  ></div>
                </div>
              </div>
            </div>
            <div className="bottom-content py-5">
              <div className="bottom-title">
                <h2 className="text-4xl font-semibold">Our Team</h2>
              </div>
              <div className="team-container p-8 -mx-8">
                <div className="team-section grid grid-cols-4 gap-4 ">
                  {[
                    {
                      img: "about1",
                      name: "Kailani Doe",
                      profession: "CEO-Founder",
                    },
                    {
                      img: "about2",
                      name: "Henry Liam",
                      profession: "General Manager",
                    },
                    {
                      img: "about3",
                      name: "Emily Davis",
                      profession: "Staff",
                    },
                    {
                      img: "about4",
                      name: "Michael Lee",
                      profession: "Staff",
                    },
                  ].map((person, index) => {
                    return (
                      <div
                        key={index}
                        className="team-image-container text-center border border-[#f0ebeb]"
                      >
                        <div
                          className={`team-image bg-cover bg-center h-64`}
                          style={{
                            backgroundImage: `url(${assets[person.img]})`,
                          }}
                        ></div>
                        <div className="person-info mt-4">
                          <h3 className="text-xl font-semibold ">
                            {person.name}
                          </h3>
                          <p className="text-gray-500 pt-1">
                            {person.profession}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="contactus">
              <div className="contactus-title">
                <h2 className="text-4xl font-semibold">Contact Us</h2>
              </div>
              <div className="contactus-inr-content flex w-full py-8 items-center">
                <div className="inr-left w-1/2 pr-3">
                  <div className="">
                    <p className="font-black">Get In Touch</p>
                  </div>
                  <div className="pt-3 text-justify">
                    <p className="">
                      We are located in beautiful country india ,if you have any
                      query or message for us then please drop your mesage we
                      will figger out your query we value our customers and the
                      community we call home we appreciate your question ,
                      comments and feedback so we can better serve you
                    </p>
                  </div>
                  <div className="pt-7">
                    <ul className="">
                      <li className="text-gray-500 flex gap-1 items-center">
                        <IoCallOutline />
                        <p className="text-base">917867562290</p>
                      </li>
                      <li className="text-gray-500 flex gap-1 items-center">
                        <CiMail />
                        <p className="text-base">bookbarter@gmail.com</p>
                      </li>
                      <li className="text-gray-500 flex gap-1 items-center">
                        <PiMapPinLineThin />
                        <p className="text-base">Ahemdabad-380009 , india</p>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="inr-right w-1/2 pl-3">
                  <form>
                    <div className="">
                      <p>Send A Message </p>
                    </div>
                    <div className="pt-5 flex w-full gap-2">
                      <input
                        type="text w-1/2"
                        className="input input-bordered"
                        placeholder="Name"
                        name="name"
                        required
                        value={commentData.name}
                        onChange={handleChangeInput}
                      />
                      <input
                        type="email w-1/2"
                        className="input input-bordered"
                        placeholder="Email"
                        name="email"
                        value={commentData.email}
                        required
                        onChange={handleChangeInput}
                      />
                    </div>
                    <div className="pt-5 w-full">
                      <textarea
                        className="textarea textarea-bordered w-full  max-h-32"
                        required
                        placeholder="Message"
                        name="message"
                        value={commentData.message}
                        onChange={handleChangeInput}
                      ></textarea>
                    </div>
                    <div className="pt-5">
                      <button onClick={handleSubmit} className="btn">
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default AboutUs;
