import React, { PureComponent } from "react";
import { connect } from "react-redux";
import "./preview.scss";

class Preview extends PureComponent {
  state = {
    gradientTypeText: "Radial"
  };

  generatedGradient = null;

  componentDidMount() {
    let gradientStyleLineOne = null;
    let gradientStyleLineTwo = null;

    if (this.props.gradientType === "linear") {
      gradientStyleLineOne = `backgroundImage: linear-gradient(${this.props.gradientAngle}deg , ${this.generatedGradient});`;
      gradientStyleLineTwo = `backgroundImage: -webkit-linear-gradient(${this.props.gradientAngle}deg , ${this.generatedGradient});`;
    } else {
      gradientStyleLineOne = `backgroundImage: radial-gradient(${this.generatedGradient});`;
      gradientStyleLineTwo = `backgroundImage: -webkit-radial-gradient(${this.generatedGradient});`;
    }

    this.props.onGradientGenerated([gradientStyleLineOne, gradientStyleLineTwo]);
  }

  componentDidUpdate() {
    let gradientStyleLineOne = null;
    let gradientStyleLineTwo = null;

    if (this.props.gradientType === "linear") {
      gradientStyleLineOne = `backgroundImage: linear-gradient(${this.props.gradientAngle}deg , ${this.generatedGradient});`;
      gradientStyleLineTwo = `backgroundImage: -webkit-linear-gradient(${this.props.gradientAngle}deg , ${this.generatedGradient});`;
    } else {
      gradientStyleLineOne = `backgroundImage: radial-gradient(${this.generatedGradient});`;
      gradientStyleLineTwo = `backgroundImage: -webkit-radial-gradient(${this.generatedGradient});`;
    }

    this.props.onGradientGenerated([gradientStyleLineOne, gradientStyleLineTwo]);
  }

  handleGradientTypeChange = () => {
    if (this.props.gradientType === "linear") {
      this.props.onGradientTypeChange("radial");
      this.setState({ gradientTypeText: "Linear" });
    } else {
      this.props.onGradientTypeChange("linear");
      this.setState({ gradientTypeText: "Radial" });
    }
  };

  render() {
    let gradientBG = "";

    const previews = this.props.colorList.map((item, index) => {
      const currentColor = `rgba(${item.r},${item.g},${item.b},${item.a})`;
      gradientBG = gradientBG + currentColor + ", ";
      return <div className={this.props.showGradient === true ? "preview hide" : "preview"} key={index} id={"colorPicker_" + index} style={{ backgroundColor: currentColor }}></div>;
    });

    this.generatedGradient = gradientBG.slice(0, -2);

    let gradientStyle = null;
    if (this.props.gradientType === "linear") {
      gradientStyle = { backgroundImage: `linear-gradient(${this.props.gradientAngle}deg , ${gradientBG.slice(0, -2)})` };
    } else {
      gradientStyle = { backgroundImage: `radial-gradient(${gradientBG.slice(0, -2)})` };
    }

    return (
      <div className="preview-container">
        <button className="btn btn-primary" id="gradientTypeBtn" onClick={this.handleGradientTypeChange}>
          {this.state.gradientTypeText}
        </button>
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

const mapDispatchToProps = dispatch => {
  return {
    onGradientGenerated: inputData => {
      dispatch({ type: "GRADIENT_GENERATED", payload: inputData });
    },
    onGradientTypeChange: inputData => {
      dispatch({ type: "GRADIENT_TYPE_CHANGE", payload: inputData });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Preview);
