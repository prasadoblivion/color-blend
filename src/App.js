import React, { Component } from "react";
import { connect } from "react-redux";
import "./App.scss";
import Topnav from "./components/topnav/topnav";
import Preview from "./components/preview/preview";
import Controlpanel from "./components/controlPanel/controlPanel";
import { ChromePicker } from "react-color";
import { hexToRgb } from "./utilities/rgbToHex";
// import {SortableContainer, SortableElement} from 'react-sortable-hoc';

class App extends Component {
  // state = {
  //   background: []
  // };

  // dynamicBackgroundColors = [];

  handleChangeComplete = (color, index, targetEle) => {
    const dynamicBackgroundColors = [...this.props.colorList];
    dynamicBackgroundColors[index].r = color.rgb.r;
    dynamicBackgroundColors[index].g = color.rgb.g;
    dynamicBackgroundColors[index].b = color.rgb.b;
    dynamicBackgroundColors[index].a = color.rgb.a;

    document.getElementById(targetEle).style.backgroundColor = `rgba(${color.rgb.r},${color.rgb.g},${color.rgb.b},${color.rgb.a})`;
    this.props.onColorChange(dynamicBackgroundColors);
  };

  handleAddColor = () => {
    var randomColor = "#000000".replace(/0/g, function() {
      return (~~(Math.random() * 16)).toString(16);
    });

    const initialColors = this.props.colorList;
    const newColors = [...initialColors, { r: hexToRgb(randomColor).r, g: hexToRgb(randomColor).g, b: hexToRgb(randomColor).b, a: 1 }];

    this.props.onAddColor(newColors);
  };

  render() {
    const colorPickers = this.props.colorList.map((item, index) => {
      return (
        <ChromePicker
          color={this.props.colorList[index]}
          onChange={color => {
            this.handleChangeComplete(color, index, "colorPicker_" + index);
          }}
          key={index}
        />
      );
    });

    return (
      <div className="App">
        <header>
          <Topnav />
        </header>
        <main>
          <Preview />
          <Controlpanel />
          <div className="color-picker-container">{colorPickers}</div>
          <button onClick={this.handleAddColor}>Add</button>
        </main>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    colorList: state[0].colorList
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAddColor: inputData => {
      dispatch({ type: "ADD_COLOR", payload: inputData });
    },
    onColorChange: inputData => {
      dispatch({ type: "UPDATE_COLOR", payload: inputData });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
