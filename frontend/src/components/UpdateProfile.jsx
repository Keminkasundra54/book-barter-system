/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useRef, useState } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { FaUserEdit } from "react-icons/fa";
import { StoreContext } from "../context/StoreContext";
import { assets } from "../assets/assets";
import axiosInstance from "../axiosInstance";
import { toast } from "react-toastify";
import "../index.css";
import { IoCloseSharp } from "react-icons/io5";
import { Link } from "react-router-dom";

function UpdateProfile() {
  const { user, setuser, url } = useContext(StoreContext);
  const [isToggled, setIsToggled] = useState(true);
  const [isCall, setIsCall] = useState(true);
  const fileInputRef = useRef(null);
  const fromdata = new FormData();
  const [selectedImage, setSelectedImage] = useState(null);
  const [profileImg, setProfileImg] = useState(null);

  const fetchuserdata = async () => {
    const newurl = url + "getUser";
    const response = await axiosInstance.get(newurl);
    if (response.status === 200) {
      setIsCall(false);
      setuser(response.data.data);
    } else {
      console.log("Error at getUser: Response not successful");
    }
  };

  useEffect(() => {
    if (isCall == false) {
      fetchuserdata();
    }
  }, []);

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
      setProfileImg(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newurl = url + "updateProfile";
    if (profileImg != null) {
      fromdata.append("profile", profileImg);
    }
    fromdata.append("userdata", JSON.stringify(user));
    const response = await axiosInstance.post(newurl, fromdata);
    if (response.status == 200) {
      toast.success("Profile updateted", { autoClose: 1500 });
      setTimeout(() => {
        setProfileImg(null);
        setIsToggled(true);
      }, 1500);
      setuser(response.data.data);
    } else {
      console.log("err at update profile");
    }
  };

  const handleChnageValue = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setuser((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-grow flex items-center justify-center pt-8">
          <div className="max-w-screen-2xl container mx-auto px-4 md:px-20 my-10 w-full">
            <div className="max-w-lg bg-white rounded-md p-8 shadow-2xl space-y-4 mx-auto">
              <div className="profile-details">
                <div className="top-con w-full ">
                  <div className="edit text-right flex justify-end items-center">
                    <FaUserEdit
                      className="cursor-pointer w-7 h-7 pr-2"
                      onClick={() => setIsToggled(!isToggled)}
                    />
                    <Link to="/">
                      <IoCloseSharp className="cursor-pointer w-7 h-7" />
                    </Link>
                  </div>
                  <div className="profile rounded-full flex justify-center pb-3">
                    {user.profile == null ? (
                      <>
                        <img
                          onClick={handleImageClick}
                          src={selectedImage || assets.profile}
                          className="w-44 h-auto border-collapse cursor-pointer"
                          alt="Default Profile"
                        />
                      </>
                    ) : (
                      <img
                        onClick={handleImageClick}
                        src={url + user.profile || selectedImage}
                        className="w-44 h-auto border-collapse cursor-pointer"
                        alt={user.profile}
                      />
                    )}
                    <input
                      type="file"
                      ref={fileInputRef}
                      className="hidden"
                      onChange={handleFileChange}
                      accept="image/*"
                    />
                  </div>
                </div>
                {isToggled ? (
                  <div className="w-1/2 mx-auto">
                    <div className="user-det text-center flex flex-col gap-1">
                      <h3 className="font-semibold text-xl font-serif italic">
                        {user.firstname} {user.lastname}
                      </h3>
                      <h3 className="font-serif">{user.phone}</h3>
                      <h4 className="font-serif">{user.email}</h4>
                      <h4 className="font-serif">{user.gender}</h4>
                      <h4 className="font-serif">
                        {user.street} {user.city} {user.zip}
                      </h4>
                      <h4 className="font-serif">
                        {user.state} {user.country}
                      </h4>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <div className="flex form-control mb-3 w-full flex-row gap-2">
                      <div className="w-1/2">
                        <label className="label">
                          <span className="label-text">First Name</span>
                        </label>
                        <input
                          type="text"
                          placeholder="First Name"
                          className="input input-bordered text-sm w-full h-9"
                          name="firstname"
                          value={user.firstname}
                          onChange={handleChnageValue}
                          required
                        />
                      </div>
                      <div className="w-1/2">
                        <label className="label">
                          <span className="label-text">Last Name</span>
                        </label>
                        <input
                          type="text"
                          placeholder="Last Name"
                          className="input input-bordered text-sm w-full h-9"
                          name="lastname"
                          value={user.lastname}
                          onChange={handleChnageValue}
                          required
                        />
                      </div>
                    </div>
                    <div className="form-control mb-3">
                      <label className="label">
                        <span className="label-text">Phone No.</span>
                      </label>
                      <input
                        type="Number"
                        placeholder="Phone No"
                        className="input input-bordered text-sm w-full h-9"
                        name="phone"
                        value={user.phone}
                        onChange={handleChnageValue}
                        required
                      />
                    </div>
                    <div className="form-control mb-3 w-full">
                      <label className="label">
                        <span className="label-text">Email</span>
                      </label>
                      <input
                        type="email"
                        placeholder="email"
                        className="input input-bordered w-full text-sm h-9"
                        name="email"
                        value={user.email}
                        onChange={handleChnageValue}
                        required
                      />
                    </div>

                    <div className="main-form form-control flex flex-col">
                      <label className="label">
                        <span className="label-text">Address</span>
                      </label>
                      <input
                        type="text"
                        id="autocomplete"
                        placeholder="Street"
                        className="input input-bordered text-sm mb-3 form-control w-full h-9"
                        name="street"
                        value={user.street}
                        onChange={handleChnageValue}
                        required
                      />
                      <div className="form-control mb-3 flex flex-row gap-2">
                        <input
                          type="text"
                          id="inputCity"
                          placeholder="City"
                          className="input input-bordered text-sm form-control w-1/2 h-9"
                          name="city"
                          value={user.city}
                          onChange={handleChnageValue}
                          required
                        />
                        <input
                          type="text"
                          id="inputState"
                          placeholder="State"
                          className="input input-bordered text-sm form-control w-1/2 h-9"
                          name="state"
                          value={user.state}
                          onChange={handleChnageValue}
                          required
                        />
                      </div>
                      <div className="form-control mb-3 flex flex-row gap-2">
                        <input
                          type="text"
                          id="inputCountry"
                          placeholder="Country"
                          className="input input-bordered text-sm form-control w-1/2 h-9"
                          name="country"
                          value={user.country}
                          onChange={handleChnageValue}
                          required
                        />
                        <input
                          type="text"
                          id="inputZip"
                          placeholder="Zip"
                          className="input input-bordered text-sm form-control w-1/2 h-9"
                          name="zip"
                          value={user.zip}
                          onChange={handleChnageValue}
                          required
                        />
                      </div>
                    </div>

                    <div className="form-control mb-3">
                      <label className="label">
                        <span className="label-text">Gender</span>
                      </label>
                      <select
                        className="select select-bordered w-full text-sm min-h-9 h-9 text-[#bebebe]"
                        name="gender"
                        value={user.gender}
                        onChange={handleChnageValue}
                      >
                        <option value="gender" disabled>
                          Gender
                        </option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </select>
                    </div>

                    <div className="form-control mt-6">
                      <button className="btn btn-primary w-full text-sm">
                        update Profile
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default UpdateProfile;
