import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { useContext, useEffect, useRef, useState } from "react";
import { StoreContext } from "../context/StoreContext";
import { toast } from "react-toastify";
import "../index.css";
import axiosInstance from "../axiosInstance";
import Footer from "./Footer";

function AddToSell() {
  const { url, categoryData, bookItem } = useContext(StoreContext);
  const [selectedFile, setSelectedFile] = useState([]);
  const formData = new FormData();
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const [data, setData] = useState({
    title: "",
    page: "",
    author: "",
    condition: "",
    price: "",
    language: "",
    quantity: "",
    publicationYear: "",
    description: "",
    address: "",
    images: "",
    isAvailable: "",
    category: "",
    radio: "",
  });

  const handleclose = (id) => {
    if (id == undefined && id == null) {
      navigate("/");
    } else {
      navigate("/mysellbook");
    }
  };

  const handleChnageValue = (e) => {
    const { name, value, type } = e.target;

    if (type === "radio") {
      setData((prev) => ({ ...prev, [name]: value }));
    } else {
      setData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files;
    setSelectedFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let successMessage;
    let navigateval;
    let newurl;
    if (bookItem && bookItem._id) {
      formData.append("_id", bookItem._id);
      newurl = url + "updateBook";
      successMessage = "book updated successfully";
      navigateval = "/mysellbook";
    } else {
      newurl = url + "addBook";
      successMessage = "book added successfully";
      navigateval = "/";
    }
    for (let i = 0; i < selectedFile.length; i++) {
      formData.append("file", selectedFile[i]);
    }

    const mydata = JSON.stringify(data);
    formData.append("bookdata", mydata);
    const response = await axiosInstance.post(newurl, formData);

    if (response.status == 200) {
      toast.success(successMessage, { autoClose: 1500 });
      setTimeout(() => {
        setData({
          title: "",
          page: "",
          author: "",
          condition: "",
          category: "",
          price: "",
          quantity: "",
          publicationYear: "",
          description: "",
          address: "",
          isAvailable: "",
          radio: "",
          language: "",
        });
        navigate(navigateval);

        if (fileInputRef.current) {
          fileInputRef.current.value = ""; // Clear the file input
        }
        setSelectedFile([]);
      }, 1500);
    } else {
      toast.error("Something get Wrong", { autoClose: 1500 });
    }
  };

  useEffect(() => {
    if (bookItem._id) {
      setData({
        id: bookItem._id,
        title: bookItem.title,
        author: bookItem.author,
        description: bookItem.description,
        category: bookItem.categoryId,
        page: bookItem.page,
        condition: bookItem.condition,
        price: bookItem.price,
        language: bookItem.language,
        quantity: bookItem.quantity,
        publicationYear: bookItem.publicationYear,
        address: bookItem.address,
        images: bookItem.images,
        isAvailable: bookItem.isAvailable,
        radio: bookItem.radio,
      });
    } else {
      setData({
        title: "",
        author: "",
        description: "",
        category: "",
        page: "",
        condition: "",
        price: "",
        language: "",
        quantity: "",
        publicationYear: "",
        address: "",
        images: "",
        isAvailable: "",
        radio: "",
      });
    }
  }, [bookItem]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow overflow-y-auto mt-[68px] pb-10">
        <div className="grid w-full place-items-center align-start pt-2">
          <div className="hero-content flex flex-col max-w-2xl bg-white rounded-md p-8 w-full mx-4 lg:mx-0 shadow-2xl">
            {/* Heading Section */}
            <div className="text-center w-full lg:text-left mb-2 flex justify-between items-center">
              <h1 className="lg:text-4xl text-2xl font-bold">
                {bookItem._id ? "Update Your Book" : "Add Book For Sale"}
              </h1>
              <span onClick={() => handleclose(bookItem._id)}>
                <img
                  src={assets.close}
                  alt="close img"
                  className="w-6 h-6 cursor-pointer"
                />
              </span>
            </div>
            <p className="text-sm">
              Turn your old titles into new opportunities!
            </p>

            <div className="card bg-base-100 w-full max-w-xl mx-auto shadow-2xl">
              <form onSubmit={handleSubmit} className="card-body gap-0.10 p-4">
                <div className="flex form-control mb-3 w-full flex-row gap-2">
                  <div className="w-1/2">
                    <label className="label">
                      <span className="label-text">Book Title</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Book Title"
                      className="input input-bordered text-sm w-full h-9"
                      name="title"
                      value={data.title}
                      onChange={handleChnageValue}
                      required
                    />
                  </div>
                  <div className="w-1/2">
                    <label className="label">
                      <span className="label-text">Author</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Author Name"
                      className="input input-bordered text-sm w-full h-9"
                      name="author"
                      value={data.author}
                      onChange={handleChnageValue}
                      required
                    />
                  </div>
                </div>

                <div className="flex form-control mb-3 w-full flex-row gap-2">
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text">Page</span>
                    </label>
                    <input
                      type="Number"
                      placeholder="page"
                      className="input input-bordered w-full text-sm h-9"
                      name="page"
                      value={data.page}
                      onChange={handleChnageValue}
                      required
                    />
                  </div>
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text">Quantity</span>
                    </label>
                    <input
                      type="Number"
                      placeholder="Quantity"
                      className="input input-bordered w-full text-sm h-9"
                      name="quantity"
                      value={data.quantity}
                      onChange={handleChnageValue}
                      required
                    />
                  </div>
                </div>

                <div className="flex form-control mb-3 w-full flex-row gap-2">
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text">Publication Year</span>
                    </label>
                    <input
                      type="Number"
                      placeholder="publication Year"
                      className="input input-bordered w-full text-sm h-9"
                      name="publicationYear"
                      value={data.publicationYear}
                      onChange={handleChnageValue}
                      required
                    />
                  </div>
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text">Language</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Language"
                      className="input input-bordered w-full text-sm h-9"
                      name="language"
                      value={data.language}
                      autoComplete="current-Language"
                      onChange={handleChnageValue}
                      required
                    />
                  </div>
                </div>

                <div className="flex form-control mb-3 w-full flex-row gap-2 ">
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text">Condition</span>
                    </label>
                    <select
                      className="select select-bordered w-full text-sm min-h-9 h-9 text-gray-800"
                      name="condition"
                      value={data.condition || ""}
                      onChange={handleChnageValue}
                    >
                      <option value="" disabled className="text-[#bebebe]">
                        condition
                      </option>
                      <option value="Old">Old</option>
                      <option value="New">New</option>
                    </select>
                  </div>
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text">Category</span>
                    </label>
                    <select
                      className="select select-bordered w-full text-sm min-h-9 h-9 text-gray-800  "
                      name="category"
                      value={data.category || ""}
                      onChange={handleChnageValue}
                    >
                      <option value="" disabled>
                        category
                      </option>
                      {categoryData.map((category) => (
                        <option
                          className="text-zinc-900"
                          key={category._id}
                          value={category._id}
                        >
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="main-form form-control flex flex-col">
                  <label className="label">
                    <span className="label-text">Description</span>
                  </label>
                  <input
                    type="textarea"
                    id="description"
                    placeholder="Description"
                    className="input input-bordered text-sm form-control w-full h-9"
                    name="description"
                    value={data.description}
                    onChange={handleChnageValue}
                    required
                  />
                </div>

                <div className="main-form form-control flex flex-col">
                  <label className="label">
                    <span className="label-text">Address</span>
                  </label>
                  <input
                    type="textarea"
                    id="address"
                    placeholder="Address"
                    className="textarea textarea-bordered textarea-lg text-sm form-control w-full h-9"
                    name="address"
                    value={data.address}
                    onChange={handleChnageValue}
                    required
                  />
                </div>

                <div className="main-form form-control flex flex-row gap-2 items-center min-h-[72px]">
                  <div className="form-control flex flex-row w-full">
                    <div className="form-control pr-1">
                      <label className="label cursor-pointer ">
                        <span className="label-text">Donate</span>
                        <input
                          type="radio"
                          name="radio"
                          className="radio checked:bg-red-500 ml-2"
                          onChange={handleChnageValue}
                          value="donate"
                          checked={data.radio === "donate"}
                        />
                      </label>
                    </div>
                    <div className="form-control pl-2">
                      <label className="label cursor-pointer">
                        <span className="label-text">Sell</span>
                        <input
                          type="radio"
                          name="radio"
                          className="radio checked:bg-blue-500 ml-2"
                          value="sell"
                          onChange={handleChnageValue}
                          checked={data.radio === "sell"}
                        />
                      </label>
                    </div>
                  </div>
                  {data.radio === "sell" && (
                    <div className="main-form form-control flex flex-col w-full">
                      <label className="label">
                        <span className="label-text">Price</span>
                      </label>
                      <input
                        type="number"
                        id="price"
                        placeholder="Price"
                        className="input input-bordered text-sm form-control w-full h-9 appearance-none outline-none"
                        name="price"
                        value={data.price || ""}
                        onChange={handleChnageValue}
                        required
                      />
                    </div>
                  )}
                </div>
                <div className="main-form form-control flex flex-col">
                  <div className="file-uploader">
                    <input
                      type="file"
                      multiple
                      className="file-input file-input-bordered w-full max-w-xs"
                      onChange={handleFileChange}
                      ref={fileInputRef}
                    />
                  </div>
                </div>

                <div className="form-control mt-6 ">
                  <button className="btn btn-primary w-full text-sm">
                    {bookItem._id ? "Edit Book" : "Add Book"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default AddToSell;
