import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Books from "./pages/Books";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ForgotPass from "./pages/ForgotPass";
import ResetPass from "./pages/ResetPass";
import AddToSell from "./components/AddToSell";
import AddCategory from "./pages/AddCategory";
import UserBook from "./components/userBook";
import AllCategory from "./components/AllCategory";
import UpdateProfile from "./components/updateProfile";
import Cart from "./pages/Cart";
import AddAddress from "./pages/addAddress";
import UserOrder from "./components/UserOrder";
import OrderDetail from "./components/OrderDetail";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" Component={Home}></Route>
        <Route path="/books" Component={Books}></Route>
        <Route path="/forgotpassword" Component={ForgotPass}></Route>
        <Route
          path="/resetpassword/:email/:token"
          Component={ResetPass}
        ></Route>
        <Route path="/addtosell" Component={AddToSell}></Route>
        <Route path="/addCategory" Component={AddCategory}></Route>
        <Route path="/mysellbook" Component={UserBook}></Route>
        <Route path="/categorys" Component={AllCategory}></Route>
        <Route path="/profile" Component={UpdateProfile}></Route>
        <Route path="/cart" Component={Cart}></Route>
        <Route path="/addAddress" Component={AddAddress}></Route>
        <Route path="/myOrder" Component={UserOrder}></Route>
        <Route path="/order-details/:id" Component={OrderDetail} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
