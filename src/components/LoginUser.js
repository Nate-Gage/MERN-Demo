import React, { useState, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { UserContext } from './UserContext';
import '../App.css';

function LoginUser() {

    const { userToken, setUserToken } = useContext(UserContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginMsg, setLoginMsg] = useState('');

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
                    setUserToken(res.data.token);
                    setLoginMsg(true);
                }
            });

    };

    return (
        <div>
            <h1 className="add__mainheader">LOGIN</h1>
            <div className="addForm">
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
                {loginMsg && <p>Successfully logged in!</p>}
                {userToken ?
                    <button className="loginBtn btn btn-primary"
                        onClick={(() => {
                            setUserToken(null)
                            setLoginMsg(false)
                        })}>Log Out
                    </button>
                    :
                    <button className="loginBtn btn btn-primary"
                        onClick={loginUser}>Log In
                    </button>
                }
                <h3 className="createUserLink">Don't have an account? <br /><span><Link to='login/create'>Create one here.</Link></span></h3>
            </div>

        </div>
    );
};

export default LoginUser;
