import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Login extends React.Component {
    constructor(props) {
        super(props);

        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.loginUser = this.loginUser.bind(this);

        this.state = {
            email: '',
            password: '',
            sessionToken: '',
            loginAlert: false
        };
    };
    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        });
    }
    onChangePassword(e) {
        this.setState({
            password: e.target.value
        });
    }
    loginUser(e) {
        e.preventDefault();

        const user = {
            email: this.state.email,
            password: this.state.password
        };

        //second argument in axios.post is the object
        axios.post('http://localhost:5000/login', user)
            .then(res => {
                if (res.status === 200) {
                    this.setState({
                        sessionToken: res.data.token
                    });
                    console.log(this.state.sessionToken);
                    window.location = '/wishlist';
                } else if (res.status !== 200) {
                    this.setState({
                        loginAlert: true
                    });
                }
            });
    }
    render() {
        return (
            <div>
                <h1 className="add__mainheader">LOGIN</h1>
                <form onSubmit={this.loginUser} className="addForm">
                    <div className="form-group">
                        <label className="header">Email</label><br />
                        <input type="text" className="form-control" value={this.state.email} onChange={this.onChangeEmail} />
                    </div>
                    <div className="form-group">
                        <label className="header">Password</label>
                        <input type="password" className="form-control" value={this.state.password} onChange={this.onChangePassword} />
                    </div>
                    <button className="btn btn-primary">Log In</button>
                    <h3 className="createUserLink">Don't have an account? <br /><span><Link to='login/create'>Create one here.</Link></span></h3>
                    {this.state.loginAlert && <p>Email or password is incorrect.</p>}
                </form>
            </div>
        );
    }
};

export default Login;
