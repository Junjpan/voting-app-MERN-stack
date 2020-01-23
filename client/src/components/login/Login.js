import React ,{useState} from 'react';
import {Link} from 'react-router-dom';

function Login(props){
    
    const [user,setUser]=useState('');
    const [password,setPassword]=useState('');

    function submit(e){
        e.preventDefault();
        console.log(user,password);
        // todo: if password is correct, send username,else throw err
        props.status(user);
    }

    return (
        <div className="login">
            <h2 className="logintitle">Member Login</h2>
            <div>
                <form onSubmit={submit}>
                <label htmlFor="username">Username:</label><br/>
                <input type="text" id="username" name="username" required onChange={e=>{setUser(e.target.value)}}></input><br/><br/>
                <label htmlFor="password">Password:</label><br/>
                <input type="password" id="password" name="password" onChange={e=>{setPassword(e.target.value) }} required></input> <br/> <br/>              
                <button type="submit" style={{background:"rgb(203, 233, 252)"}}>LOGIN</button>required
                </form>
            </div>
            <hr/>
            <div>
             <Link to="/register">Register</Link> to be a memeber and make your own poll   
            </div>
        </div>
    )
}

export default Login;