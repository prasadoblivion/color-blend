import React, { Component } from "react";
import Topnav from "./components/topnav/topnav";
import Preview from "./components/preview/preview";
import Controlpanel from "./components/controlPanel/controlPanel";
import Colorpallet from "./components/colorContainer/colorPallet/colorPallet";
import Customcolorpicker from "./components/colorContainer/colorPallet/colorPicker";
import "./App.scss";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header>
          <Topnav />
        </header>
        <main>
          <Preview />

          <div className="control-container">
            <Controlpanel />

            <div className="color-picker-container">
              <Colorpallet />
            </div>
            {<p className="colors-text">Selected colors</p>}
          </div>

          <Customcolorpicker />
        </main>
      </div>
    );
  }
}

export default App;
