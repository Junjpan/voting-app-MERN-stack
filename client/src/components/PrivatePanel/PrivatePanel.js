import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import PollOption from './PollOption';


function PrivatePanel(props) {
    const [myPolls, setMyPolls] = useState([]);
    const [user] = useState(props.user);
    const [msg, setMsg] = useState('');

    useEffect(() => {
        axios.get('/api/poll/' + user)
            .then(res => { 
               //console.log(res.data); 
                setMyPolls(res.data) })
            .catch(err => setMsg(err.response.data))
    }, [user])

    async function message(message, success, i) {
        //update the polls lists after the deletion
        if (success === true) {
            let UpdatePolls = myPolls.filter((poll, index) => {
                return index !== i
            })
            setMyPolls(UpdatePolls);
        }
    await    setMsg(message);
        setTimeout(()=>{
            setMsg('')
        },3000);//message will be gone after 3 seconds.
    }

    return (
        <div className="privatepanel">
            <div style={{display:"inline-flex"}}>
            <p style={{ color: "red",height:"15px" ,width:"150px"}}>{msg}</p>
            <p>Total Polls:<span style={{color:"blue",fontWeight:"bold",paddingLeft:"5px"}}>{myPolls.length}</span></p>        
            </div>
            <hr />
            <div className="optionsWindow">
                {myPolls.map((poll, index) => {
                    return (<PollOption key={index} poll={poll} index={index} message={message} />)
                })}
        <div className="polloption"><Link to={`/new/${user}`} style={{textDecoration:"none"}}><p style={{fontSize:"70px",color:"#339b9b",textAlign:"center"}}>+</p></Link></div>
            </div>
        </div>
    )
}


export default PrivatePanel;