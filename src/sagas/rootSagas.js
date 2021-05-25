import { fork } from 'redux-saga/effects';

import { loginAuthFetch, driversFetch, createUserSaga } from '../api/login/loginSagas';
import {addNewMessage, allChannelsFetch, createNewChannel, deleteChannel} from '../api/channel/channelSagas';

// Your sagas for this container
export default function * rootSaga () {
  yield [
    fork(loginAuthFetch),
    fork(createUserSaga),

    fork(allChannelsFetch),
    fork(createNewChannel),
    fork(addNewMessage),
    fork(deleteChannel)
  ]
}
