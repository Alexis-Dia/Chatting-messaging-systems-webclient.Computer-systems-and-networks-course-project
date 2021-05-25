import {
  GET_CHANNELS,
  CREATE_CHANNEL,
  SUCCESS,
  FAILURE,
  CREATE_NEW_CHANNEL,
  SET_UP_CHOSEN_CHANNEL, DELETE_CHANNEL
} from './channelActions'

const initialState = {
    list: [],
    listOfFreeChannels: [],
    lastChosenChannel: ''
};

const channelReducer = (state = initialState, action = {}) => {

  switch (action.type) {

    case GET_CHANNELS + FAILURE:
      return  {
        ...state,
        list: action.response.result
      };

    case GET_CHANNELS + SUCCESS:

      return  {
        ...state,
        list: action.response.result
      };

    case CREATE_NEW_CHANNEL + FAILURE:

      return  {
        ...state,
        //list: action.response.result
      };

    case CREATE_NEW_CHANNEL + SUCCESS:

      return  {
        ...state,
        list: [...state.list, {topic: action.topic, deleted: false}]
      };

    case SET_UP_CHOSEN_CHANNEL:
      return  {
        ...state,
        lastChosenChannel: action.topic
      };

    case DELETE_CHANNEL + FAILURE:

      return  {
        ...state,
        //list: action.response.result
      };

    case DELETE_CHANNEL + SUCCESS:
      let list = state.list;
      let obj = list.find(x => x.topic === action.topic);
      let index = list.indexOf(obj);

      //let index = list.indexOf(action.topic);
      if (index !== -1) {
        list.splice(index, 1);
      }

      return  {
        ...state,
        list: list
      };

    default:
      return state;
  }



}
export default channelReducer