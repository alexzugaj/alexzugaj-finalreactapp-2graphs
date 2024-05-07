import React,{Component} from 'react';
import * as d3 from "d3";
class Child2 extends Component {
  constructor(props){
    super(props)
    this.state={
        selected_cat: {}
    };
  }
  componentDidMount(){

    console.log(this.props.data2);
  }
  componentDidUpdate(){

    
    var margin = { top: 10, right: 10, bottom: 30, left: 20 },
      w = 500 - margin.left - margin.right,
      h = 300 - margin.top - margin.bottom;

    var container = d3.select(".child2_svg")
    .attr("width", w + margin.left + margin.right)
    .attr("height", h + margin.top + margin.bottom)
    .select(".g_2")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

    var data=this.props.data2;

    var x_data=data.map(item=>item.x)
    const x_scale = d3.scaleLinear().domain([0,d3.max(x_data)]).range([margin.left, w]);
    container.selectAll(".x_axis_g").data([0]).join('g').attr("class",'x_axis_g')
    .attr("transform", `translate(0,${h})`).call(d3.axisBottom(x_scale));

    var y_data=data.map(item=>item.y)
    const y_scale = d3.scaleLinear().domain([0,d3.max(y_data)]).range([h, 0]);
    container.selectAll(".y_axis_g").data([0]).join('g').attr("class",'y_axis_g')
    .attr("transform", `translate(${margin.left},0)`).call(d3.axisLeft(y_scale));

    var tooltip=d3.select("body")
      .selectAll(".tooltip_div")
      .data([0])  // binds a single element to the tooltip
      .join("div")  // joins the data to a div element
      .attr("class", "tooltip_div")  // adds a CSS class for styling
      .style("position", "absolute")  // uses absolute positioning
      .style("visibility", "hidden");  // starts as hidd

    container.selectAll("circle")
        .data(data)    
        .join("circle")
        
        //.datum(data.filter(function (d) {return d.category==this.state.selected_cat}))
        .attr("cx", function(d){
            return x_scale(d.x);
        })
        .attr("cy", function(d){
            return y_scale(d.y);
        })
        .attr("r",3)
        .style("fill", "#69b3a2")
        .on("mouseover", (event,d)=>{
            tooltip.text(`x: ${d.x}, y: ${d.y}`)  // sets the tooltip text to the node's size property
            .style("visibility", "visible");  // makes the tooltip visible
          })
          .on("mousemove", (event) =>{
            tooltip.style("top", event.pageY - 10 + "px").style("left", event.pageX + 10 + "px");
          })
          .on("mouseout", (event) =>{
            tooltip.style("visibility", "hidden")
          });

    
  }
  render(){
    return <div>
        <select className = 'select_button'>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
        </select>
        <svg className='child2_svg'>
            <g className="g_2"></g>
        </svg>
    </div>
  }
}

export default Child2