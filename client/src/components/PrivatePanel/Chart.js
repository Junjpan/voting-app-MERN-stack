import React from 'react';
import {Doughnut } from 'react-chartjs-2';


function Chart(props) {

    const poll = props.data;
    const legends=poll.options.map((option)=>{return option.option});
    const data=poll.options.map((option)=>{return option.vote});
    const background=poll.options.map((option,index)=>{
        let number1=Math.round(255*Math.random());
        let number2=Math.round(255*Math.random());
        let number3=Math.round(255*Math.random());
     return   `rgba(${number1},${number2},${number3},0.6)`})
    
   
    const chartdata={
     labels:legends,
     datasets:[{
         label:"color",
         data:data,
         backgroundColor:background
     }]
    }

    return (
        <div>
            <Doughnut
             data={chartdata}
             options={{maintainAspectRation:false}}
          />            
        </div>
    )
}

export default Chart;
