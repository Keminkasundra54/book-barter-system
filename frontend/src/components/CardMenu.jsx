import { useContext } from "react";
import Cards from "./Cards";
import { StoreContext } from "../context/StoreContext";
import { Link } from "react-router-dom";

function CardMenu() {
  const { category, bookData } = useContext(StoreContext);

  return (
    <div className="w-full lg:py-10">
      <div className="trending-book max-w-screen-2xl container mx-auto md:px-20 px-4  md:flex-row items-center ">
        <div className="lg:px-12 flex justify-between items-center md:px-0">
          <h1 className="font-bold lg:text-4xl text-2xl md:text-left">
            Trending Books
          </h1>
          <Link to="books">
            <div className="show-more cursor-pointer md:text-right hover:text-pink-900 duration-75">
              View All
            </div>
          </Link>
        </div>
        <div className="mt-5">
          <Cards bookData={bookData} category={category} limited={true} />
        </div>
      </div>
    </div>
  );
}

export default CardMenu;
