import {apiSignUp, apiCall, apiCallForBasicAuth} from "../../services/api/axiosApi";
import {
  GET,
  HOSTNAME, PATH_METHOD_CHANGE_NICK_NAME,
  PATH_METHOD_GET_ALL_DRIVERS,
  PATH_METHOD_SIGN_UP,
  PORT,
  POST,
  PUT
} from "../../properties/properties";

export function fetchAuth (ob) {
  return  apiCall(HOSTNAME, PORT, GET, ob)
}

export function fetchDrivers(ob) {
  return  apiCallForBasicAuth(HOSTNAME, PORT, PATH_METHOD_GET_ALL_DRIVERS, GET, ob.data.data, ob.data.credentials)
}

export function createNewUser(ob) {
  return  apiSignUp(HOSTNAME, PORT, PATH_METHOD_SIGN_UP, POST, ob.data)
}


/*
export function changeUserNameApi(ob) {
  console.log("ob = ", ob)
  console.log("ob.dat = ", ob.data)
  console.log("ob.data.data = ", ob.data.data)
  return  apiCallForBasicAuth(HOSTNAME, PORT, PATH_METHOD_CHANGE_NICK_NAME, POST, ob.data.data, ob.data.credentials)
}
*/


export function changeUserNameApi(ob) {
  console.log("ob = ", ob)
  console.log("ob.dat = ", ob.data)
  console.log("ob.data.data = ", ob.data.data)
  let url = PATH_METHOD_CHANGE_NICK_NAME+"?userId="+ob.data.data.id+"&name="+ob.data.data.name;
  console.log("url = ", url)
  return apiCallForBasicAuth(HOSTNAME, PORT, url, PUT, {} , ob.data.credentials)
}
