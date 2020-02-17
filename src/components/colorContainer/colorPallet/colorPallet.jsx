import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { hexToRgb } from "../../../utilities/rgbToHex";
import "./colorPallet.scss";

class Colorpallet extends PureComponent {
  getElOffset = el => {
    const rect = el.getBoundingClientRect();
    return {
      left: rect.left + window.scrollX,
      top: rect.top + window.scrollY
    };
  };

  handleAddColor = () => {
    const initialColors = this.props.colorList;
    var randomColor = "#000000".replace(/0/g, function() {
      return (~~(Math.random() * 16)).toString(16);
    });

    const newColors = [...initialColors, { r: hexToRgb(randomColor).r, g: hexToRgb(randomColor).g, b: hexToRgb(randomColor).b, a: 1, stop: 100 }];

    this.props.onColorChange(newColors);
  };

  handleFlipColorPallet = () => {
    const newColors = [...this.props.colorList];
    newColors.reverse();

    this.props.onColorChange(newColors);
  };

  handleToggleColorPicker = (el, colorIndex) => {
    let toggleData = {};
    if (this.props.colorPicker.currentIndex === colorIndex) {
      if (this.props.colorPicker.show) {
        toggleData.show = false;
      } else {
        toggleData.show = true;
      }
    } else {
      toggleData.show = true;
    }

    const currentPos = this.getElOffset(el);

    toggleData.currentIndex = colorIndex;
    toggleData.position = { x: currentPos.left, y: currentPos.top };

    this.props.toggleColorPicker(toggleData);
  };

  render() {
    const colorPickers = this.props.colorList.map((item, index) => {
      const bgColor = `rgba(${item.r}, ${item.g}, ${item.b}, ${item.a})`;

      return (
        <button
          className="btn color-pallet-btn"
          key={index + "_" + item.r + "" + item.g + "" + item.b + "" + item.a}
          style={{ backgroundColor: bgColor }}
          title={`Color: ${bgColor}`}
          aria-label={`Color: ${bgColor}`}
          onClick={e => {
            this.handleToggleColorPicker(e.target, index);
          }}
        ></button>
      );
    });

    return (
      <React.Fragment>
        <button className="btn flip-pallet-btn btn-dark" onClick={this.handleFlipColorPallet} title="Flip color pallet" arial-label="Flip color pallet">
          <span aria-hidden="true">Flip</span>
        </button>

        {colorPickers}

        <button className="btn color-pallet-btn btn-dark" onClick={this.handleAddColor} title="Add color" arial-label="Add color">
          <span aria-hidden="true">+</span>
        </button>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    colorList: state[0].colorList,
    colorPicker: state[0].colorPicker
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onColorChange: inputData => {
      dispatch({ type: "UPDATE_COLOR", payload: inputData });
    },
    toggleColorPicker: inputData => {
      dispatch({ type: "TOGGLE_COLOR_PICKER", payload: inputData });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Colorpallet);
