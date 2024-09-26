import { assets } from "../assets/assets";
import { useContext, useRef, useState, useEffect } from "react";
import { StoreContext } from "../context/StoreContext";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import axiosInstance from "../axiosInstance";

function AddCategory() {
  const { url, categoryItem } = useContext(StoreContext);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [selectedFile, setSelectedFile] = useState([]);
  const formData = new FormData();
  const fileInputRef = useRef(null);
  let navigateval;
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    description: "",
    image: "",
  });

  useEffect(() => {
    if (categoryItem._id) {
      setData({
        name: categoryItem.name,
        description: categoryItem.description,
        image: categoryItem.image,
      });
      setPreviewUrl(url + categoryItem.image);
    } else {
      setData({
        name: "",
        description: "",
        image: "",
      });
      setPreviewUrl(null);
    }
  }, [categoryItem, url]);

  const handleChnageValue = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };
  const handleClose = async () => {
    if (categoryItem._id) {
      navigateval = "/categorys";
    } else {
      navigateval = "/";
    }
    navigate(navigateval);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    let successMessage;
    let newurl;
    if (categoryItem._id) {
      newurl = url + "updateCategory";
      successMessage = "category update succesfully";
      formData.append("_id", categoryItem._id);
    } else {
      newurl = url + "addCategory";
      successMessage = "category add succesfully";
    }

    formData.append("image", selectedFile);
    const mydata = JSON.stringify(data);
    formData.append("categorydata", mydata);
    const response = await axiosInstance.post(newurl, formData);
    if (response.status == 200) {
      toast.success(successMessage, { autoClose: 1500 });
      setTimeout(() => {
        navigate("/categorys");
        setData({
          name: "",
          description: "",
          images: "",
        });
        categoryItem({});
        setPreviewUrl(null);

        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
        setSelectedFile([]);
      }, 1500);
    } else {
      toast.error("Something get wrong", { autoClose: 1500 });
    }
  };
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="addcategory mt-[68px] mb-[40px] flex-grow overflow-y-auto">
        <div className="grid w-full place-items-center align-start pt-2 h-full">
          <div className="hero-content flex flex-col max-w-2xl bg-white rounded-md p-8 w-full mx-4 lg:mx-0 shadow-2xl">
            <div className="text-center w-full lg:text-left mb-2 flex justify-between items-center">
              <h1 className="text-4xl font-bold">
                {categoryItem._id ? "Update Category" : "Add Category"}
              </h1>
              <img
                onClick={() => handleClose()}
                src={assets.close}
                alt="close img"
                className="w-6 h-6 cursor-pointer"
              />
            </div>
            <div className="card bg-base-100 w-full max-w-xl mx-auto shadow-2xl">
              <form onSubmit={handleSubmit} className="card-body gap-0.10 p-4">
                <div className="form-control mb-3 w-full ">
                  <div className="w-full">
                    <label className="label">
                      <span className="label-text">Category Name</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Name"
                      className="input input-bordered text-sm w-full h-9"
                      name="name"
                      value={data.name}
                      onChange={handleChnageValue}
                      required
                    />
                  </div>
                  <div className="w-full">
                    <label className="label">
                      <span className="label-text">Discription</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Discription"
                      className="input input-bordered text-sm w-full h-9"
                      name="description"
                      value={data.description}
                      onChange={handleChnageValue}
                      required
                    />
                  </div>
                </div>
                <div className="main-form form-control flex flex-col">
                  <div className="file-uploader">
                    <input
                      type="file"
                      className="file-input file-input-bordered w-full"
                      onChange={() => handleFileChange(event)}
                      ref={fileInputRef}
                    />
                  </div>
                  {previewUrl != null && (
                    <div className="w-52 pt-4">
                      <h4 className="pb-4">Selected Image:</h4>
                      <img
                        className="preview-image w-44 h-44"
                        src={previewUrl}
                        alt="Selected"
                      />
                    </div>
                  )}
                </div>

                <div className="form-control mt-6 ">
                  <button className="btn btn-primary w-full text-sm">
                    {categoryItem._id ? "Update Category" : "Add Category"}
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

export default AddCategory;
