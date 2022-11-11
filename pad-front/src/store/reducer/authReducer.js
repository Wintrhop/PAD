export const CHANGE_EXPIRED = "CHANGE_EXPIRED";
export const CHANGE_NAME = "CHANGE_NAME";
export const CHANGE_ROLE = "CHANGE_ROLE";

export const changeisExpired = (value) => {
  return {
    type: CHANGE_EXPIRED,
    payload: value,
  };
};
export const changeName = (value) => {
  return {
    type: CHANGE_NAME,
    payload: value,
  };
};
export const changeRole = (value) => {
  return {
    type: CHANGE_ROLE,
    payload: value,
  };
};

const initialState = {
  isExpired: true,
  name: "",
  role: "",
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_EXPIRED:
      return {
        ...state,
        isExpired: action.payload,
      };
    case CHANGE_NAME:
      return {
        ...state,
        name: action.payload,
      };
    case CHANGE_ROLE:
      return {
        ...state,
        role: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
