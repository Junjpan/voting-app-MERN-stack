import React, { Component } from 'react';
import axios from 'axios';
import Poll from './Poll';

class Panel extends Component {

    state = {
        mounted: false,
        polls: [],
        vote: false
    }

    componentDidMount() {
        axios.get('/api/poll/public/all')
            .then(res => {
                //console.log(res.data);
                this.setState({
                    polls: res.data,
                    mounted: true
                })
            })
            .catch(err => console.log(err.response.data))
    }

    //update right away after the vote was changed
    componentDidUpdate(prevprops, prevstate) {
        //if the vote state is changed, update the post
        if (prevstate.vote !== this.state.vote) {
            axios.get('/api/poll/public/all')
                .then(res => {//console.log(res.data);                        
                    this.setState({
                        polls: res.data
                    })
                })
                .catch(err => console.log(err.response.data))
        }
    }

    //receive vote id
    vote = async (id) => {
        if (id !== 'null') {
            // console.log(id)
            try {
                const res = await axios.put('/api/poll/vote/' + id);
                if (res) {
                    //console.log(res.data)
                    this.setState({ vote: !this.state.vote })// To activate the componentdidupdate
                }
            } catch (err) {
                this.props.message('Sorry, you can only vote once per poll.')
            }
        }
    }
    render() {
        return (
            <div className="panel">
                {this.state.mounted ? (
                    <div>
                        <span style={{ textDecoration: "underline" }}>Hover over to vote</span>
                        <div className="optionsWindow">
                            {this.state.polls.map((poll, index) => {
                                return (<Poll key={index} poll={poll} vote={this.vote} />)
                            })}
                        </div>
                    </div>
                ) : (<div>{this.state.polls.length===0?<div>There are curenttly no polls available for vote</div>:<div style={{ textAlign: "center" }}><h3>Loading data...</h3><div className="loading_outer"><p className="loading_inner"></p></div></div>}</div>)}
                <p className="subMessage">Share Your Opinions, Vote Now!</p>
            </div>
        )
    }
}

export default Panel;
