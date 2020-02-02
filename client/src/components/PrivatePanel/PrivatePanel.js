import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PollOption from './PollOption';

function PrivatePanel(props) {
    const [myPolls, setMyPolls] = useState([]);
    const [user] = useState(props.user);
    const [msg, setMsg] = useState('');

    useEffect(() => {
        axios.get('/api/poll/' + user)
            .then(res => { console.log(res.data); setMyPolls(res.data) })
            .catch(err => setMsg(err.response.data))
    }, [user])

    function message(message, success, i) {
        //update the polls lists after the deletion
        if (success === true) {
            let UpdatePolls = myPolls.filter((poll, index) => {
                return index !== i
            })
            setMyPolls(UpdatePolls);
        }
        setMsg(message);
    }

    return (
        <div className="privatepanel">
            <p style={{ color: "red" }}>{msg}</p>
            <div className="optionsWindow">
                {myPolls.map((poll, index) => {
                    return (<PollOption key={index} poll={poll} index={index} message={message} />)
                })}
            </div>
        </div>
    )
}


export default PrivatePanel;