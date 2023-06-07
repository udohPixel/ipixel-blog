import { useState } from 'react';
import useGet from '../../Hooks/useGet';
import { useParams, useHistory } from 'react-router-dom';

const UpdateBlog = () => {
  // fetch data
  const { data: blogs, isLoading: blogLoading } = useGet("http://localhost:8000/blogs");
  const { data: categories } = useGet("http://localhost:8000/categories");

  const { id } = useParams();
  const blogById = blogs && (blogs.filter((blog) => blog.id === Number(id)))[0];

  const [title, setTitle] = useState(blogById && blogById.title);
  const [categoryId, setCategoryId] = useState(blogById && Number(blogById.categoryId));
  const [author, setAuthor] = useState(blogById && blogById.author);
  const [authorPhoto, setAuthorPhoto] = useState(blogById && blogById.authorPhoto);
  const [body, setBody] = useState(blogById && blogById.body);
  const [date, setDate] = useState(Date());
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  // submit controller
  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedBlog = {
      title: title ?? blogById.title,
      categoryId: categoryId ?? Number(blogById.categoryId),
      author: author ?? blogById.author,
      authorPhoto: authorPhoto ?? blogById.authorPhoto,
      body: body ?? blogById.body,
      date
    };

    const updateBlog = async () => {
      try {
        setIsLoading(true);

        await fetch("http://localhost:8000/blogs/" + id, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedBlog)
        });

        console.log("Blog was updated successfully!");
        setIsLoading(false);
        history.push("/");
      } catch (err) {
        console.log("Something went wrong!");
      }
    };
    updateBlog();
  }

  return (
    <div className="py-12">
      <div className="container m-auto px-6 text-gray-600 md:px-12 xl:px-6">
        <div className="lg:w-3/4 xl:w-2/4 lg:mx-auto">
          <div className="mt-12 blog-list">
            <h3 className="text-2xl font-bold text-gray-800 md:text-3xl dark:text-white mb-2">Update Blog</h3>
            {
              (blogById && categories) &&
              <form onSubmit={handleSubmit} className="space-y-8 mt-10">
                <div className="space-y-4">
                  <label htmlFor="title" className="hidden sm:block text-gray-600 dark:text-gray-300">Enter blog title</label>
                  <div className="relative flex items-center">
                    <input
                      type="text"
                      name="title"
                      id="title"
                      autoComplete="title"
                      placeholder="Blog title"
                      className="focus:outline-none block w-full rounded-full placeholder-gray-500 bg-gray-100 dark:bg-gray-800 dark:border-gray-600 pl-6 pr-6 h-12 text-gray-600 transition duration-300 invalid:ring-2 invalid:ring-red-400 focus:ring-2 focus:ring-primary"
                      defaultValue={blogById && blogById.title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <label htmlFor="categories" className="hidden sm:block text-gray-600 dark:text-gray-300">Select category</label>
                  <div className="relative flex items-center">
                    <select defaultValue={blogById && Number(blogById.categoryId)} onChange={(e) => setCategoryId(Number(e.target.value))} name="categories" id="categories" className="focus:outline-none block w-full rounded-full placeholder-gray-500 bg-gray-100 dark:bg-gray-800 dark:border-gray-600 pl-4 pr-4 h-12 text-gray-600 transition duration-300 invalid:ring-2 invalid:ring-red-400 focus:ring-2 focus:ring-primary">
                      <option value={blogById && Number(blogById.categoryId)} >Select category</option>
                      {categories &&
                        categories.map((category) => (
                          <option key={category.id} value={Number(category.id)}>
                            {category.name}
                          </option>
                        ))
                      }
                    </select>
                  </div>
                </div>

                <div className="space-y-4">
                  <label htmlFor="author" className="hidden sm:block text-gray-600 dark:text-gray-300">Enter author name</label>
                  <div className="relative flex items-center">
                    <input
                      type="text"
                      name="author"
                      id="author"
                      autoComplete="author"
                      placeholder="Author name"
                      className="focus:outline-none block w-full rounded-full placeholder-gray-500 bg-gray-100 dark:bg-gray-800 dark:border-gray-600 pl-6 pr-6 h-12 text-gray-600 transition duration-300 invalid:ring-2 invalid:ring-red-400 focus:ring-2 focus:ring-primary"
                      defaultValue={blogById && blogById.author}
                      onChange={(e) => setAuthor(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <label htmlFor="authorPhoto" className="hidden sm:block text-gray-600 dark:text-gray-300">Enter author photo url</label>
                  <div className="relative flex items-center">
                    <input
                      type="text"
                      name="authorPhoto"
                      id="authorPhoto"
                      autoComplete="authorPhoto"
                      placeholder="Author photo url"
                      className="focus:outline-none block w-full rounded-full placeholder-gray-500 bg-gray-100 dark:bg-gray-800 dark:border-gray-600 pl-6 pr-6 h-12 text-gray-600 transition duration-300 invalid:ring-2 invalid:ring-red-400 focus:ring-2 focus:ring-primary"
                      defaultValue={blogById.authorPhoto}
                      onChange={(e) => setAuthorPhoto(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <label htmlFor="body" className="hidden sm:block text-gray-600 dark:text-gray-300">Enter blog content</label>
                  <div className="relative flex items-center">
                    <textarea
                      type="text"
                      name="body"
                      id="body"
                      row="10"
                      autoComplete="body"
                      placeholder="Content of blog..."
                      className="focus:outline-none block w-full rounded-2xl placeholder-gray-500 bg-gray-100 dark:bg-gray-800 dark:border-gray-600 pl-6 pr-6 h-64 text-gray-600 transition duration-300 invalid:ring-2 invalid:ring-red-400 focus:ring-2 focus:ring-primary py-3"
                      defaultValue={blogById.body}
                      onChange={(e) => setBody(e.target.value)}
                    ></textarea>
                  </div>
                </div>

                {!isLoading && <button type="submit" title="Add blog" className="relative flex w-full h-11 py-3 px-6 justify-center text-center rounded-full transition bg-teal-300 hover:bg-teal-100 active:bg-teal-400 focus:bg-teal-300">
                  <span className="block text-teal-900 font-semibold text-sm">
                    Update
                  </span>
                </button>}

                {isLoading && <button disabled type="submit" title="Add blog" className="relative flex w-full h-11 py-3 px-6 justify-center text-center rounded-full transition bg-teal-300 hover:bg-teal-100 active:bg-teal-400 focus:bg-teal-300">
                  <span className="block text-teal-900 font-semibold text-sm">
                    Updating blog...
                  </span>
                </button>}
              </form>
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateBlog;