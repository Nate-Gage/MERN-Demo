import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Nav from './components/Nav';
import Home from './components/Home';
import AddRecipe from './components/AddRecipe';
import RecipesList from './components/RecipesList';
import Edit from './components/Edit';

function App() {
  return (
    <Router>
      <div>
        <Nav />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/add" component={AddRecipe} />
          <Route path="/recipes" exact component={RecipesList} />
          <Route path="/recipes/:id" />
          <Route path="/edit/:id" component={Edit} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
