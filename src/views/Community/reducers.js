import {
  MESSAGE_FETCH_SUCCEEDED,
  MESSAGE_FETCH_FAILED
} from './constants'

const initialState = {
  list: [],
  pagination: {
    current: 1,
    pageSize: 10,
    total: 0
  }
}

export default (state = initialState, action) => {
  switch(action.type) {
    case MESSAGE_FETCH_SUCCEEDED:
      const { list, ...pagination } = action.result || {}
      const { page, ...args } = pagination
      return { ...state, list, pagination: {current: page, ...args}}
    case MESSAGE_FETCH_FAILED:
      return state
    default:
      return state
  }
}