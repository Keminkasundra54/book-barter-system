/* eslint-disable react/prop-types */
import { Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Books from "./pages/Books";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ForgotPass from "./pages/ForgotPass";
import ResetPass from "./pages/ResetPass";
import AddToSell from "./components/AddToSell";
import AddCategory from "./adminpage/AddCategory";
import UserBook from "./components/userBook";
import AllCategory from "./components/AllCategory";
// import UpdateProfile from "./components/updateProfile";
import Cart from "./pages/Cart";
import AddAddress from "./pages/addAddress";
import UserOrder from "./components/UserOrder";
import OrderDetail from "./components/OrderDetail";
import ReciveOrder from "./components/ReciveOrder";
import AdminOrder from "./adminpage/AdminOrder";
import UserRequestedBook from "./components/UserRequestedBook";
import AddRequest from "./pages/AddRequest";
// import Report from "./pages/Report";
import { useContext, useEffect } from "react";
import { StoreContext } from "./context/StoreContext";
import AdminRequest from "./adminpage/AdminRequest";
import SecoundUser from "./pages/SecoundUser";
import AboutUs from "./pages/AboutUs";
import UserList from "./adminpage/UserList";
import Comment from "./adminpage/Comment";
import Chat from "./components/Chat";

function App() {
  const { setlogin } = useContext(StoreContext);

  const isAuthenticated = () => {
    return localStorage.getItem("token") !== null;
  };

  const ProtectedRoute = ({ element: Component, ...props }) => {
    useEffect(() => {
      if (!isAuthenticated()) {
        setlogin(true);
        toast.success("Please Login", { autoClose: 1500 });
      } else {
        setlogin(false);
      }
    }, []);

    if (!isAuthenticated()) {
      return <Navigate to="/" replace />;
    }

    return <Component {...props} />;
  };

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/books" element={<Books />}></Route>
        <Route path="/aboutus" element={<AboutUs />}></Route>
        <Route path="/forgotpassword" element={<ForgotPass />}></Route>
        <Route
          path="/resetpassword/:email/:token"
          element={<ResetPass />}
        ></Route>
        <Route
          path="/addtosell"
          element={<ProtectedRoute element={AddToSell} />}
        ></Route>
        <Route
          path="/addCategory"
          element={<ProtectedRoute element={AddCategory} />}
        ></Route>
        <Route
          path="/mysellbook"
          element={<ProtectedRoute element={UserBook} />}
        ></Route>
        <Route
          path="/categorys"
          element={<ProtectedRoute element={AllCategory} />}
        ></Route>
        <Route
          path="/profile"
          element={<ProtectedRoute element={SecoundUser} />}
        ></Route>
        <Route path="/cart" element={<ProtectedRoute element={Cart} />}></Route>
        <Route
          path="/addAddress"
          element={<ProtectedRoute element={AddAddress} />}
        ></Route>
        <Route
          path="/myOrder"
          element={<ProtectedRoute element={UserOrder} />}
        ></Route>
        <Route
          path="/order-details/:id"
          element={<ProtectedRoute element={OrderDetail} />}
        />
        <Route
          path="/incomingorder"
          element={<ProtectedRoute element={ReciveOrder} />}
        ></Route>
        <Route
          path="/AdminOrder"
          element={<ProtectedRoute element={AdminOrder} />}
        />
        <Route
          path="/RequestedBooks"
          element={<ProtectedRoute element={UserRequestedBook} />}
        />
        <Route
          path="/AddRequestBook/:id"
          element={<ProtectedRoute element={AddRequest} />}
        />
        <Route
          path="/userlist"
          element={<ProtectedRoute element={UserList} />}
        />
        <Route
          path="/AdminRequest"
          element={<ProtectedRoute element={AdminRequest} />}
        />
        <Route
          path="/feedback"
          element={<ProtectedRoute element={Comment} />}
        />
        <Route path="/chat" element={<ProtectedRoute element={Chat} />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
