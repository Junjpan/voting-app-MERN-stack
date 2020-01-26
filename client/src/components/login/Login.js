import React ,{useState} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

function Login(props){
    
    const [user,setUser]=useState('');
    const [password,setPassword]=useState('');

    function submit(e){
        e.preventDefault();
        axios.get('/api/user/login',{params:{username:user,password:password}})
            .then(res=>{
                localStorage.setItem("user",user);
                localStorage.setItem("url",res.data.url);
                props.status(user);
                //if you want to store an object,you can use localStorage.setItem('objname',JSON.stringify(obj));
                //To retrieve the object, you use JSON.parse(localStorage.getItem('objname'))
            })
            .catch(err=>{
                props.message(err.response.data)
            })
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
                <button type="submit" style={{background:"rgb(203, 233, 252)"}}>LOGIN</button>
                </form>
            </div>
            <hr/>
            <div>
             <Link to="/register"><b>Sign up</b></Link> to be a memeber and make your own poll   
            </div>
        </div>
    )
}

export default Login;