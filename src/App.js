import React, { Component } from "react";
import sample from './data/SampleDataset.csv';
import * as d3 from "d3";
import Child1 from "./Child1"
import Child2 from "./Child2"

class App extends Component {
  constructor(props){
    super(props)
    this.state={data:[]};
    }
  
  
  componentDidMount() {
    var self=this
    d3.csv(sample,function(d){
      return{
        x: parseInt(d.x),
        y: parseInt(d.y),
        category: d.category
      }
    }).then(function(csv_data){
      self.setState({data:csv_data})
      //console.log(csv_data)
    })
    .catch(function(err){
      console.log(err)
    })
  }

  componentDidUpdate() {
    console.log(this.state.data);
    
  }

  render() {
    const {data} = this.state;
    return (
      <div className='parent'>
        <div className='child1'><Child1 data1={this.state.data}></Child1></div>
        <div className='child2'><Child2 data2={this.state.data}></Child2></div>
      </div>
    );
  }
}

export default App;
