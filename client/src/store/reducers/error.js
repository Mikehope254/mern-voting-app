// import { ADD_ERROR, REMOVE_ERROR } from "../actionTypes";

// export default (state = { message: null }, action) => {
//   switch (action.type) {
//     case ADD_ERROR:
//       return { ...state, message: action.error };

//     case REMOVE_ERROR:
//       return { ...state, message: null };

//     default:
//       return state;
//   }
// };

import { ADD_ERROR, REMOVE_ERROR } from "../actionTypes";

const initialState = { message: null };

export default function errorReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_ERROR:
      return { ...state, message: action.error };

    case REMOVE_ERROR:
      return { ...state, message: null };

    default:
      return state;
  }
}
