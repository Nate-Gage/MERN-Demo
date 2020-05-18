import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import UserContext from './components/UserContext';
import Nav from './components/Nav';
import Home from './components/Home';
import AddItem from './components/AddItem';
import Wishlist from './components/Wishlist';
import Edit from './components/Edit';
import Login from './components/Login';
import AddUser from './components/AddUser';

function App() {
  const [user, setUser] = useState('hello');

  return (
    <Router>
      <div>
        <Nav />
        <Switch>
          <UserContext.Provider value={{user, setUser}}>
            <Route path="/" exact component={Home} />
            <Route path="/add" component={AddItem} />
            <Route path="/wishlist" exact component={Wishlist} />
            <Route path="/wishlist/:id" />
            <Route path="/edit/:id" component={Edit} />
            <Route path="/login" exact component={Login} />
            <Route path="/login/create" component={AddUser} />
          </UserContext.Provider>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
