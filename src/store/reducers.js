import { combineReducers } from 'redux'

import messageReducer from '@/views/Community/reducers'
import articleReducer from '@/views/Articles/reducers'

const concatReducers = combineReducers({
  messageReducer,
  articleReducer
})

export default concatReducers