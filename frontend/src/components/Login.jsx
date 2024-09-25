/* eslint-disable react/prop-types */
import { useContext, useState } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import { StoreContext } from "../context/StoreContext";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

function Login({ setlogin }) {
  const [register, setRegister] = useState(false);
  const { url, setuser, setrole, setToken } = useContext(StoreContext);
  const [data, setdata] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    street: "",
    city: "",
    state: "",
    country: "",
    zip: "",
    gender: "gender",
    phone: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    let obj = {};
    let newurl;
    if (register) {
      newurl = url + "register";
      obj = data;
    } else {
      newurl = url + "login";
      obj = {
        email: data.email,
        password: data.password,
      };
    }

    const response = await axios.post(newurl, obj);
    if (response.status === 200) {
      toast.success("Success notification!", { autoClose: 1500 });
      setTimeout(() => {
        setdata({
          firstname: "",
          lastname: "",
          email: "",
          password: "",
          street: "",
          city: "",
          state: "",
          country: "",
          gender: "gender",
          phone: "",
          zip: "",
        });
        localStorage.setItem("token", response.data.data.token);
        setToken(response.data.data.token);
        localStorage.setItem("userdata", JSON.stringify(response.data.data));
        setrole(response.data.data.role);
        setlogin(false);
        setuser(response.data.data);
      }, 1500);
    } else {
      toast.error("Something get Wrong", { autoClose: 1500 });
    }
  };

  const handleChnageValue = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setdata((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="absolute top-[60px] bottom-0 z-20 bg-zinc-900/30 w-full h-full">
      <div className="grid w-full place-items-center bg-cover bg-center align-start pt-2">
        <div className="flex flex-col max-w-xl bg-white rounded-md p-8 w-full mx-4 lg:mx-0 shadow-2xl">
          <div className="text-center w-full lg:text-left mb-2 flex justify-between items-center">
            <h1 className="text-4xl font-bold">
              {register ? "Register Now" : "Login Now!"}
            </h1>
            <Link to="/" onClick={() => setlogin(false)}>
              <img
                src={assets.close}
                alt="close img"
                className="w-6 h-6 cursor-pointer"
              />
            </Link>
          </div>
          <div className="card bg-base-100 w-full max-w-lg mx-auto shadow-2xl">
            <form onSubmit={handleSubmit} className="card-body gap-0.10 p-4">
              {register && (
                <>
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
                </>
              )}
              <div
                className={
                  register && "flex form-control w-full flex-row gap-2"
                }
              >
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
                <div className="form-control mb-3 w-full">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <input
                    type="password"
                    placeholder="password"
                    className="input input-bordered w-full text-sm h-9"
                    name="password"
                    value={data.password}
                    autoComplete="current-password"
                    onChange={handleChnageValue}
                    required
                  />
                </div>
              </div>
              {register && (
                <>
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
                </>
              )}

              {register && (
                <div className="flex form-control mb-3 w-full flex-row gap-2">
                  <div className="form-control w-1/2 mb-3">
                    <label className="label">
                      <span className="label-text">Gender</span>
                    </label>
                    <select
                      className="select select-bordered w-full text-sm min-h-9 h-9 text-[#bebebe]"
                      name="gender"
                      onChange={handleChnageValue}
                    >
                      <option value="gender" disabled selected>
                        Gender
                      </option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>
                  <div className="w-1/2">
                    <label className="label">
                      <span className="label-text">Phone</span>
                    </label>
                    <input
                      type="Number"
                      placeholder="Phone"
                      className="input input-bordered text-sm w-full h-9"
                      name="phone"
                      pattern="\d{10}"
                      value={data.phone}
                      onChange={handleChnageValue}
                      title="Phone number must be exactly 10 digits"
                      required
                    />
                  </div>
                </div>
              )}
              <div className="form-control mt-6">
                <button className="btn btn-primary w-full text-sm">
                  {register ? "Register" : "Login"}
                </button>
                {!register ? (
                  <div className="flex justify-between items-center pt-4">
                    <p className="text-sm">
                      Don t have account{" "}
                      <span
                        className="text-blue-500 cursor-pointer"
                        onClick={() => setRegister(true)}
                      >
                        Register Now
                      </span>
                    </p>
                    <label className="label">
                      <Link
                        to={"/forgotpassword"}
                        className="label-text-alt link link-hover"
                      >
                        Forgot password?
                      </Link>
                    </label>
                  </div>
                ) : (
                  <p className="text-sm text-center pt-4">
                    Already have account{" "}
                    <span
                      className="text-blue-500 cursor-pointer"
                      onClick={() => setRegister(false)}
                    >
                      login Now
                    </span>
                  </p>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
