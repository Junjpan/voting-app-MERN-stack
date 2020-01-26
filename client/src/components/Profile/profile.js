import React, { useState, useEffect } from 'react';



function Profile(props) {
    const [user, setUser] = useState('');
    const [url,setUrl]=useState('https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png')

    useEffect(() => {
        let username = localStorage.getItem('user');
        let imageurl=localStorage.getItem('url')
        setUser(username);
        setUrl(imageurl)
    }, [])

   function signout(){
        localStorage.clear();
        props.status("undefined");
    }

    return (
        <div className="profile">
            <h2 className="profiletitle">{user}</h2>
            <div style={{display:"flex"}}>
            <img className="profileimage" src={url} alt="profile" />
            <div style={{display:"flex",flexWrap:"wrap"}}>
                <button className="profileBTN">Change Profile Picture</button>
                <button className="profileBTN">Start a New Poll</button>
                <button className="profileBTN">View My Polls</button>
                <button className="profileBTN" style={{color:"red"}} onClick={signout}>Sign Out</button>
            </div>
            </div>
            
        </div>
    )
}

export default Profile
