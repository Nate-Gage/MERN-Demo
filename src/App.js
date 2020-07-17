import React, { useState, useMemo, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { UserContext } from './components/UserContext';
import Nav from './components/Nav';
import Home from './components/Home';
import AddWish from './components/AddWish';
import UserWishlist from './components/UserWishlist';
import PublicClaimList from './components/PublicClaimList';
import Edit from './components/Edit';
import LoginUser from './components/LoginUser';
import AddAccount from './components/AddAccount';

function App() {
  //Pass local storage data as default state
  const initialValue = JSON.parse(localStorage.getItem('user'));
  const [userValue, setUserValue] = useState(initialValue);

  //Set user value in local storage
  useEffect(() => {
    const jsonData = JSON.stringify(userValue);
    localStorage.setItem('user', jsonData);
  }, [userValue])

  const value = useMemo(() => ({ userValue, setUserValue }), [userValue, setUserValue]);

  return (
    <Router>
      <div data-test="appComponent">
        <Switch>
          <UserContext.Provider value={value}>
            <Nav />
            <Route path="/" exact component={Home} />
            <Route path="/add" component={AddWish} />
            <Route path="/wishlist" exact component={UserWishlist} />
            <Route path="/wishlist/claim/:id" component={PublicClaimList} />
            <Route path="/wishlist/edit/:id" component={Edit} />
            <Route path="/login" exact component={LoginUser} />
            <Route path="/login/create" component={AddAccount} />
          </UserContext.Provider>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
