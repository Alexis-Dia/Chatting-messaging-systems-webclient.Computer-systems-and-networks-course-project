import { takeEvery, call, put } from 'redux-saga/effects';
import {delay} from "redux-saga";
import {fetchCreateNewChannel, fetchAllChannels, fetchNewMessageCreate, deleteChannelApi} from "./channelApi";
import {
    SUCCESS,
    FAILURE,
    UNAUTHORIZED,
    GET_CHANNELS, ADD_NEW_MESSAGE, CREATE_NEW_CHANNEL, DELETE_CHANNEL,
} from './channelActions';
import {ADD_FLASH_MESSAGE, DELETE_BY_VALUE_FLASH_MESSAGES} from "../flash/flashActions";
import {CHANNEL_WAS_SUCCESSFULLY_CREATED, CHANNEL_WAS_SUCCESSFULLY_DELETED} from "./channelProperties";

export function fetchAllChannelsApi (data) {
    return fetchAllChannels(data)
        .then(data => {
            return { response: data }
        })
        .catch(err => {
            return err
        })
}

export function * tryFetcAllChannels (data) {
        const { response, error } = yield call(fetchAllChannelsApi, data);
        if (response.httpStatus === 401) {
            yield put({type: GET_CHANNELS + UNAUTHORIZED, response})
        } else if (response.httpStatus === 200) {
            yield put({ type: GET_CHANNELS + SUCCESS, response })
        } else {
            yield put({ type: GET_CHANNELS + FAILURE, error })
        }

}

export function * allChannelsFetch () {
    yield takeEvery(GET_CHANNELS, tryFetcAllChannels)
}


export function newChannelCreateApi (data) {
    return fetchCreateNewChannel(data)
        .then(data => {
            return { response: data }
        })
        .catch(err => {
            return err
        })
}

export function * newChannel (data) {
    const { response } = yield call(newChannelCreateApi, data);
    let topic = data.data.data.topic;
    if (response.httpStatus === 401) {
        yield put({type: CREATE_NEW_CHANNEL + UNAUTHORIZED, response})
    } else if (response.httpStatus === 200) {
        yield put({ type: CREATE_NEW_CHANNEL + SUCCESS, topic })
        yield put({type: ADD_FLASH_MESSAGE, data: {type: "success", text: CHANNEL_WAS_SUCCESSFULLY_CREATED}});
        yield delay(3000, true);
        yield put({type: DELETE_BY_VALUE_FLASH_MESSAGES, data: CHANNEL_WAS_SUCCESSFULLY_CREATED})
    } else {
        yield put({ type: CREATE_NEW_CHANNEL + FAILURE, error })
    }

}

export function * createNewChannel () {
    yield takeEvery(CREATE_NEW_CHANNEL, newChannel)
}


export function newMessageCreateApi (data) {
    return fetchNewMessageCreate(data)
        .then(data => {
            return { response: data }
        })
        .catch(err => {
            return err
        })
}

export function * newMessage (data) {
    const { response } = yield call(newMessageCreateApi, data);
    let topic = data.data.data.topic;
    if (response.httpStatus === 401) {
        yield put({type: ADD_NEW_MESSAGE + UNAUTHORIZED, response})
    } else if (response.httpStatus === 200) {
        yield put({ type: ADD_NEW_MESSAGE + SUCCESS, topic })
    } else {
        yield put({ type: ADD_NEW_MESSAGE + FAILURE, error })
    }

}

export function * addNewMessage () {
    yield takeEvery(ADD_NEW_MESSAGE, newMessage)
}


export function fetchDeleteChannel (data) {
    return deleteChannelApi(data)
        .then(data => {
            return { response: data }
        })
        .catch(err => {
            return err
        })
}

export function * deleteChannelDelegate (data) {
    const { response } = yield call(fetchDeleteChannel, data);
    let topic = data.data.data.topic;

    if (response.httpStatus === 401) {
        yield put({type: DELETE_CHANNEL + UNAUTHORIZED, response})
    } else if (response.httpStatus === 200) {
        yield put({ type: DELETE_CHANNEL + SUCCESS, topic })
        yield put({type: ADD_FLASH_MESSAGE, data: {type: "success", text: CHANNEL_WAS_SUCCESSFULLY_DELETED}});
        yield delay(3000, true);
        yield put({type: DELETE_BY_VALUE_FLASH_MESSAGES, data: CHANNEL_WAS_SUCCESSFULLY_DELETED})
    } else {
        yield put({ type: DELETE_CHANNEL + FAILURE, error })
    }
}

export function * deleteChannel () {
    yield takeEvery(DELETE_CHANNEL, deleteChannelDelegate)
}