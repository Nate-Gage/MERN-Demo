import React, { useState, useMemo } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { UserContext } from './components/UserContext';
import Nav from './components/Nav';
import Home from './components/Home';
//import AddItem from './components/AddItem';
import AddWish from './components/AddWish';
//import Wishlist from './components/Wishlist';
import UserWishlist from './components/UserWishlist';
import Edit from './components/Edit';
//import Login from './components/Login';
import LoginUser from './components/LoginUser';
import AddUser from './components/AddUser';

function App() {
  const [userToken, setUserToken] = useState(null);

  const value = useMemo(() => ({ userToken, setUserToken }), [userToken, setUserToken]);

  return (
    <Router>
      <div>
        <Switch>
          <UserContext.Provider value={value}>
            <Nav />
            <Route path="/" exact component={Home} />
            <Route path="/add" component={AddWish} />
            <Route path="/wishlist" exact component={UserWishlist} />
            <Route path="/wishlist/:id" />
            <Route path="/edit/:id" component={Edit} />
            <Route path="/login" exact component={LoginUser} />
            <Route path="/login/create" component={AddUser} />
          </UserContext.Provider>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
