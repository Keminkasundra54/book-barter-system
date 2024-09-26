import { useContext, useEffect, useRef, useState } from "react";
import { StoreContext } from "../context/StoreContext";
import axiosInstance from "../axiosInstance";
import Navbar from "../components/Navbar";
import { assets } from "../assets/assets";
import { FaUserEdit } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import { Link, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

function SecoundUser() {
  const location = useLocation();
  const { token } = location.state || {};
  const { setUser } = useContext(StoreContext);
  const [data, setData] = useState({});
  const { url } = useContext(StoreContext);
  const fileInputRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [profileImg, setProfileImg] = useState(null);
  const [isToggled, setIsToggled] = useState(true);

  const fetchuserdata = async () => {
    try {
      const newurl = url + "getUser";
      const data = { token: token };
      const response = await axiosInstance.post(newurl, data);
      if (response.status == 200) {
        setData(response.data.data);
      }
    } catch (err) {
      console.log(err);
    }
  };


  useEffect(() => {
    fetchuserdata();
  }, []);

  const fromdata = new FormData();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newurl = url + "updateProfile";
    if (profileImg != null) {
      fromdata.append("profile", profileImg);
    }
    fromdata.append("userdata", JSON.stringify(data));
    const response = await axiosInstance.post(newurl, fromdata);
    if (response.status == 200) {
      toast.success("Profile updateted", { autoClose: 1500 });
      setTimeout(() => {
        setProfileImg(null);
        setIsToggled(true);
      }, 1500);
      setData(response.data.data);
      setUser(response.data.data);
    } else {
      console.log("err at update profile");
    }
  };

  const handleChnageValue = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((prev) => ({ ...prev, [name]: value }));
  };

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

  return (
    <div>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-grow flex items-center justify-center pt-8">
          <div className="max-w-screen-2xl container mx-auto px-4 md:px-20 my-10 w-full">
            <div className="max-w-lg bg-white rounded-md p-8 shadow-2xl space-y-4 mx-auto">
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
                  {data.profile == null ? (
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
                      src={selectedImage || url + data.profile}
                      className="w-44 h-auto border-collapse cursor-pointer"
                      alt={data.profile}
                    />
                  )}
                  {!isToggled && (
                    <input
                      type="file"
                      ref={fileInputRef}
                      className="hidden"
                      onChange={handleFileChange}
                      accept="image/*"
                    />
                  )}
                </div>
              </div>

              {isToggled ? (
                <div className="w-1/2 mx-auto">
                  <div className="data-det text-center flex flex-col gap-1">
                    <h3 className="font-semibold text-xl font-serif italic">
                      {data.firstname} {data.lastname}
                    </h3>
                    <h3 className="font-serif">{data.phone}</h3>
                    <h4 className="font-serif">{data.email}</h4>
                    <h4 className="font-serif">{data.gender}</h4>
                    <h4 className="font-serif">
                      {data.street} {data.city} {data.zip}
                    </h4>
                    <h4 className="font-serif">
                      {data.state} {data.country}
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
                        value={data.firstname}
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
                        value={data.lastname}
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
                      value={data.phone}
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
                      value={data.email}
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
                      value={data.street}
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
                        value={data.city}
                        onChange={handleChnageValue}
                        required
                      />
                      <input
                        type="text"
                        id="inputState"
                        placeholder="State"
                        className="input input-bordered text-sm form-control w-1/2 h-9"
                        name="state"
                        value={data.state}
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
                        value={data.country}
                        onChange={handleChnageValue}
                        required
                      />
                      <input
                        type="text"
                        id="inputZip"
                        placeholder="Zip"
                        className="input input-bordered text-sm form-control w-1/2 h-9"
                        name="zip"
                        value={data.zip}
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
                      value={data.gender}
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
    </div>
  );
}

export default SecoundUser;
