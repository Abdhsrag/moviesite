import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './componants/login/login';
import Register from './componants/register/register';
import Navbar from './componants/navbar/navbar';
import NotFound from './componants/notfound/notfound';
import Movies from './componants/movies/movies';
import MovieDetails from './componants/movies/moviedetalis';
import Todo from './componants/todo/todo';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <Navbar />
          <Switch>
            <Route path="/login" component={Login} exact />
            <Route path="/register" component={Register} exact />
            <Route path="/movies/:id" component={MovieDetails} exact/>
            <Route path="/towatch" component={Todo} exact />
            <Route path="/" component={Movies} exact />
            <Route path="*" component={NotFound} exact />
          </Switch>
        </Router>
      </header>
    </div>
  );
}

export default App;