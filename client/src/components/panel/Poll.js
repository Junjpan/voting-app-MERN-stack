import React,{useState} from 'react';
import PublicOption from './PublicOption';
import Chart from '../PrivatePanel/Chart';

function Poll(props) {
    /*Todo onTouchStart which allows the panes to swap on touch screens-onTouchStart="this.classList.toggle('hover');*/
    const [optionId,setOptionId]=useState('');
    
    function vote(e){
      e.preventDefault(); 
        props.vote(optionId);
    }

    return (
        <div className="flip-container">
            <div className="flipper">
                <div className="front">
                    <h3>{props.poll.subject}</h3>
                    <h5><span>User:</span> {props.poll.username}</h5>
                    <hr style={{ width: "50%", opacity: "0.5" }} />
                    <Chart data={props.poll} />
                </div>
                <div className="back">
                    <form onSubmit={vote}>
                        <label>I'd like to vote for...</label>
                        <select style={{width:"150px"}} onChange={(e)=>{setOptionId(e.target.value)}}>
                            <option value={'null'}>Your Options:</option>
                            {props.poll.options.map((option, index) => {
                                return (<option value={option._id} key={index}>{option.option}</option>)
                            })}
                        </select><br/>
                        <button type="submit" style={{width:"50px",color:"#123333",marginTop:"8px",background:"#339b9b"}}>Vote</button>
                    </form>
                    <hr style={{width:"90%",opacity:"0.5"}}/>
                    <div style={{ display: "flex", flexWrap: "wrap" }}>
                        {props.poll.options.map((option, index) => {
                            return (<PublicOption key={index} option={option} />)
                        })}</div>
                </div>
            </div>
        </div>
    )
}

export default Poll
