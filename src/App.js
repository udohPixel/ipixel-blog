import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './Pages/Home';
import Header from './Layouts/Header';
import Footer from './Layouts/Footer';
import BlogDetails from './Pages/BlogDetails';
import AddBlog from './Pages/AddBlog';
import UpdateBlog from './Pages/UpdateBlog';

function App() {
  return (
    <Router>
      <div className="App bg-white dark:bg-gray-900">
        <Header />

        <div className="content">
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/blogs/:id">
              <BlogDetails />
            </Route>
            <Route path="/add-blog">
              <AddBlog />
            </Route>
            <Route path="/update-blog/:id">
              <UpdateBlog />
            </Route>
          </Switch>
        </div>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
