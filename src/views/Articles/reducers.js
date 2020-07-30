import {
  ARTICLE_FETCH_LIST_SUCCEEDED,
  ARTICLE_FETCH_LIST_FAILED,
  ARTICLE_FETCH_DELETE_SUCCEEDED,
  ARTICLE_FETCH_DELETE_FAILED
} from './constants'

const initialState = {
  articleList: [],
  pagination: {
    current: 1,
    pageSize: 10,
    total: 0
  }
}

export default (state = initialState, action) => {
  switch(action.type) {
    case ARTICLE_FETCH_LIST_SUCCEEDED:
      const { list, ...pagination } = action.result || {}
      const { page, ...args } = pagination
      return { ...state, articleList: list, pagination: {current: page, ...args}}
    case ARTICLE_FETCH_DELETE_SUCCEEDED:
      return state
    case ARTICLE_FETCH_LIST_FAILED:
    case ARTICLE_FETCH_DELETE_FAILED:
      return state
    default:
      return state
  }
}