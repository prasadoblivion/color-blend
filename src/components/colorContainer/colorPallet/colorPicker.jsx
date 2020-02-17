import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { ChromePicker } from "react-color";

class Customcolorpicker extends PureComponent {
  handleChangeComplete = (color, index, targetEle) => {
    const dynamicBackgroundColors = [...this.props.colorList];
    dynamicBackgroundColors[index].r = color.rgb.r;
    dynamicBackgroundColors[index].g = color.rgb.g;
    dynamicBackgroundColors[index].b = color.rgb.b;
    dynamicBackgroundColors[index].a = color.rgb.a;

    document.getElementById(targetEle).style.backgroundColor = `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`;
    this.props.onColorChange(dynamicBackgroundColors);
  };

  handleColorDelete = colorIndex => {
    if (this.props.colorList.length > 2) {
      // let confirmDelete = window.confirm("Do you really want to delete this color?");
      // if (confirmDelete) {
      //   const newColors = [...this.props.colorList];
      //   newColors.splice(colorIndex, 1);
      //   this.props.onColorChange(newColors);
      // }

      const newColors = [...this.props.colorList];
      newColors.splice(colorIndex, 1);
      this.props.onColorDelete([
        newColors,
        {
          show: false,
          currentIndex: 0
        }
      ]);
    } else {
      alert("Sorry, minimum two colors are required.");
    }
  };

  render() {
    if (this.props.colorPicker.show) {
      return (
        <div className="popover fade show bs-popover-top color-picker-popover" role="tooltip" style={{ left: this.props.colorPicker.position.x, top: this.props.colorPicker.position.y }}>
          <div className="arrow"></div>
          <div className="popover-body">
            <ChromePicker
              color={this.props.colorList[this.props.colorPicker.currentIndex]}
              onChange={color => {
                this.handleChangeComplete(color, this.props.colorPicker.currentIndex, "colorPicker_" + this.props.colorPicker.currentIndex);
              }}
            />

            <div className="text-right">
              <button
                className="btn btn-danger btn-sm delete-btn"
                onClick={() => {
                  this.handleColorDelete(this.props.colorPicker.currentIndex);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      );
    } else {
      return null;
    }
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
    onColorDelete: inputData => {
      dispatch({ type: "DELETE_COLOR", payload: inputData });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Customcolorpicker);
