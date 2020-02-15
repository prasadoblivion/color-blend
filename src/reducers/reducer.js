const initialState = [
  {
    colorList: [
      { r: 103, g: 58, b: 183, a: 1 },
      { r: 156, g: 39, b: 176, a: 1 }
    ],
    showGradient: false,
    showCode: false,
    gradientOutput: null,
    gradientAngle: "90",
    gradientType: "linear"
  }
];

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_COLOR":
      return [{ ...state[0], colorList: action.payload }];
    case "UPDATE_COLOR":
      return [{ ...state[0], colorList: action.payload }];
    case "BLEND_COLORS":
      return [{ ...state[0], showGradient: action.payload }];
    case "CHANGE_ANGLE":
      return [{ ...state[0], gradientAngle: action.payload }];
    case "GRADIENT_TYPE_CHANGE":
      return [{ ...state[0], gradientType: action.payload }];
    default:
      return state;
  }
};

export default rootReducer;
