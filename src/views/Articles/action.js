import {
  ARTICLE_FETCH_LIST,
  ARTICLE_FETCH_EDIT,
  ARTICLE_FETCH_DELETE
} from './constants'

export function fetchArticleList(params, resolve) {
  return {
    type: ARTICLE_FETCH_LIST,
    payload: {
      params,
      resolve
    }
  }
}

export function fetchEditArticle(id, resolve) {
  return {
    type: ARTICLE_FETCH_EDIT,
    payload: {
      id,
      resolve
    }
  }
}

export function fetchDeleteArticle(id, resolve) {
  return {
    type: ARTICLE_FETCH_DELETE,
    payload: {
      id,
      resolve
    }
  }
}