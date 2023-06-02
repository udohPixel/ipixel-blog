import { useState } from 'react';
import './index.css';


const BlogList = ({ blogs, categories, title }) => {
  const [allBlogs, setAllBlogs] = useState([...blogs]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleCategoryChange = (e) => {
    // get selected category
    setSelectedCategory(e.target.value);

    var blogsByCategory;

    // check if category is selected
    if (e.target.value !== "") {
      blogsByCategory = [...blogs].filter((blog) => blog.category === e.target.value);
    } else {
      blogsByCategory = [...blogs];
    }

    // set new blogs state to filtered blogs
    setAllBlogs(blogsByCategory);
  };

  const handleSearch = (e) => {
    // get search keyword
    const searchKeyword = e.target.value;

    var blogsBySearchKeyword;

    // check if category is selected
    if (selectedCategory === "") {
      // filter by searchKeyword only
      blogsBySearchKeyword = [...blogs].filter((blog) => blog.title.toLowerCase().includes(searchKeyword.toLowerCase()))
    } else {
      // filter by category and searchKeyword
      blogsBySearchKeyword = [...blogs].filter((blog) => (blog.category === selectedCategory) && (blog.title.toLowerCase().includes(searchKeyword.toLowerCase())))
    }

    // set new blogs state to filtered blogs
    setAllBlogs(blogsBySearchKeyword);
  };

  return (
    <div className="mt-12 blog-list">
      <h3 className="text-2xl font-bold text-gray-800 md:text-3xl dark:text-white mb-2">{title}</h3>

      <form action="" className="pb-6 pt-4 space-y-8 border-b border-gray-100 dark:border-gray-700">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row space-y-4">
          <div className="relative flex items-center">
            <select onChange={(e) => handleCategoryChange(e)} name="categories" id="categories" className="focus:outline-none block w-full rounded-full placeholder-gray-500 bg-gray-100 dark:bg-gray-800 dark:border-gray-600 pl-4 pr-4 h-12 text-gray-600 transition duration-300 invalid:ring-2 invalid:ring-red-400 focus:ring-2 focus:ring-primary">
              <option value="">Select category</option>
              {categories &&
                categories.map((category) => (
                  <option key={category.id} value={category.name}>
                    {category.name}
                  </option>
                ))
              }

            </select>
          </div>

          <div className="relative flex items-center search-block">
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-search w-4 h-4 absolute left-4 inset-y-0 my-auto" viewBox="0 0 16 16"> <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" /> </svg>
            <input
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => handleSearch(e)}
              type="text"
              name="search"
              value={searchQuery}
              id="search"
              autoComplete="search"
              placeholder="Search blog"
              className="focus:outline-none block w-full rounded-full placeholder-gray-500 bg-gray-100 dark:bg-gray-800 dark:border-gray-600 pl-12 pr-4 h-12 text-gray-600 transition duration-300 invalid:ring-2 invalid:ring-red-400 focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>
      </form>

      {
        allBlogs.map((blog) => (
          <div key={blog.id} className="group relative -mx-4 mt-6 sm:-mx-8 p-6 sm:p-8 rounded-3xl bg-white dark:bg-transparent border border-transparent hover:border-gray-100 dark:shadow-none dark:hover:border-gray-700 dark:hover:bg-gray-800 shadow-2xl shadow-transparent hover:shadow-gray-600/10 sm:gap-8 sm:flex transition duration-300 hover:z-10">
            <div className="sm:w-2/6 rounded-3xl overflow-hidden transition-all duration-500 group-hover:rounded-xl">
              <img
                src="https://images.unsplash.com/photo-1661749711934-492cd19a25c3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80"
                alt="art cover"
                loading="lazy"
                width="1000"
                height="667"
                className="h-56 sm:h-full w-full object-cover object-top transition duration-500 group-hover:scale-105"
              />
            </div>

            <div className="sm:p-2 sm:pl-0 sm:w-4/6">
              <h3 className="text-2xl font-semibold text-gray-800 dark:text-white">
                {blog.title.substring(0, 50) + "..."}
              </h3>
              <p className="my-4 text-gray-600 dark:text-gray-300">
                {blog.body.substring(0, 120) + "..."}
              </p>
              <div className="flex gap-4 mt-4">
                <a href="/" className="px-3 py-1 rounded-full border border-gray-100 text-sm font-medium text-primary transition duration-300 hover:border-transparent hover:bg-primary hover:text-white dark:border-gray-700 dark:text-gray-300">
                  {blog.category}
                </a>
              </div>
              <div className="flex flex-wrap gap-6 mt-4 items-center">
                <a href="/" className="-ml-1 p-1 rounded-full flex items-center gap-3 hover:bg-gray-50 dark:hover:bg-gray-800">
                  {
                    (blog.authorPhoto !== "")
                      ?
                      < img className='w-8 h-8 object-cover rounded-full' src={blog.authorPhoto} alt='' /> :
                      <svg xmlns='http://www.w3.org/2000/svg' fill='currentColor' className='bi bi-person w-6 h-6 text-gray-400 dark:text-gray-600' viewBox='0 0 16 16'> <path d='M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z' /> </svg>}
                  <span className="hidden sm:block font-semibold text-base text-gray-600 dark:text-gray-200">
                    {blog.author}
                  </span>
                </a>
                <div className="flex gap-2 items-center text-gray-500">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-calendar w-4 h-4 text-gray-400 dark:text-gray-600" viewBox="0 0 16 16"> <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z" /> </svg>
                  <span className="w-max block text-gray-500 sm:mt-0">
                    {blog.date}
                  </span>
                </div>
              </div>

            </div>
          </div>
        ))
      }
    </div>
  );
}

export default BlogList;