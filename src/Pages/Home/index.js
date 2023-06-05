import { Link } from 'react-router-dom';
import BlogList from '../../Components/BlogList';
import useGet from '../../Hooks/useGet';

const Home = () => {
  // fetch data
  const { data: blogs, isLoading: blogLoading, error: blogError } = useGet("http://localhost:8000/blogs");
  const { data: categories, isLoading: categoryLoading, error: categoryError } = useGet("http://localhost:8000/categories");

  return (
    <div>
      <div className="py-12">
        <div className="container m-auto px-6 text-gray-600 md:px-12 xl:px-6">
          {
            (blogs && categories) && <div className="m-auto my-16 mx-auto md:w-full lg:w-full xl:w-3/4">
              <div className="rounded-3xl border text-center border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-2xl shadow-gray-600/10 dark:shadow-none">
                <div className="p-8 py-12 sm:p-16">
                  <h2 className="text-3xl font-bold text-gray-800 md:text-4xl dark:text-white pb-3">Welcome to <span className="text-teal-600 dark:text-teal-500">iPixel Blog.</span></h2>
                  <p className="text-gray-600 dark:text-gray-300 lg:mx-auto lg:w-6/12">
                    Quam hic dolore cumque voluptate rerum beatae et quae, tempore sunt, debitis dolorum
                    officia aliquid explicabo? Excepturi, voluptate?
                  </p>
                </div>
              </div>
            </div>
          }

          <div className="lg:w-3/4 xl:w-3/4 lg:mx-auto">
            {/* loading message */}
            {
              blogLoading &&
              <div className="absolute right-1/2 bottom-1/2  transform translate-x-1/2 translate-y-1/2 ">
                <div className="border-t-transparent border-solid animate-spin  rounded-full border-blue-400 border-4 h-14 w-14"></div>
              </div>
            }

            {/* error message */}
            {
              (blogError || categoryError) &&
              <div className="mt-28 mb-16 space-y-2 text-center">
                <h1 className="text-3xl font-bold text-gray-800 md:text-8xl dark:text-white">
                  {(blogError.includes("Invalid payload") || (categoryError.includes("Invalid payload"))) ? "404" : "400"}
                </h1>
                <p className="text-gray-600 dark:text-gray-300 lg:mx-auto lg:w-6/12 pb-8">
                  {blogError} <br />
                  {categoryError}
                </p>
                <Link type="button" to="/" className="h-11 py-2 rounded-full bg-gray-900 px-6 transition hover:bg-gray-800 focus:bg-gray-700 active:bg-gray-600 dark:bg-gray-700 dark:border dark:border-gray-600 dark:hover:bg-gray-800 dark:hover:border-gray-700">
                  <div className="w-max mx-auto flex items-center justify-center space-x-4 text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-arrow-left-circle w-6 h-6 inset-y-0 my-auto" viewBox="0 0 16 16"> <path fillRule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z" /> </svg>
                    <span className="block w-max text-sm font-semibold tracking-wide text-white">
                      Back home
                    </span>
                  </div>
                </Link>
              </div>
            }

            {/* blog card */}
            {(blogs && categories) && <BlogList blogs={blogs} categories={categories && categories} title="All Blogs" />}

          </div>
        </div>
      </div>

    </div>

  );
}

export default Home;