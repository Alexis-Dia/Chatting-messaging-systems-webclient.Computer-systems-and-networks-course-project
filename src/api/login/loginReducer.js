import {DELETE_CURRENT_USER, SUCCESS, FAILURE, LOGIN, GET_DRIVERS, CHANGE_USER_NAME} from './loginActions'

const initialState = {
    isAuthenticated: false,
    user: {},
    list: []
};

const loginReducer = (state = initialState, action = {}) => {

  switch (action.type) {

    case LOGIN + FAILURE:

      let message = action.error.message;
      return {
        ...state,
        isAuthenticated: false,
        user: {errors: message}
      };

    case LOGIN + SUCCESS:

      return {
        ...state,
        isAuthenticated: true,
        user: {...action.response.result}
      };

    case GET_DRIVERS + FAILURE:
      return  {
        ...state,
        list: []
      };

    case GET_DRIVERS + SUCCESS:
      return  {
        ...state,
        list: action.response.result
      };

    case DELETE_CURRENT_USER:

      return {
        ...state,
        isAuthenticated: false,
        user: {}
      };

    case CHANGE_USER_NAME + SUCCESS:
      let optionalParams = action.name;
      return  {
        ...state,
        isAuthenticated: true,
        user: {...state.user, name: optionalParams}
      };

    default:
      return state;
  }

}
export default loginReducer
