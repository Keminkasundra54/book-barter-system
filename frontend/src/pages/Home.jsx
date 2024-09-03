import { useContext } from "react";
import Banner from "../components/Banner";
import CardMenu from "../components/CardMenu";
import Category from "../components/Category";
import Footer from "../components/Footer";
import Login from "../components/Login";
import Navbar from "../components/Navbar";
import { StoreContext } from "../context/StoreContext";

function Home() {
  const { category, setcategory, login, setlogin } = useContext(StoreContext);

  return (
    <>
      {login && <Login setlogin={setlogin} />}

      <Navbar setlogin={setlogin} />
      <div className="flex flex-col w-full pt-20">
        <Banner />
        <Category category={category} setcategory={setcategory} />
      </div>
      <CardMenu />
      <Footer />
    </>
  );
}

export default Home;
