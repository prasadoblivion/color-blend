import React, { Component } from "react";
import { connect } from "react-redux";
import "./controlPanel.scss";

class Controlpanel extends Component {
  state = {
    blendText: "Blend",
    gradientTypeText: "Radial"
  };

  handleBlendBtnClick = () => {
    if (this.props.showGradient) {
      this.props.onBlendClick(false);
      this.setState({ blendText: "Blend" });
    } else {
      this.props.onBlendClick(true);
      this.setState({ blendText: "Unblend" });
    }
  };

  handleAngleChange = e => {
    this.props.onGradientAngleChange(parseFloat(e.target.value));
  };

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
    if (document.getElementById("gradientAngle") !== null) {
      if (this.props.gradientType === "radial") {
        document.getElementById("gradientAngleLabel").classList.add("disabled");
        document.getElementById("gradientAngle").setAttribute("disabled", "disabled");
      } else {
        document.getElementById("gradientAngleLabel").classList.remove("disabled");
        document.getElementById("gradientAngle").removeAttribute("disabled");
      }
    }

    return (
      <React.Fragment>
        <div className="d-flex control-panel">
          <div>
            <label htmlFor="gradientAngle" id="gradientAngleLabel">
              Angle {this.props.gradientAngle}
              <sup>o</sup>
            </label>
          </div>
          <div>
            <input type="range" id="gradientAngle" min="0" max="360" step="1" defaultValue="45" className="slider" onChange={this.handleAngleChange} />
          </div>

          <div className="btn-container">
            <button className="btn btn-primary" id="blendBtn" onClick={this.handleBlendBtnClick}>
              {this.state.blendText}
            </button>

            <button className="btn btn-primary" id="blendBtn" onClick={this.handleGradientTypeChange}>
              {this.state.gradientTypeText}
            </button>

            <button className="btn btn-primary" id="getCodeBtn">
              Get code
            </button>
          </div>
        </div>
      </React.Fragment>
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
    onBlendClick: inputData => {
      dispatch({ type: "BLEND_COLORS", payload: inputData });
    },
    onGradientAngleChange: inputData => {
      dispatch({ type: "CHANGE_ANGLE", payload: inputData });
    },
    onGradientTypeChange: inputData => {
      dispatch({ type: "GRADIENT_TYPE_CHANGE", payload: inputData });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Controlpanel);
