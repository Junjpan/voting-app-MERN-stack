import React, { Component } from 'react';
import { Prompt } from 'react-router-dom';
import Options from './../options/Options';
import axios from 'axios';

class Newpoll extends Component {

    state = {
        username: this.props.match.params.username,
        url: localStorage.getItem('url'),
        subject: '',
        option:'',
        options: [],
        isEnter: false
    }

    change = async(e) => {
     await   this.setState({ [e.target.name]: e.target.value });
        if (this.state.option.length >0||this.state.subject.length>0||this.state.options.length>0) {
            this.setState({ isEnter: true })
        }
        
    }

    add=()=>{
        this.setState({options:[...this.state.options,this.state.option]});
        this.setState({option:""});//clear up the input field
    }

    deleteOption=(index)=>{
        this.setState({
            options:this.state.options.filter((option,i)=>{
                return i!==index
            })
        })

    }
    submitPoll=(e)=>{
        e.preventDefault();
        this.setState({isEnter: false})
        if (this.state.options.length<2){
            alert("Sorry, you have to enter at least two options before you can submit the post.")
        }else{
            const newPoll={
                title:this.state.subject,
                options:this.state.options,
                username:this.state.username
            };

            console.log(newPoll)

        }
    }

    render() {
        return (
            <div className="newpoll" >
                <div style={{ display: "flex" }} >
                    <div><img src={this.state.url} alt="profile" className="profile_new" /></div>
                    <div>
                        <h2 className="username">{this.state.username}</h2>
                        <button className="profileBTN" onClick={() => { this.props.history.go(-1) }}>Back</button>
                    </div>
                </div>
                <div style={{ margin: "auto" }} >
                    <h3 className="subtitle">Create a New Poll</h3><br />
                    <form className="newPoll_form" onSubmit={this.submitPoll}>
                        <label htmlFor="subject">Subject:</label><br />
                        <input type="text" onChange={this.change} name="subject" id="subject" required /><br />
                        <label htmlFor="option">Options</label><br />
                        <Options options={this.state.options} deleteOption={this.deleteOption} />
                        <div style={{ display: "flex"}}>
                            <input type="text" onChange={this.change} name="option" id="option" value={this.state.option}  />
                            <button onClick={this.add} className="plus" type="button">+</button>
                        </div>
                        <br/>
                        <button className="profileBTN" type="submit" style={{margin:"20px auto"}}>POST</button>
                    </form>

                </div>
                <Prompt when={this.state.isEnter} message="Are you sure that you want to leave this page? Your data will not be saved." />
            </div>

        )
    }

}




export default Newpoll;
