const initialState = [
  {
    colorList: [
      { r: 85, g: 16, b: 206, a: 1 },
      { r: 216, g: 21, b: 203, a: 1 },
      { r: 222, g: 216, b: 21, a: 1 }
    ],
    showGradient: true,
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
    case "GRADIENT_GENERATED":
      return [{ ...state[0], gradientOutput: action.payload }];
    default:
      return state;
  }
};

export default rootReducer;
