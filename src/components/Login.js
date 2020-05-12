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
        console.log(user);

        //second argument in axios.post is the object
        axios.post('http://localhost:5000/login', user)
            .then(res => console.log('User logged in!'))
            .catch(err => console.log('Invalid login: ' + err));
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
                        {this.state.passwordAlert && <p className="formAlert">*Passwords must be 6 characters or more. Cannot contain the word 'password'.</p>}
                    </div>
                    <button className="btn btn-primary">Log In</button>
                    <h3 className="createUserLink">Don't have an account? <br /><span><Link to='login/create'>Create one here.</Link></span></h3>
                </form>
            </div>
        );
    }
};

export default Login;
