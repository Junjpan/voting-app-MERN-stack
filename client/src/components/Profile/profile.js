import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import ChangeProfile from './ChangeProfile';
import axios from 'axios';
import {Spring} from 'react-spring/renderprops';
import validUrl from 'valid-url';

function Profile(props) {
    const [user, setUser] = useState('');
    const [url, setUrl] = useState('https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png')
    const [status, setStatus] = useState(false);

    useEffect(() => {
        let username = localStorage.getItem('user');
        let imageurl = localStorage.getItem('url');
        setUser(username);
        setUrl(imageurl)
    }, [])

    function signout() {
        localStorage.clear();
        props.status("undefined");
    }

    function updateUrl(update_url){
        //make sure it is a valid URL.
        if (validUrl.isUri(update_url)){
            setUrl(update_url);
            localStorage.setItem('url',update_url)
        axios.put(`/api/user/${user}/url`,{img_url:update_url})
             .then(res=>props.message('The image url has been updated'))
             .catch(err=> props.message(err.response.data))
        }else{
            props.message("It's incorrect URL")
        }
        
    }

    function back(){
        setStatus(false);
    }

    function setPrivate(){
        props.setPrivateView(true)
    }
   

    function profile(){
        return (
            <Spring from={{opacity:0,background:"black"}} to={{opacity:1,background:"#339b9b"}} config={{delay:200,duration:2000}}>{
             props=>(<div className="profile" style={props} >
             <h2 className="profiletitle">{user}</h2>
             <div>
                 <img className="profileimage" src={url} alt="profile" />
                 <hr />
                 <div style={{ display: "flex", flexWrap: "wrap" }}>
                     <Link to ="/" className="profileBTN"><button  onClick={()=>{setStatus(true)}}>Change Profile</button></Link>
                     <Link to="/" className="profileBTN"><button>Main Page</button></Link>
                     <Link to="/" className="profileBTN"><button onClick={setPrivate} >View My Polls</button></Link>           
                     <Link to={`/new/${user}`} className="profileBTN"><button>Start a New Poll</button></Link>
                     <button className="profileBTN" style={{ color: "red" }} onClick={signout}>Sign Out</button>
                 </div>
             </div>
         </div>)
            }      
            </Spring>
        )
    }

    return (
        <React.Fragment>
            {status ? <ChangeProfile user={user} url={url} updateUrl={updateUrl} back={back} />: profile()}
        </React.Fragment>
    )
}

export default Profile
