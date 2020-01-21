import React, { Component } from 'react';
import './App.css';
import Login from './components/login/Login';
import Panel from './components/panel/Panel';

class App extends Component{

  render(){
    return (
      <div >      
            <h1 className="title">Universal Voting Board</h1>
            <div className="App"  style={{display:"flex",flexWrap:"wrap"}}>
              <Login />
              <Panel />
            </div>
      </div>
    );
  }

}


export default App;
