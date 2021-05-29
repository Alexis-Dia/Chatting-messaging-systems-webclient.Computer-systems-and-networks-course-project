import {apiCallForBasicAuth, apiCallWithoutCredentials} from "../../services/api/axiosApi";
import {
  GET, POST,
  HOSTNAME, PATH_METHOD_GET_ADD_NEW_MESSAGE,
  PATH_METHOD_GET_ALL_CHANNELS, PATH_METHOD_GET_ALL_FREE_CARS,
  PORT, PATH_METHOD_CREATE_NEW_CHANNEL, PATH_METHOD_GET_DELETE_CHANNEL, DELETE, PATH_METHOD_CHANGE_NICK_NAME
} from "../../properties/properties";

export function fetchAllChannels (ob) {
  return  apiCallWithoutCredentials(HOSTNAME, PORT, PATH_METHOD_GET_ALL_CHANNELS, GET)
}

export function fetchCreateNewChannel (ob) {
  return  apiCallForBasicAuth(HOSTNAME, PORT, PATH_METHOD_CREATE_NEW_CHANNEL, POST, ob.data, ob.data.credentials)
}

export function fetchNewMessageCreate (ob) {
  return  apiCallForBasicAuth(HOSTNAME, PORT, PATH_METHOD_GET_ADD_NEW_MESSAGE, POST, ob.data, ob.data.credentials)
}

export function deleteChannelApi (ob) {
  //let URL = PATH_METHOD_GET_DELETE_CHANNEL+"?channel="+ob.data.data.topic;
  return  apiCallForBasicAuth(HOSTNAME, PORT, PATH_METHOD_GET_DELETE_CHANNEL, POST, ob.data, ob.data.credentials)
}
