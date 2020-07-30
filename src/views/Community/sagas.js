import { put, call, takeEvery, all } from 'redux-saga/effects'
import {
  requestMessageList,
  requestMessageDelete,
  requestMessageStatus
} from './api'

import {
  MESSAGE_FETCH_LIST,
  MESSAGE_FETCH_SUCCEEDED,
  MESSAGE_FETCH_FAILED,
  MESSAGE_FETCH_DELETE,
  MESSAGE_FETCH_DELETE_FAILED,
  MESSAGE_FETCH_STATUS,
  MESSAGE_FETCH_STATUS_FAILED
} from './constants'

function* fetchMessageList({ payload }) {
  try {
    const result = yield call(requestMessageList, payload.params)
    yield put({ type: MESSAGE_FETCH_SUCCEEDED, result })
    payload.resolve()
  } catch (error) {
    yield put({ type: MESSAGE_FETCH_FAILED, message: error.message})
  }
}

function* deleteMessage({ payload }) {
  try {
    const { ids, resolve } = payload
    const result = yield call(requestMessageDelete, { ids })
    resolve(result)
  } catch (error) {
    yield put({ type: MESSAGE_FETCH_DELETE_FAILED, message: error.message})
  }
}

function* modifyMessageStatus({ payload }) {
  try {
    const { ids, status, resolve } = payload
    const result = yield call(requestMessageStatus, { ids, status })
    resolve(result)
  } catch (error) {
    yield put({ type: MESSAGE_FETCH_STATUS_FAILED, message: error.message})
  }
}

const messageSaga = function* () {
  yield all([
    takeEvery(MESSAGE_FETCH_LIST, fetchMessageList),
    takeEvery(MESSAGE_FETCH_DELETE, deleteMessage),
    takeEvery(MESSAGE_FETCH_STATUS, modifyMessageStatus),
  ])
}

export default messageSaga