import React from 'react';
import axios from 'axios';

function PollOption(props) {
    const poll = props.poll;

    function deletePoll(id){
        console.log(id)
        axios.delete('/api/poll/'+id)
            .then(res=>props.message(res.data,true,props.index))
            .catch(err=>props.message(err.response.data,false))
    }
    return (
        <div className="polloption">
            <div style={{display:"flex",justifyContent:"space-around"}}>
            <h3>{poll.subject}</h3>
            <button className="deleteBTN2" onClick={()=>deletePoll(poll._id)}>X</button>
            </div>
            <button>Add an Option</button>
            <div style={{display:"flex",flexWrap:"wrap"}}>{poll.options.map((option, index) => {
                return (<div key={index} style={{display:"block" ,width:"100px", margin:"auto"}}>
                    <p >{option.option}</p>
                    <p style={{color:"red"}}>{option.vote}</p>
                </div>)
            })}</div>
        </div>
    )
}

export default PollOption;