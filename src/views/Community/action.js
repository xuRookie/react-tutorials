import {
  MESSAGE_FETCH_LIST,
  MESSAGE_FETCH_DELETE,
  MESSAGE_FETCH_STATUS
} from './constants'

export const fetchList = (params, resolve) => {
  return {
    type: MESSAGE_FETCH_LIST,
    payload: {
      params,
      resolve
    }
  }
}
export const fetchMessageDelete = (ids, resolve) => {
  return {
    type: MESSAGE_FETCH_DELETE,
    payload: {
      ids,
      resolve
    }
  }
}
export const fetchMessageStatus = (ids, resolve) => {
  return {
    type: MESSAGE_FETCH_STATUS,
    payload: {
      ids,
      status: 0,
      resolve
    }
  }
}
