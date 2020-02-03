import React, { useState } from 'react';
import axios from 'axios';
import { Spring } from 'react-spring/renderprops';

function PollOption(props) {
    const poll = props.poll;
    const [addstatus, setAddstatus] = useState(false);
    const [newOption, setNewOption]=useState('');

    function deletePoll(id) {
        console.log(id)
        axios.delete('/api/poll/' + id)
            .then(res => props.message(res.data, true, props.index))
            .catch(err => props.message(err.response.data, false))
    }

    function addOption() {
        setAddstatus(false);
        //console.log(poll._id,newOption);
        const newOne={
          "poll_id":poll._id,
          newoption:newOption
        }
        poll.options.push({option:newOption,vote:0})
        axios.post('/api/poll/options/add',newOne)
             .then(res=>props.message(res.data))
             .catch(err=>{poll.options.pop()
             props.message(err.response.data)})//if update the options is fail, delete the new option,

    }

    return (
        <div className="polloption">
            <div style={{ display: "flex", justifyContent: "space-around" }}>
                <h3>{poll.subject}</h3>
                <button className="deleteBTN2" onClick={() => deletePoll(poll._id)}>X</button>
            </div>
            <button onClick={() => setAddstatus(true)}>Add an Option</button>
            <div style={{ display: "flex", flexWrap: "wrap" }}>{poll.options.map((option, index) => {
                return (<div key={index} style={{ display: "block", width: "100px", margin: "auto" }}>
                    <p >{option.option}</p>
                    <p style={{ color: "red" }}>{option.vote}</p>
                </div>)
            })}</div>
            {addstatus ? (<Spring from={{opacity:0}} to={{opacity:1}} config={{delay:500,duration:1000}}>{(props)=>(<div style={props} className="addOption">
                <input type="text" name="addoption" id="addoption" placeholder="Add a new option..." onChange={(e)=>{setNewOption(e.target.value)}} /><br/>
                <button onClick={addOption}>Add</button>
                <button onClick={()=>setAddstatus(false)}>Cancel</button>
        </div>)}</Spring>) : null}
        </div>
    )
}

export default PollOption;