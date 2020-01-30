import React from 'react'

function Options(props) {
    return (
        <ul style={{display:"flex",flexWrap:"wrap"}}>
            {props.options.map((option,index)=>{
            return(<li className="option" key={index}>{index+1}.{option}<button className="deleteBTN" onClick={()=>props.deleteOption(index)}>X</button></li>)
            })}
        </ul>
    )
}

export default Options;
