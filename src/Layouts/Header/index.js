import './index.css';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <nav className="fixed z-10 w-full dark:bg-gray-900 bg-white md:absolute md:bg-transparent">
        <div className="container m-auto px-2 md:px-12 lg:px-7">
          <div className="flex flex-wrap items-center justify-between py-4 gap-6 md:py-4 md:gap-0 relative">
            <input type="checkbox" name="toggle_nav" id="toggle_nav" className="hidden peer" />
            <div className="w-full px-6 flex justify-between lg:w-max md:px-0">
              <Link to="/" aria-label="logo" className="flex space-x-2 items-center">
                <div aria-hidden="true" className="">
                  <div className="h-4 w-4 rounded-full bg-gray-900 dark:bg-white"></div>
                  <div className="h-2 w-2 mt-1 rounded-full bg-gray-900 dark:bg-white"></div>
                  <div className="h-4 w-2 ml-3 -mt-2 rotate-2 bg-teal-500"></div>
                </div>
                <span className="text-2xl font-bold text-gray-900 dark:text-white">iPixel Blog</span>
              </Link>

              <div className="flex items-center lg:hidden max-h-10">
                <label role="button" htmlFor="toggle_nav" aria-label="humburger" id="hamburger" className="relative  p-6 -mr-6">
                  <div aria-hidden="true" id="line" className="m-auto h-0.5 w-6 rounded bg-sky-900 dark:bg-gray-300 transition duration-300"></div>
                  <div aria-hidden="true" id="line2" className="m-auto mt-2 h-0.5 w-6 rounded bg-sky-900 dark:bg-gray-300 transition duration-300"></div>
                </label>
              </div>
            </div>

            <div className="hidden absolute top-full transition translate-y-1 lg:peer-checked:translate-y-0 lg:translate-y-0 left-0 
                    lg:top-0 lg:relative peer-checked:flex w-full 
                    lg:flex lg:flex-row flex-col 
                    flex-wrap justify-end items-center 
                    gap-6 p-6 rounded-xl 
                    bg-white dark:bg-gray-900 lg:gap-0 
                    lg:p-0  
                    lg:bg-transparent lg:w-7/12">
              <div className="w-full lg:pl-2 space-y-2 lg:w-auto lg:space-y-0 sm:w-max">
                <Link type="button" to="/" className="w-full py-3 px-6 mx-4 text-center rounded-full transition dark:active:bg-teal-900 dark:focus:bg-gray-800 active:bg-teal-200 focus:bg-teal-100 sm:w-max">
                  <span className="block text-teal-800 dark:text-teal-300 font-semibold text-sm">
                    Home
                  </span>
                </Link>
                <Link type="button" to="/add-blog" className="w-full py-3 px-6 text-center rounded-full transition bg-teal-300 hover:bg-teal-100 active:bg-teal-400 focus:bg-teal-300 sm:w-max">
                  <span className="block text-teal-900 font-semibold text-sm">
                    Add New Blog
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>

  );
}

export default Header;