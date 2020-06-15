import React, {useState} from 'react';
import axios from 'axios';

function AddAccount() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [nameAlert, setNameAlert] = useState(false);
    const [passwordAlert, setPasswordAlert] = useState(false);
    const [addAlert, setAddAlert] = useState(false);
    const [disabled, setDisabled] = useState(false);

    const onChangeName = (e) => {
        setName(e.target.value)
    };
    const onChangeEmail = (e) => {
        setEmail(e.target.value)
    };
    const onChangePassword = (e) => {
        setPassword(e.target.value)
    };
    const addUser = (e) => {
        e.preventDefault();

        const user = {
            name,
            email,
            password
        };

        if (name.length === 0) {
            return setNameAlert(true);
        } else {
            setNameAlert(false);
        }

        if (password.length < 6 || password.includes('password')) {
            return setPasswordAlert(true);
        } else {
            setPasswordAlert(false);
        }
        //second argument in axios.post is the object
        axios.post('http://localhost:5000/login/create', user)
            .then(res => console.log(res.data))
            .then(
                setDisabled(true),
                setAddAlert(true)
            );
    }

    return (
        <div>
            <h1 className="add__mainheader">CREATE ACCOUNT</h1>
            <form onSubmit={addUser} className="addForm">
                <div className="form-group">
                    <label className="header">Name</label><br />
                    <input type="text" className="form-control" value={name} onChange={onChangeName} />
                    {nameAlert && <p className="formAlert">*Name is required</p>}
                </div>
                <div className="form-group">
                    <label className="header">Email</label><br />
                    <input type="text" className="form-control" value={email} onChange={onChangeEmail} />
                </div>
                <div className="form-group">
                    <label className="header">Password</label>
                    <input type="password" className="form-control" value={password} onChange={onChangePassword} />
                    {passwordAlert && <p className="formAlert">*Passwords must be 6 characters or more. Cannot contain the word 'password'.</p>}
                </div>
                {addAlert && <p>Account created!</p>}
                <button className="btn btn-primary" disabled={disabled}>Create Account</button>
            </form>
        </div>
    )
}

export default AddAccount;
