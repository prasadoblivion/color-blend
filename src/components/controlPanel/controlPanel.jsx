import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { Modal } from "react-bootstrap";
import { CopyToClipboard } from "react-copy-to-clipboard";
import "./controlPanel.scss";

class Controlpanel extends PureComponent {
  state = {
    blendText: "Blend",
    modalShow: false,
    valueCopiedStatus: false,
    valueCopied: ""
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

  handleModalShow = () => {
    this.setState({ modalShow: true });

    setTimeout(() => {
      this.setState({ valueCopied: document.getElementById("codeToCopy").textContent });
    }, 1000);
  };

  handleModalClose = () => {
    this.setState({ modalShow: false });
  };

  handleCopyCodeBtnClick = () => {
    this.setState({ valueCopied: document.getElementById("codeToCopy").textContent });

    setTimeout(() => {
      this.setState({ valueCopiedStatus: false, valueCopied: "" });
    }, 2000);
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
              Angle <strong>{this.props.gradientAngle}</strong>
              <sup>o</sup>
            </label>
          </div>
          <div>
            <input type="range" id="gradientAngle" min="0" max="360" step="1" defaultValue="45" className="slider" onChange={this.handleAngleChange} />
          </div>

          <div className="btn-container">
            <button className="btn btn-primary" id="blendBtn" onClick={this.handleBlendBtnClick} title={this.state.blendText + " colors"} aria-label={this.state.blendText + " colors"}>
              <span aria-hidden="true"> {this.state.blendText}</span>
            </button>

            <button className="btn btn-primary" id="getCodeBtn" title="Get code" aria-label="Get code" onClick={this.handleModalShow}>
              <span aria-hidden="true">&lt;/&gt;</span>
            </button>
          </div>
        </div>

        <Modal size="lg" centered show={this.state.modalShow} onHide={this.handleModalClose}>
          <Modal.Header closeButton>
            <Modal.Title>Code: CSS background gradient</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div id="codeToCopy">
              <code>
                <p>{this.props.gradientOutput !== null ? this.props.gradientOutput[0] : null}</p>
                <p>{this.props.gradientOutput !== null ? this.props.gradientOutput[1] : null}</p>
              </code>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <CopyToClipboard text={this.state.valueCopied} onCopy={() => this.setState({ valueCopiedStatus: true })}>
              <button className="btn btn-primary" onClick={this.handleCopyCodeBtnClick}>
                {this.state.valueCopiedStatus ? "Copied!" : "Copy code"}
              </button>
            </CopyToClipboard>
          </Modal.Footer>
        </Modal>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    colorList: state[0].colorList,
    showGradient: state[0].showGradient,
    gradientAngle: state[0].gradientAngle,
    gradientType: state[0].gradientType,
    gradientOutput: state[0].gradientOutput
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onBlendClick: inputData => {
      dispatch({ type: "BLEND_COLORS", payload: inputData });
    },
    onGradientAngleChange: inputData => {
      dispatch({ type: "CHANGE_ANGLE", payload: inputData });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Controlpanel);
