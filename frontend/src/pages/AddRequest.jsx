import { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axiosInstance from "../axiosInstance";
import { StoreContext } from "../context/StoreContext";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

function AddRequest() {
  const [data, setData] = useState({
    name: "",
    book: "",
    user: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    country: "",
    zip: "",
    description: "",
  });
  const [user, setUser] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();
  const { url, requestedBook, fetchOneBook } = useContext(StoreContext);

  const fetchUserData = async () => {
    const newurl = url + "getUser";
    const response = await axiosInstance.get(newurl);
    if (response.status == 200) {
      setUser(response.data.data);
    }
  };
  console.log(requestedBook);

  useEffect(() => {
    fetchUserData();
    fetchOneBook(id);
  }, [id]);

  useEffect(() => {
    setData({
      name: requestedBook?.title || "",
      book: requestedBook?._id || "",
      user: user?._id || "",
      phone: user?.phone || "",
      street: user?.street || "",
      city: user?.city || "",
      state: user?.state || "",
      country: user?.country || "",
      zip: user?.zip || "",
      description: "",
    });
  }, [requestedBook, user]);

  const handleChnageValue = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newurl = url + "addBookRequest";
    console.log(data); // Confirm data being sent
    const response = await axiosInstance.post(newurl, data);
    if (response.status === 200) {
      toast.success("Request added", { autoClose: 1500 });
      setTimeout(() => {
        navigate("/");
      }, 1500);
      setData({});
    }
  };

  return (
    <div>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-grow flex items-center justify-center pt-8">
          <div className="max-w-screen-2xl container mx-auto px-4 md:px-20 my-10 w-full">
            <div className="max-w-lg bg-white rounded-md p-8 shadow-2xl space-y-4 mx-auto">
              <div className="profile-details">
                <form onSubmit={handleSubmit}>
                  <div className="form-control mb-3">
                    <label className="label">
                      <span className="label-text">Book Name</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Book Name"
                      className="input input-bordered text-sm w-full h-9"
                      name="name"
                      value={requestedBook.title}
                      required
                    />
                  </div>

                  <div className="form-control mb-3">
                    <label className="label">
                      <span className="label-text">Your Phone No.</span>
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
                  <div className="main-form form-control flex flex-col">
                    <label className="label">
                      <span className="label-text">Your Address</span>
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
                      <span className="label-text">
                        write more information about why are you requesting
                      </span>
                    </label>
                    <textarea
                      type="textarea"
                      placeholder=""
                      className="textarea textarea-bordered "
                      name="description"
                      value={user.reason}
                      onChange={handleChnageValue}
                      required
                    />
                  </div>

                  <div className="form-control mt-6">
                    <button
                      type="submit"
                      className="btn btn-primary w-full text-sm"
                    >
                      Add Request
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default AddRequest;
