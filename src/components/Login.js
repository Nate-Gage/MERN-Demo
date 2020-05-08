import React, { Component } from 'react';
import axios from 'axios';

class Login extends React.Component {
    constructor(props) {
        super(props);

        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.addUser = this.addUser.bind(this);

        this.state = {
            email: '',
            password: '',
        };
    };
    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        });
    }
    onChangePassword(e) {
        this.setState({
            passowrd: e.target.value
        });
    }
    addUser(e) {
        e.preventDefault();

        const user = {
            email: this.state.email,
            password: this.state.password,
        };

        console.log(user);

        //second argument in axios.post is the object
        axios.post('http://localhost:5000/login', user)
            .then(res => console.log(res.data));

        window.location = '/';
    }
    render() {
        return (
            <div>
                <h1 className="add__mainheader">LOGIN</h1>
                <form onSubmit={this.addUser} className="addForm">
                    <div className="form-group">
                        <label className="header">Email</label><br />
                        <input type="text" className="form-control" value={this.state.email} onChange={this.onChangeEmail} />
                    </div>
                    <div className="form-group">
                        <label className="header">Password</label>
                        <input type="text" className="form-control" value={this.state.password} onChange={this.onChangePassword} />
                    </div>
                    <button>Login</button>
                </form>
            </div>
        );
    }
};

export default Login;
