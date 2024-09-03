import { useContext } from "react";
import ExploreBook from "../components/ExploreBook";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { StoreContext } from "../context/StoreContext";

function Books() {
  const { setlogin } = useContext(StoreContext);
  return (
    <>
      <Navbar setlogin={setlogin} />
      <ExploreBook />
      <Footer />
    </>
  );
}

export default Books;
