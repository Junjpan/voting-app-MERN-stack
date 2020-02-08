import React from 'react'

function Options(props) {
    return (
        <ol style={{display:"flex",flexWrap:"wrap"}}>
            {props.options.map((option,index)=>{
            return(<li className="option" key={index}>{option}<button className="deleteBTN" onClick={()=>props.deleteOption(index)}>X</button></li>)
            })}
        </ol>
    )
}

export default Options;
