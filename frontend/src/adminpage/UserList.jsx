import { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axiosInstance from "../axiosInstance";
import { StoreContext } from "../context/StoreContext";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

function UserList() {
  const { url } = useContext(StoreContext);
  const [users, setUsers] = useState();
  const navigate = useNavigate();

  const fetchalluser = async () => {
    try {
      const newurl = url + "getUsers";
      const res = await axiosInstance.get(newurl);
      if (res.status == 200) {
        setUsers(res.data.data);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handleProfilePage = async (token) => {
    navigate("/profile", { state: { token } });
  };

  useEffect(() => {
    fetchalluser();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="addcategory mt-[68px] mb-[40px] flex-grow overflow-y-auto">
        <div className="grid w-full place-items-center align-start pt-2 h-full">
          {users && users.length ? (
            <>
              <div className="hero-content flex flex-col max-w-[80rem] bg-white rounded-md p-8 w-full mx-4 lg:mx-0 shadow-2xl">
                <div className="grid grid-cols-[1fr_1.5fr_1fr_1.5fr_1fr_1fr_auto] gap-4 items-center text-sm md:text-base font-bold w-full">
                  <p className="text-center">User</p>
                  <p className="text-center">Name</p>
                  <p className="text-center">Email</p>
                  <p className="text-center">Phone</p>
                  <p className="text-center">Gender</p>
                  <p className="text-center">Created At</p>
                </div>

                {users.map((item, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-[1fr_1.5fr_1fr_1.5fr_1fr_1fr_auto] gap-4 items-center text-sm md:text-base w-full"
                  >
                    <div className="flex justify-center items-center h-full">
                      <img
                        className="w-30 h-28 overflow-hidden"
                        src={
                          item.profile == null
                            ? assets.profile
                            : url + item.profile
                        }
                        alt="profile"
                        onClick={() => handleProfilePage(item.token)}
                      />
                    </div>
                    <p className="text-center">
                      {" "}
                      {item.firstname} {item.lastname}
                    </p>
                    <p className="text-center"> {item.email}</p>
                    <p className="text-center">{item.phone}</p>
                    <p className="text-center">{item.gender}</p>
                    <p className="text-center">
                      {`
            ${String(new Date(item.createdAt).getDate()).padStart(
              2,
              "0"
            )}-${String(new Date(item.createdAt).getMonth() + 1).padStart(
                        2,
                        "0"
                      )}-${new Date().getFullYear()}
            `}
                    </p>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="">no users</div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default UserList;
