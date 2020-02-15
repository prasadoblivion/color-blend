import React, { Component } from "react";
import { connect } from "react-redux";
import "./preview.scss";

class Preview extends Component {
  render() {
    let gradientBG = "";

    const previews = this.props.colorList.map((item, index) => {
      const currentColor = `rgba(${item.r},${item.g},${item.b},${item.a})`;
      gradientBG = gradientBG + currentColor + ", ";
      return <div className={this.props.showGradient === true ? "preview hide" : "preview"} key={index} id={"colorPicker_" + index} style={{ backgroundColor: currentColor }}></div>;
    });

    let gradientStyle = null;
    if (this.props.gradientType.toString() === "linear") {
      gradientStyle = { backgroundImage: `linear-gradient(${this.props.gradientAngle}deg , ${gradientBG.slice(0, -2)})` };
    } else {
      gradientStyle = { backgroundImage: `radial-gradient(${gradientBG.slice(0, -2)})` };
    }

    return (
      <div className="preview-container">
        <div className="preview-gradient" style={gradientStyle}></div>
        {previews}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    colorList: state[0].colorList,
    showGradient: state[0].showGradient,
    gradientAngle: state[0].gradientAngle,
    gradientType: state[0].gradientType
  };
};

export default connect(mapStateToProps, null)(Preview);
