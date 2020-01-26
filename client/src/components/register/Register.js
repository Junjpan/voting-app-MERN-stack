import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Prompt} from 'react-router-dom';

function Register(props) {
    //use props.match.params.<name> to find the params if there are params in the url
    const [user, setUser] = useState('');
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
    const [message,setMessage]=useState('Welcome to register center!');
    const [isBlocking,setIsBlocking]=useState(false);

   
  
    useEffect(() => {
        props.message(message);
    }, [message])//put an empty array as second parameter will ensure the useEffect only run once.
    //place a property inside the array so that whenever the message is change, the useEffect will be called once.
    //have a little bug here, find details in the console.try to fingure out

    function submit(e) {
        e.preventDefault();
        setIsBlocking(false);
        const info = {
            username: user,
            password: password1
        }
        if (password1 !== password2) {
           setMessage("Sorry,the passwords doesn't match, please re-enter again!")
        } else {
            axios.post('/api/user/register', info)
                .then(res => {
                    props.message(res.data.message);
                    setTimeout(()=>{
                        window.location.href="/"
                    },1500)
                })
                .catch(err => {
                   setMessage(err.response.data.error)
                })
        }
    }

   function goBack(){
    props.message('',true) ; 
    props.history.go(-1);

   }

    return (
        <div className="register">
            <h2 className="registertitle">Create an Account</h2>
            <div>
                <form onSubmit={submit}>
                    <label htmlFor="username">Username (6-12 characters):</label><br />
                    <input type="text" id="username" name="username" onChange={e => { setUser(e.target.value);setIsBlocking(e.target.value.length>0)  }} pattern=".{6,12}" title="6 to 12 characters are required" required></input><br /><br />
                    <label htmlFor="password1">Password (6-18 characters):</label><br />
                    <input type="password" id="password1" name="password1" onChange={e => { setPassword1(e.target.value);setIsBlocking(e.target.value.length>0)  }} pattern=".{6,18}" title="Password can not be less than 6 character or more than 18 characters" required></input> <br /> <br />
                    <label htmlFor="password2">Re-enter Password:</label><br />
                    <input type="password" id="password2" name="password2" onChange={e => { setPassword2(e.target.value);setIsBlocking(e.target.value.length>0) }} required></input> <br /> <br />
                    <button type="submit" style={{ background: "rgb(203, 233, 252)" }}>Submit</button>
                    <button type="button" onClick={goBack} style={{ background: "rgb(203, 233, 252)" }}>Back</button>
               {/*props.history.go(-1) perform go back function*/}
                </form>
                <Prompt when={isBlocking} message={location=>`Are you sure you want to go to "${location.pathname}"`} />
           {/*prevent people from leaving the page without submiting the data */}
           </div>
        </div>
    )
}

export default Register;