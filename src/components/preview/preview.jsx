import React, { PureComponent } from "react";
import { connect } from "react-redux";
import "./preview.scss";

class Preview extends PureComponent {
  generatedGradient = null;

  storeGeneratedGradient = () => {
    let gradientStyleLineOne = null;
    let gradientStyleLineTwo = null;

    if (this.props.gradientType === "linear") {
      gradientStyleLineOne = `background-image: linear-gradient(${this.props.gradientAngle}deg, ${this.generatedGradient});`;
      gradientStyleLineTwo = `background-image: -webkit-linear-gradient(${this.props.gradientAngle}deg, ${this.generatedGradient});`;
    } else if (this.props.gradientType === "radial") {
      gradientStyleLineOne = `background-image: radial-gradient(circle, ${this.generatedGradient});`;
      gradientStyleLineTwo = `background-image: -webkit-radial-gradient(circle, ${this.generatedGradient});`;
    } else if (this.props.gradientType === "conic") {
      const firstColor = `rgba(${this.props.colorList[0].r}, ${this.props.colorList[0].g}, ${this.props.colorList[0].b}, ${this.props.colorList[0].a})`;
      gradientStyleLineOne = `background-image: conic-gradient(from ${this.props.gradientAngle}deg, ${this.generatedGradient}, ${firstColor});`;
      gradientStyleLineTwo = `background-image: -webkit-conic-gradient(from ${this.props.gradientAngle}deg, ${this.generatedGradient}, ${firstColor});`;
    }

    this.props.onGradientGenerated([gradientStyleLineOne, gradientStyleLineTwo]);
  };

  componentDidMount() {
    this.storeGeneratedGradient();
  }

  componentDidUpdate() {
    this.storeGeneratedGradient();
  }

  handleGradientTypeChange = (e) => {
    this.props.onGradientTypeChange(e.target.value);
  };

  render() {
    let gradientBG = "";
    const previews = this.props.colorList.map((item, index) => {
      const currentColor = `rgba(${item.r}, ${item.g}, ${item.b}, ${item.a})`;
      gradientBG = `${gradientBG}rgba(${item.r}, ${item.g}, ${item.b}, ${item.a}), `;
      return <div className={this.props.showGradient === true ? "preview hide" : "preview"} key={index + "_" + item.r + "" + item.g + "" + item.b + "" + item.a} id={"colorPicker_" + index} style={{ backgroundColor: currentColor }}></div>;
    });

    this.generatedGradient = gradientBG.slice(0, -2);

    let gradientStyle = null;
    if (this.props.gradientType === "linear") {
      gradientStyle = { backgroundImage: `linear-gradient(${this.props.gradientAngle}deg, ${gradientBG.slice(0, -2)})` };
    } else if (this.props.gradientType === "radial") {
      gradientStyle = { backgroundImage: `radial-gradient(circle, ${gradientBG.slice(0, -2)})` };
    } else if (this.props.gradientType === "conic") {
      const firstColor = `rgba(${this.props.colorList[0].r}, ${this.props.colorList[0].g}, ${this.props.colorList[0].b}, ${this.props.colorList[0].a})`;
      gradientStyle = { backgroundImage: `conic-gradient(from ${this.props.gradientAngle}deg, ${gradientBG.slice(0, -2)}, ${firstColor})` };
    }

    return (
      <div className="preview-container">
        <label htmlFor="gradientTypeBtn" className="gradientTypeBtn-label">
          Gradient type
        </label>
        <select className="form-control btn btn-primary" id="gradientTypeBtn" onChange={this.handleGradientTypeChange} style={{ visibility: this.props.showGradient === true ? "visible" : "hidden" }}>
          <option value="linear">Linear</option>
          <option value="radial">Radial</option>
          <option value="conic">Conic</option>
        </select>

        <div className="preview-gradient" style={gradientStyle}>
          {this.props.gradientType === "conic" ? (
            <span className="no-conic-support">
              <sup>*</sup>Firefox, IE do not support conic gradients.
            </span>
          ) : null}
        </div>
        {previews}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    colorList: state[0].colorList,
    showGradient: state[0].showGradient,
    gradientAngle: state[0].gradientAngle,
    gradientType: state[0].gradientType,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onGradientGenerated: (inputData) => {
      dispatch({ type: "GRADIENT_GENERATED", payload: inputData });
    },
    onGradientTypeChange: (inputData) => {
      dispatch({ type: "GRADIENT_TYPE_CHANGE", payload: inputData });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Preview);
