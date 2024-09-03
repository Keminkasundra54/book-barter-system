/* eslint-disable react/prop-types */

import { useContext } from "react";
import { Link } from "react-router-dom";
import { StoreContext } from "../context/StoreContext";
import "../index.css";

function Category({ category, setcategory }) {
  const { categoryData, url, user } = useContext(StoreContext);
  return (
    <div className="w-full bg-gray-100 py-4 ">
      <div className="max-w-screen-2xl container mx-auto md:px-20 ">
        <div className="lg:px-12 lg:py-6 flex justify-between items-center p-5">
          <h1 className="font-bold lg:text-4xl text-2xl">Category</h1>
          {user.role == 1 && (
            <Link to="categorys">
              <div className="show-more cursor-pointer hover:text-pink-900 duration-75">
                View All
              </div>
            </Link>
          )}
        </div>
        <div className="category-menu overflow-x-scroll">
          <div className="flex space-x-4 min-w-max pb-2">
            {categoryData.map((item, index) => (
              <div
                key={index}
                className="category-menu-data flex flex-col justify-center items-center space-y-2 px-2"
              >
                <div
                  onClick={() =>
                    setcategory((prev) =>
                      prev === item._id ? "All" : item._id
                    )
                  }
                >
                  <div
                    className={`m-2 border-2 border-gray-400   cursor-pointer rounded-full overflow-hidden ${
                      category === item._id && "active-category"
                    }`}
                  >
                    <img
                      src={url + item.image}
                      className="w-20 h-20 md:w-44 md:h-44"
                      alt={item.name}
                    />
                  </div>
                </div>
                <p>{item.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Category;
