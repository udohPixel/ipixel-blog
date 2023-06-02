import './App.css';
import Home from './Pages/Home';
import Header from './Layouts/Header';
import Footer from './Layouts/Footer';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App bg-white dark:bg-gray-900">
        <Header />

        <div className="content">
          <Switch>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
