import { put, call, takeEvery, all } from 'redux-saga/effects'

import {
  requestArticleList,
  requestArticleDelete
} from './api'

import {
  ARTICLE_FETCH_LIST,
  ARTICLE_FETCH_LIST_SUCCEEDED,
  ARTICLE_FETCH_LIST_FAILED,
  ARTICLE_FETCH_DELETE,
  ARTICLE_FETCH_DELETE_SUCCEEDED,
  ARTICLE_FETCH_EDIT_FAILED
} from './constants'

function* loadArticleList({ payload }) {
  try {
    const result = yield call(requestArticleList, payload.params)
    yield put({ type: ARTICLE_FETCH_LIST_SUCCEEDED, result })
    payload.resolve()
  } catch (error) {
    yield put({ type: ARTICLE_FETCH_LIST_FAILED, message: error.message})
  }
}

function* deleteArticle({ payload }) {
  try {
    const result = yield call(requestArticleDelete, payload.id)
    yield put({ type: ARTICLE_FETCH_DELETE_SUCCEEDED, result })
    payload.resolve()
  } catch (error) {
    yield put({ type: ARTICLE_FETCH_EDIT_FAILED, message: error.message})
  }
}

const articleSaga = function* () {
  yield all([
    takeEvery(ARTICLE_FETCH_LIST, loadArticleList),
    takeEvery(ARTICLE_FETCH_DELETE, deleteArticle)
  ])
}

export default articleSaga