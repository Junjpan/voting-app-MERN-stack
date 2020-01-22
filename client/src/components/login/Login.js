import React ,{useState} from 'react';

function Login() {
    const [user,setUser]=useState('');
    const [password,setPassword]=useState('');

    function submit(e){
        e.preventDefault();
        console.log(user,password);
    }

    return (
        <div className="login">
            <h2 className="logintitle">Member Login</h2>
            <div>
                <form onSubmit={submit}>
                <label htmlFor="username">Username:</label><br/>
                <input type="text" id="username" name="username" onChange={e=>{setUser(e.target.value)}}></input><br/>
                <label htmlFor="password">Password:</label><br/>
                <input type="password" id="password" name="password" onChange={e=>{setPassword(e.target.value)}}></input> <br/> <br/>              
                <button type="submit" style={{background:"rgb(203, 233, 252)"}}>LOGIN</button>
                </form>
            </div>
            <hr/>
            <div>
            </div>
        </div>
    )
}

export default Login;