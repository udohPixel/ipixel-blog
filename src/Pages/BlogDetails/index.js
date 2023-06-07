import { useParams, Link } from 'react-router-dom';
import useGet from '../../Hooks/useGet';

const BlogDetails = () => {
  const { id } = useParams();

  // fetch data
  const { data: blog, isLoading, error } = useGet(`http://localhost:8000/blogs/${id}`);

  return (
    <div>
      <div className="py-12">
        <div className="container m-auto px-6 text-gray-600 md:px-12 xl:px-6">
          <div className="lg:w-3/4 xl:w-2/4 lg:mx-auto">
            <div className="mt-12 blog-details">
              {/* loading message */}
              {
                isLoading &&
                <div className="absolute right-1/2 bottom-1/2  transform translate-x-1/2 translate-y-1/2 ">
                  <div className="border-t-transparent border-solid animate-spin  rounded-full border-blue-400 border-4 h-14 w-14"></div>
                </div>
              }

              {/* error message */}
              {
                error &&
                <div className="mt-28 mb-16 space-y-2 text-center">
                  <h1 className="text-3xl font-bold text-gray-800 md:text-8xl dark:text-white">
                    {(error.includes("Invalid payload")) ? "404" : "400"}
                  </h1>
                  <p className="text-gray-600 dark:text-gray-300 lg:mx-auto lg:w-6/12 pb-8">
                    {error}
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

              {/* blog details */}
              {blog &&
                <article className="group space-y-6">
                  <img
                    src="https://images.unsplash.com/photo-1620121692029-d088224ddc74?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2832&q=80"
                    alt="blog cover"
                    loading="lazy"
                    width="1000"
                    height="667"
                    className="h-80 w-full rounded-3xl object-cover object-top transition-all duration-500 group-hover:rounded-xl"
                  />
                  <h3 className="text-3xl font-semibold text-gray-800 dark:text-white">
                    {blog.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {blog.body}
                  </p>
                  <div className="flex gap-6 items-center">
                    <a href="/" className="-ml-1 p-1 rounded-full flex items-center gap-3 hover:bg-gray-50 dark:hover:bg-gray-800">
                      {
                        (blog.authorPhoto !== "")
                          ?
                          < img className='w-8 h-8 object-cover rounded-full' src={blog.authorPhoto} alt='' /> :
                          <svg xmlns='http://www.w3.org/2000/svg' fill='currentColor' className='bi bi-person w-6 h-6 text-gray-400 dark:text-gray-600' viewBox='0 0 16 16'> <path d='M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z' /> </svg>
                      }
                      <span className="hidden sm:block font-semibold text-base text-gray-600 dark:text-gray-200">{blog.author}</span>
                    </a>
                    <div className="flex gap-2 items-center text-gray-500">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-calendar w-4 h-4 text-gray-400 dark:text-gray-600" viewBox="0 0 16 16"> <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z" /> </svg>
                      <span className="w-max block font-normal text-gray-500 sm:mt-0">
                        {`${blog.date.split(" ")[1]} ${blog.date.split(" ")[2]} ${blog.date.split(" ")[3]}`}
                      </span>
                    </div>
                  </div>
                </article>
              }
            </div>
          </div>
        </div>
      </div >

    </div >
  );
}

export default BlogDetails;