const initialState = [
  {
    colorList: [
      { r: 255, g: 93, b: 4, a: 1 },
      { r: 255, g: 119, b: 0, a: 1 },
      { r: 255, g: 170, b: 0, a: 1 },
      { r: 255, g: 191, b: 63, a: 1 }
    ],
    showGradient: false,
    showCode: false,
    gradientOutput: null,
    gradientAngle: "90",
    gradientType: "linear",
    colorPicker: {
      show: false,
      currentIndex: 0,
      position: { x: 0, y: 0 }
    }
  }
];

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_COLOR":
      return [{ ...state[0], colorList: [...action.payload] }];
    case "DELETE_COLOR":
      return [{ ...state[0], colorList: [...action.payload[0]], colorPicker: { ...action.payload[1] } }];
    case "BLEND_COLORS":
      return [{ ...state[0], showGradient: action.payload }];
    case "CHANGE_ANGLE":
      return [{ ...state[0], gradientAngle: action.payload }];
    case "GRADIENT_TYPE_CHANGE":
      return [{ ...state[0], gradientType: action.payload }];
    case "GRADIENT_GENERATED":
      return [{ ...state[0], gradientOutput: action.payload }];
    case "TOGGLE_COLOR_PICKER":
      return [{ ...state[0], colorPicker: { ...action.payload } }];
    default:
      return state;
  }
};

export default rootReducer;
