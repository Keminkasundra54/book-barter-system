import { assets } from "../assets/assets";

function Banner() {
  return (
    <>
      <div className="banner-sec lg:mt-[68px] mt-[40px] max-w-screen-2xl container mx-auto md:px-20 px-4 flex flex-col md:flex-row items-center my-10 ">
        <div className="left order-2 md:order-1 w-full md:w-1/2 capitalize lg:m-14 md:mt-32">
          <div className="space-y-8 md:space-y-12">
            <h1 className="text-2xl md:text-4xl font-bold mt-">
              hello welcome , Find Your Next Book through{" "}
              <span className="text-pink-500">Book Barter System</span> ,
              Discover a World of Book Exchanges
            </h1>
            <p className="text-lg">
              Welcome to Book Barter System , where book lovers unite to swap
              their favorite reads. Explore a diverse collection of books and
              connect with fellow readers to find your next great adventure.
              Join us today and start trading to enrich your reading experience!
            </p>
            <label className="px-3 py-2 border rounded-md flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
              </svg>
              <input
                type="text"
                className="grow"
                placeholder="Enter Your Email To Login"
              />
            </label>
          </div>
          <button className="btn btn-secondary mt-6">Secondary</button>
        </div>
        <div className="order-1 right w-full md:w-1/2 ">
          <img src={assets.banner} alt="banner-image" />
        </div>
      </div>
    </>
  );
}

export default Banner;
