import React from 'react';
import axios from 'axios';

class AddUser extends React.Component {
    constructor(props) {
        super(props);

        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.addUser = this.addUser.bind(this);

        this.state = {
            name: '',
            email: '',
            password: '',
            nameAlert: false,
            passwordAlert: false,
        };
    };
    onChangeName(e) {
        this.setState({
            name: e.target.value
        });
    }
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
    addUser(e) {
        e.preventDefault();

        const user = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password
        };

        if (this.state.name.length === 0) {
            return this.setState({
                nameAlert: true
            });
        } else {
            this.setState({
                nameAlert: false
            })
        }

        if (this.state.password.length < 6 || this.state.password.includes('password')) {
            return this.setState({
                passwordAlert: true
            });
        } else {
            this.setState({
                passwordAlert: false
            });
        }
        //second argument in axios.post is the object
        axios.post('http://localhost:5000/login/create', user)
            .then(res => console.log(res.data));

        //window.location = '/';
    }
    render() {
        return (
            <div>
                <h1 className="add__mainheader">CREATE ACCOUNT</h1>
                <form onSubmit={this.addUser} className="addForm">
                    <div className="form-group">
                        <label className="header">Name</label><br />
                        <input type="text" className="form-control" value={this.state.name} onChange={this.onChangeName} />
                        {this.state.nameAlert && <p className="formAlert">*Name is required</p>}
                    </div>
                    <div className="form-group">
                        <label className="header">Email</label><br />
                        <input type="text" className="form-control" value={this.state.email} onChange={this.onChangeEmail} />
                    </div>
                    <div className="form-group">
                        <label className="header">Password</label>
                        <input type="password" className="form-control" value={this.state.password} onChange={this.onChangePassword} />
                        {this.state.passwordAlert && <p className="formAlert">*Passwords must be 6 characters or more. Cannot contain the word 'password'.</p>}
                    </div>
                    <button className="btn btn-primary">Create Account</button>
                </form>
            </div>
        );
    }
};

export default AddUser;

