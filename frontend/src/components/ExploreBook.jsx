/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import Cards from "./Cards";
import { StoreContext } from "../context/StoreContext";
import MultiRangeSlider from "multi-range-slider-react";
import "../index.css";
import axios from "axios";

function ExploreBook() {
  const { bookData, categoryData, url } = useContext(StoreContext);
  const [value, setValue] = useState("");
  const [filterData, setFilterData] = useState([]);
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(100);
  const [selectedRange, setSelectedRange] = useState({ min: 0, max: 100 });
  const [filters, setFilters] = useState({
    minValue: selectedRange.min,
    maxValue: selectedRange.max,
    categoryId: "",
    condition: "",
    isDonate: "",
  });

  const findMinMax = () => {
    const prices = bookData.map((book) => book.price);
    if (prices.length) {
      const minPrice = Math.min(...prices);
      const maxPrice = Math.max(...prices);
      setSelectedRange({ min: minPrice, max: maxPrice });
      return;
    }
  };

  useEffect(() => {
    findMinMax();
    setFilterData(bookData);
  }, [bookData]);

  const handleChangeValue2 = ({ minValue, maxValue }) => {
    setMin((prevMin) => {
      if (prevMin !== minValue) {
        return minValue;
      }
      return prevMin;
    });
    setMax((prevMax) => {
      if (prevMax !== maxValue) {
        return maxValue;
      }
      return prevMax;
    });
    setFilters((prevFilters) => ({ ...prevFilters, minValue, maxValue }));
  };

  const handleSearch = (e) => {
    setValue(e.target.value);
  };
  // const filteredBookData = bookData.filter((book) =>
  //   book.title.toLowerCase().includes(value.toLowerCase())
  // );
  useEffect(() => {
    handleChangeValue();
  }, [min, max]);

  const handleChangeValue = async (e) => {
    if (e && e.target != undefined) {
      const { name, type, value, checked } = e.target;
      setFilters((prevFilters) => ({
        ...prevFilters,
        [name]: type === "checkbox" ? checked : value,
        minValue: min,
        maxValue: max,
      }));
    }

    try {
      const newUrl = url + "getBookByFilter";
      const response = await axios.post(newUrl, filters);
      if (response.status === 200) {
        console.log(response.data.data);
        setFilterData(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching filtered data", error);
    }
  };

  return (
    <div className="bg-[#f3f2ec] pb-10">
      <div className="max-w-screen-2xl container mx-auto md:px-20 px-4  md:flex-row items-center mt-20  ">
        <h1 className="py-10 text-center font-semibold text-4xl bg-[#c17130] text-white">
          All Books: Your Gateway to Great Stories
        </h1>
        <div className="books-content pt-5">
          <input
            type="text"
            className="input input-bordered input-md w-full max-w-xs"
            placeholder="Search"
            value={value}
            onChange={(e) => handleSearch(e)}
          />

          <div className="container mx-auto px-4 py-6 md:flex md:space-x-10">
            <div className="filter-section md:w-1/4 bg-gray-100 p-4 shadow-md rounded-lg h-1/2">
              <h2 className="text-lg font-semibold mb-4">Filters</h2>
              <div className="mb-4">
                <label className="block mb-2 font-medium">Category</label>
                <select
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={filters.categoryId || ""} 
                  name="categoryId"
                  onChange={handleChangeValue}
                >
                  <option value="All">All</option>
                  {categoryData.map((item) => (
                    <option key={item._id} value={item._id}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <MultiRangeSlider
                  min={selectedRange.min}
                  max={selectedRange.max}
                  step={5}
                  name="range"
                  minValue={min}
                  maxValue={max}
                  onChange={handleChangeValue2}
                />
              </div>
              <div className="mb-4 flex gap-3">
                <div className="form-control">
                  <label className="label cursor-pointer">
                    <span className="label-text pr-2">New</span>
                    <input
                      type="radio"
                      name="condition"
                      value="New"
                      className="radio checked:bg-red-500"
                      onChange={handleChangeValue}
                      checked={filters.condition === "New"}
                    />
                  </label>
                </div>
                <div className="form-control">
                  <label className="label cursor-pointer">
                    <span className="label-text pr-2">Used</span>
                    <input
                      type="radio"
                      name="condition"
                      value="Used"
                      className="radio checked:bg-blue-500"
                      onChange={handleChangeValue}
                      checked={filters.condition === "Used"}
                    />
                  </label>
                </div>
              </div>
              <div className="mb-4 flex justify-between items-center">
                <label className="block font-medium">Show Donated Books</label>
                <input
                  type="checkbox"
                  name="isDonate"
                  className="w-4 h-4"
                  onChange={handleChangeValue}
                  checked={filters.isDonate}
                />
              </div>
            </div>
            <Cards bookData={filterData} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExploreBook;
