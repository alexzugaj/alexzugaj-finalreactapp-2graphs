import React,{Component} from 'react';
import * as d3 from "d3";
class Child1 extends Component {
  constructor(props){
    super(props)
    this.state={}
  }
  componentDidMount(){
    console.log(this.props.data1);
  }
  componentDidUpdate() {
    var margin = { top: 10, right: 10, bottom: 30, left: 20 },
    w = 500 - margin.left - margin.right,
    h = 300 - margin.top - margin.bottom;

    var data = this.props.data1;

    var temp_data = d3.flatRollup(
        data,
        (d) => d.length,
        (d) => d.category
      );

    var x_data = temp_data.map((item) => item[0]);

    var container = d3
      .select(".child1_svg")
      .attr("width", w + margin.left + margin.right)
      .attr("height", h + margin.top + margin.bottom)
      .select(".g_1")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    var x_scale = d3
      .scaleBand()
      .domain(x_data)
      .range([margin.left, w])
      .padding(0.2);

    container
      .selectAll(".x_axis_g")
      .data([0])
      .join("g")
      .attr("class", "x_axis_g")
      .attr("transform", `translate(0, ${h})`)
      .call(d3.axisBottom(x_scale));

    var y_data = temp_data.map((item) => item[1]);
    var y_scale = d3
    .scaleLinear()
    .domain([0, d3.max(y_data)])
    .range([h, 0]);
    container
      .selectAll("rect")
      .data(temp_data)
      .enter()
      .append("rect")
      .attr("x", function (d) {
        return x_scale(d[0]);
      })
      .attr("y", function (d) {
        return y_scale(d[1]);
      })
      .attr("width", x_scale.bandwidth())
      .attr("height", function (d) {
        return h - y_scale(d[1]);
      })
      .attr("fill", "#69b3a2");
      
  }

  render(){
    return <div>
      <svg className='child1_svg'>
        <g className="g_1"></g>
    </svg>
    </div>
  }
}

export default Child1