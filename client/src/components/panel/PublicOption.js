import React, { Component } from 'react'

class PublicOption extends Component {
    render() {
        return (
            <div style={{display:"block",width:"100px"}}>
                <h4>{this.props.option.option}</h4>
                <p style={{textWeight:"bold",fontSize:"25px"}}>{this.props.option.vote}</p>
            </div>
        )
    }
}

export default PublicOption
