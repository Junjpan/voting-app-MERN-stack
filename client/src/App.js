import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import axios from 'axios';
import Login from './components/login/Login';
import Panel from './components/panel/Panel';
import Register from './components/register/Register';
import Profile from './components/Profile/profile';
import NewPoll from './components/NewPoll/Newpoll';
import PrivatePanel from './components/PrivatePanel/PrivatePanel';



//set up a gobal axios defaults
axios.defaults.baseURL = 'http://localhost:5000';

class App extends Component {

  state = {
    user: '',
    loginStatus: false,//control the left panel view
    msgClosed: true,
    privateView: false,//control the right panel view
    message: ""
  }

  //check if the localstorage has user name item, if it is, the page will be still in the login mode even user is accidently close the website.
  componentDidMount() {
    const username = localStorage.getItem('user');
    //prevent people change localstorage username,double check with server,make sure has such a user.
    if (localStorage.getItem('user')) {
      axios.get(`/api/user/${username}`)
        .then(res => {
          this.setState({
            loginStatus: true,
            user: username
          })
        })
        .catch(err => {
          localStorage.clear();
        })
    }
  }


  //if you are not using arrow function, you have to bind this when you are using this function in the render.
  getStatus = (username) => {

    if (username !== "undefined" && username !== null && username !== '') {
      this.setState({
        user: username,
        loginStatus: true,
        message: `${username}, you are sucessully logged in! `,
        msgClosed: false
      })
    } else {
      this.setState({
        user: '',
        loginStatus: false,
        privateView:false,
        message: `You are sucessully logged out! `
      })
    }
  }

  setPrivateView = (boolean) => {
    this.setState({ privateView: boolean });
  }

  //receive/update message
  message = (msg, status) => {
    // for the case when you use click back button
    if (status === "undefined") {
      this.setState({
        message: msg,
        msgClosed: false
      })
    } else {
      this.setState({
        message: msg,
        msgClosed: status
      })
    }
    //when click the back button, message will not be showing.
  }

  signout = () => {
    window.location.href = "/"

    this.setState({
      loginStatus: false,
      message: "You are sucessully logged out! ",
      msgClosed: false,
      privateView:false
    });
    localStorage.clear();
  }

  render() {
    const msgStyle = this.state.msgClosed ? { visibility: "hidden" } : { display: "flex" }
    return (
      <Router>
        <h1 className="title">Universal Voting Board</h1>
        {this.state.loginStatus ? <button className="LogoutBTN" onClick={this.signout}>Sign Out</button> : null}
        <img src="https://kidstaskit.herokuapp.com/static/media/JunEBug.f67dd03a.png" className="logo" alt="logo"></img>
        <div className="message" style={msgStyle}>
          <p style={{ color: "red" }}>{this.state.message}</p>
          <button style={{ width: "30px", marginTop: "10px", marginLeft: "20px" }} onClick={() => { this.setState({ msgClosed: true }) }}>X</button>
        </div>
        <Switch>
          <Route path="/" exact render={() => {
            return (<div className="App" style={{ display: "flex", flexWrap: "wrap" }}>
              {this.state.loginStatus ? <Profile status={this.getStatus} message={this.message} setPrivateView={this.setPrivateView} /> : <Login status={this.getStatus} message={this.message} />}
              {this.state.privateView? <PrivatePanel user={this.state.user} />:<Panel message={this.message}/>}
            </div>)
          }} />
          <Route path="/register" exact render={(props) => { return <Register message={this.message} {...props} /> }} />
          {this.state.loginStatus ? <Route path="/new/:username" exact render={(props) => { return <NewPoll message={this.message} {...props} /> }} /> : <Redirect to="/" />}
          {/* In order to pass the prop object(props.match/props.history etc) to the child component, you have to use props as parameters and put {...props} in the compoent render,just like the above*/}
        </Switch>
      </Router>
    );
  }

}


export default App;
