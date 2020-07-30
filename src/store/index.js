import createSagaMiddleware from 'redux-saga'
import { createStore, applyMiddleware } from 'redux'
import concatReducer from './reducers'

export default function configureStore(initialState) {
  const sagaMiddleware = createSagaMiddleware()
  return {
    ...createStore(concatReducer, initialState, applyMiddleware(sagaMiddleware)),
    runSaga: sagaMiddleware.run
  }
}