import React, { Component } from "react";
import { connect } from "react-redux";
import "./App.scss";
import Topnav from "./components/topnav/topnav";
import Preview from "./components/preview/preview";
import Controlpanel from "./components/controlPanel/controlPanel";
import { ChromePicker } from "react-color";

class App extends Component {
  handleChangeComplete = (color, index, targetEle) => {
    const dynamicBackgroundColors = [...this.props.colorList];
    dynamicBackgroundColors[index].r = color.rgb.r;
    dynamicBackgroundColors[index].g = color.rgb.g;
    dynamicBackgroundColors[index].b = color.rgb.b;
    dynamicBackgroundColors[index].a = color.rgb.a;

    document.getElementById(targetEle).style.backgroundColor = `rgba(${color.rgb.r},${color.rgb.g},${color.rgb.b},${color.rgb.a})`;
    this.props.onColorChange(dynamicBackgroundColors);
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
          <div className="control-container">
            <Controlpanel />
            <div className="color-picker-container">{colorPickers}</div>
          </div>
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
    onColorChange: inputData => {
      dispatch({ type: "UPDATE_COLOR", payload: inputData });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
