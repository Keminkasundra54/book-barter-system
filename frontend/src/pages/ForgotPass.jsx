import { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { StoreContext } from "../context/StoreContext";
import axios from "axios";
import { toast } from "react-toastify";

function ForgotPass() {
  const { url } = useContext(StoreContext);
  const [sentemail, setSentEmail] = useState(false);
  const [data, setData] = useState({
    email: "",
  });
  const newurl = url + "frgtpassword";

  const handleChange = (e) => {
    setData({
      ...data,
      email: e.target.value,
    });
  };

  const handlefrgtpass = async (e) => {
    e.preventDefault();

    const response = await axios.post(newurl, data);
    if (response.status == 200) {
      toast.success("Check Your Email", { autoClose: 1500 });
      setTimeout(() => {
        setData({ email: "" });
        setSentEmail(true);
      }, 1500);
    } else {
      toast.error("Something get Wrong", { autoClose: 1500 });
    }
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
            Forgot Password
          </h2>
          <form onSubmit={handlefrgtpass}>
            <div className="cnontent mb-4 text-gray-500 capitalize font-medium text-sm text-center">
              <p>
                {sentemail
                  ? "Please Check Your email"
                  : "please enter your email and we will send you a link to reset your password"}
              </p>
            </div>
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
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                onChange={handleChange}
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-indigo-600 text-white font-medium rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Send Reset Link
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ForgotPass;
