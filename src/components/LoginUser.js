import React, { useState, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import UserContext from './UserContext';

function LoginUser() {

    const { userToken, setUserToken } = useContext(UserContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onChangeEmail = (e) => {
        setEmail(e.target.value);
    };
    const onChangePassword = (e) => {
        setPassword(e.target.value);
    };
    const loginUser = (e) => {
        e.preventDefault();

        const user = {
            email,
            password
        };
        //second argument in axios.post is the object
        axios.post('http://localhost:5000/login', user)
            .then(res => {
                if (res.status === 200) {
                    setUserToken(res.data.token);
                    console.log(userToken);
                    //window.location = '/wishlist';
                }
            });
    };

    return (
        <div>
            <h1 className="add__mainheader">LOGIN</h1>
            <form onSubmit={loginUser} className="addForm">
                <div className="form-group">
                    <label className="header">Email</label><br />
                    <input type="text" className="form-control" value={email} onChange={onChangeEmail} />
                </div>
                <div className="form-group">
                    <label className="header">Password</label>
                    <input type="password" className="form-control" value={password} onChange={onChangePassword} />
                </div>
                <button className="btn btn-primary">Log In</button>
                <h3 className="createUserLink">Don't have an account? <br /><span><Link to='login/create'>Create one here.</Link></span></h3>
            </form>
            <p>{userToken}</p>
        </div>
    );
};

export default LoginUser;
