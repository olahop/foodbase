import React from "react";
import { connect } from "react-redux";
import Plotly from "plotly.js/dist/plotly-cartesian";
import createPlotlyComponent from "react-plotlyjs";
import Select from "react-select";
import "./Graphics.css";

const PlotlyComponent = createPlotlyComponent(Plotly);


export class Graphics extends React.Component {

  state = {
    data: [],                 // holds the tabledata from the redux store
    productNames: [],         // holds the names of the active tabledata
    fat: [],                  // holds the fat values of the active tabledata
    proteins: [],             // holds the protein values of the active tabledata
    carbohydrates: [],        // holds the carbohydrates values of the active tabledata
    xAxis: [],                // holds the values of the active x-axis
    yAxis: [],                // holds the values of the active y-axis
    xAxisTitle: "Proteins",   // holds the name of the active x-axis values
    yAxisTitle: "Proteins"    // holds the name of the active y-axis values
  }

  // checks if the table data has changed and updates it if necessary
  componentDidUpdate(){
    if(this.state.data !== this.props.data) {
      this.setState({ data: this.props.data });
      this.configurateData();
    }
  }

  // gives imported data from store the preffered format to work with
  configurateData = async() => {
    const data = this.props.data;
    let nameList = [];
    let fatList = [];
    let carbList = [];
    let protList = [];
    data.forEach((food) => {
      nameList.push(food.Name);
      fatList.push(food.Fat);
      protList.push(food.Protein);
      carbList.push(food.Carbohydrates);
    });
    this.setState({
      productNames: nameList,
      fat: fatList, 
      proteins: protList, 
      carbohydrates: carbList,
      xAxis: protList,
      yAxis: protList
    })
  }

  // change the chosen x axis values to render
  handleSelectX = event => {
    const { fat, carbohydrates, proteins } = this.state;
    const selectedValue = event.value;
    this.setState({ xAxisTitle: event.value });
    if (selectedValue === "Fat") this.setState({xAxis: fat});
    if (selectedValue === "Carbohydrates") this.setState({xAxis: carbohydrates});
    if (selectedValue === "Proteins") this.setState({xAxis: proteins});
  };

  // change the chosen x axis values to render
  handleSelectY = event => {
    const { fat, carbohydrates, proteins } = this.state;
    const selectedValue = event.value;
    this.setState({ yAxisTitle: event.value });
    if (selectedValue === "Fat") this.setState({yAxis: fat});
    if (selectedValue === "Carbohydrates") this.setState({yAxis: carbohydrates});
    if (selectedValue === "Proteins") this.setState({yAxis: proteins});
  };

  render(){
    const data = [{
      x: this.state.xAxis,
      y: this.state.yAxis,
      mode: "markers",
      marker: {
        size: 5,
        opacity: 0.8,
        text:this.state.productNames
      },
      text: this.state.productNames,
      textposition: "top center",
      type: "scatter"
    }];

    const layout = {
      xaxis: {
        title: {
          text: this.state.xAxisTitle
        }
      },
      yaxis: {
        title: {
          text: this.state.yAxisTitle
        }
      }
    }
    const options = [
      { value: "Proteins", label: "Proteins" },
      { value: "Carbohydrates", label: "Carbohydrates" },
      { value: "Fat", label: "Fat" },
    ]
    return (
      <>
      <h1 className="graphHeader">Nutritional Content Relationship Plot</h1>
      <div className="modalContainer">
        <div classname = "plotContainer">
          <PlotlyComponent className="scatterPlot" data={data} layout={layout} />
        </div>
        <div className="axisSelection">
          <div className="xSelector">
            <span className="selectorHeader">Select X</span>
            <Select 
              className="select"
              options={options} 
              onChange={this.handleSelectX}
            />
          </div>
          <div className="ySelector">
            <span className="selectorHeader">Select Y</span><br></br>
            <Select 
              className="select"
              options={options} 
              onChange={this.handleSelectY}
            />
          </div>
        </div>
      </div>
      </>
    );
  }
}

const mapStateToProps = state => ({
  data: state.data,
});

export default connect(mapStateToProps)(Graphics)
