import { useContext, useState } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import { StoreContext } from "../context/StoreContext";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

function ResetPass() {
  const { email, token } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState({
    email: email,
    password: "",
    token: token,
  });

  const { url } = useContext(StoreContext);

  const handleresetpass = async (e) => {
    e.preventDefault();
    const newurl = url + "resetpassword";
    const response = await axios.post(newurl, data);
    if (response.status == 200) {
      toast.success("your password reset successfull", { autoClose: 1500 });
      setTimeout(() => {
        navigate("/");
      }, 1500);
    }
    toast.error("something get Wrong", { autoClose: 1500 });
  };

  const handleonchange = (e) => {
    setData({ ...data, password: e.target.value });
  };

  return (
    <div
      className="relative w-full h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url(${assets.menubgimg})`,
      }}
    >
      <div className="flex items-center justify-center w-full h-full bg-black bg-opacity-30">
        <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-center">
            Reset Password
          </h2>
          <form onSubmit={handleresetpass} target="_blank">
            <div className="cnontent mb-4 text-gray-500 capitalize font-medium text-sm text-center"></div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={data.email}
                className="mt-1 disabled:opacity-0 text-gray-500 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                required
                value={data.password}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                onChange={handleonchange}
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-indigo-600 text-white font-medium rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Reset Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ResetPass;
