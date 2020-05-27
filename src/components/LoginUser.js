import React, { useState, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { UserContext } from './UserContext';
import '../App.css';

function LoginUser() {

    const { userValue, setUserValue } = useContext(UserContext);
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

        axios.post('http://localhost:5000/login', user)
            .then(res => {
                if (res.status === 200) {
                    setUserValue([res.data.token, res.data.user._id]);
                    localStorage.setItem('user', userValue);
                }
            });
    };

    return (
        <div>
            <h1 className="add__mainheader">LOGIN</h1>
            <div className="addForm">
                {userValue ?
                    <div>
                        <p>Successfully logged in!</p>
                        <button className="loginBtn btn btn-danger"
                            onClick={(() => {
                                setUserValue(null)
                            })}>Log Out
                        </button>
                    </div>
                    :
                    <div>
                        <form>
                            <div className="form-group">
                                <label className="header">Email</label><br />
                                <input type="text" className="form-control" value={email} onChange={onChangeEmail} />
                            </div>
                            <div className="form-group">
                                <label className="header">Password</label>
                                <input type="password" className="form-control" value={password} onChange={onChangePassword} />
                            </div>
                        </form>
                        <button className="loginBtn btn btn-primary"
                            onClick={loginUser}>Log In
                    </button>
                    </div>
                }
                <h3 className="h3msg">Don't have an account? <br /><span><Link to='login/create'>Create one here.</Link></span></h3>
            </div>

        </div>
    );
};

export default LoginUser;
