import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

function Register(props) {
    const [user, setUser] = useState('');
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');

    useEffect(() => {
        props.message('Welcome to register center!')
    }, [])//put an empty array as second parameter will ensure the useEffect only run once.

    function submit(e) {
        e.preventDefault();
        const info = {
            username: user,
            password: password1
        }
        if (password1 !== password2) {
            return props.message("Sorry,the passwords doesn't match, please re-enter again!")

        } else {
            axios.post('/api/user/register', info)
                .then(res => {
                    props.message(res.data.message);
                    setTimeout(()=>{
                        window.location.href="/"
                    },1500)
                })
                .catch(err => {
                   props.message(err.response.data.error);
                })
        }
    }

    return (
        <div className="register">
            <h2 className="registertitle">Create an Account</h2>
            <div>
                <form onSubmit={submit}>
                    <label htmlFor="username">Username (6-12 characters):</label><br />
                    <input type="text" id="username" name="username" onChange={e => { setUser(e.target.value) }} pattern=".{6,12}" title="6 to 12 characters are required" required></input><br /><br />
                    <label htmlFor="password1">Password (6-18 characters):</label><br />
                    <input type="password" id="password1" name="password1" onChange={e => { setPassword1(e.target.value) }} pattern=".{6,18}" title="Password can not be less than 6 character or more than 18 characters" required></input> <br /> <br />
                    <label htmlFor="password2">Re-enter Password:</label><br />
                    <input type="password" id="password2" name="password2" onChange={e => { setPassword2(e.target.value) }} required></input> <br /> <br />
                    <button type="submit" style={{ background: "rgb(203, 233, 252)" }}>Submit</button>
                </form>
            </div>
        </div>
    )
}

export default Register;