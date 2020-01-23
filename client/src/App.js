import React, { Component } from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Redirect}  from 'react-router-dom';
import axios from 'axios';
import Login from './components/login/Login';
import Panel from './components/panel/Panel';
import Register from './components/register/Register';


//set up a gobal axios defaults
axios.defaults.baseURL='http://localhost:5000';

class App extends Component{

  state={
    user:'',
    loginStatus:false,
    msgClosed:true,
    message:""
  }

  //if you are not using arrow function, you have to bind this when you are using this function in the render.
  getStatus=(username)=>{ 
   if(username!==''){

     this.setState({user:username,
                    loginStatus:true,
                   message:`${username}, you are sucessully logged in!`,
                   msgClosed:false})
   }
  }

  message=(msg)=>{
    this.setState({message:msg,
                  msgClosed:false })
  }

  render(){
    const msgStyle=this.state.msgClosed? {visibility:"hidden"} :{display:"flex"}
    return (
      <Router>      
            <h1 className="title">Universal Voting Board</h1> 
            <div className="message" style={msgStyle}>
    <p style={{color:"red"}}>{this.state.message}</p> 
            <button style={{width:"30px",marginTop:"10px",marginLeft:"20px"}} onClick={()=>{this.setState({msgClosed:true})}}>X</button>
            </div>
            <Route path="/" exact render={()=>{
              return (<div className="App"  style={{display:"flex",flexWrap:"wrap"}}>
              <Login status={this.getStatus}/>
              <Panel />
            </div>)
            }} />
            <Route path="/register" exact render={()=>{return <Register message={this.message} />}} />
      </Router>
    );
  }

}


export default App;
