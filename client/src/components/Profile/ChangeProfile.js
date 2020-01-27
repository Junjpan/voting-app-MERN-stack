import React, { Component } from 'react';
import { Spring } from 'react-spring/renderprops';

//Have to use class compoent here instead of functional compoent because if you use functional compoent, everytime you input something in the input filed, the image size will change as well.
class ChangeProfile extends Component {
    state={
        updateurl:""
    }

    changeURL=(e)=>{
     this.setState({updateurl:e.target.value})
    }

    render() {
        const default_image_url='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png';
        return (
            <Spring from={{opacity:0,color:"white"}} to={{opacity:1,color:"black"}} config={{delay:200,duration:1500}}>{props=>(
<div style={props} className="profile">
                <h2 className="profiletitle">{this.props.user}</h2>                
                <img className="profileimage" src={this.props.url} alt="profile" /><br/><br/>                
                    <label htmlFor="updateurl">Update Profile Url: </label><br/>
                    <span style={{fontSize:"13px"}}>(Such as https://images.unsplash.com/XXXXXX, make sure the image is in the readable format.)</span>
                    <input type="text" id="updateurl" name="updateurl" style={{width:"95%"}} onChange={this.changeURL}></input><br/>
                    <button onClick={()=>this.props.updateUrl(this.state.updateurl)}>Update</button>
                    <button onClick={()=>this.props.updateUrl(default_image_url)}>Default Image</button>
                    <button onClick={()=>this.props.back()}>Back</button>
            </div>
            )}            
            </Spring>
        )
    }
}

export default ChangeProfile;
