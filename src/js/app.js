import { applyMiddleware, combineReducers, createStore } from 'redux'
import logger from 'redux-logger';
import axios from 'axios'
import thunk from 'redux-thunk'


const loggerMiddleware = (store) => (next) => (action) => {
  console.log('action fired', action);
  next(action)
}

const errorMiddleware = (store) => (next) => (action) => {
  try {
    next(action)
  } catch(e) {
    console.log('OOOooops', e)
  }
}


const middleware = applyMiddleware(thunk, logger)


const initialState = {
  fetching: false,
  fetched: false,
  fetched_users: [],
  error: null
}

const userReducer = (state=initialState, action) => {
  switch(action.type){
    case 'CHANGE_NAME': {
      state = {...state, name: action.payload.name};
      break;
    }
    case 'CHANGE_AGE': {
      state = {...state, age: action.payload.age}
      break;
    }
    case 'FETCH_USERS_START': {
      return {...state, fetching: true}
      break;
    }
    case 'FETCH_USERS_ERROR': {
      return {...state, fetching: false, error: action.payload}
      break;
    }
    case 'RECEIVE_USERS': {
      return {...state, fetching: false, fetched: true, fetched_users: action.payload}
      break
    }
  }

  return state;
}

const tweetReducer = (state=[], action) => {
  return state
}

const reducers = combineReducers({
  users: userReducer,
  tweets: tweetReducer
})

const store = createStore(reducers, middleware)

store.subscribe(() => {
  console.log('store changed', store.getState())
})

//store.dispatch({type: 'CHANGE_NAME', payload: {name: 'shanto c v'}})
//store.dispatch({type: 'CHANGE_AGE', payload: {age: 28}})
store.dispatch({type: 'FETCH_USERS_START'})
axios.get('http://rest.learncode.academy/api/wstern/users')
  .then((response) => {
    store.dispatch({type: 'RECEIVE_USERS', payload: response.data})
  })
  .catch((error) => {
    store.dispatch({type: 'FETCH_USERS_ERROR', payload: error})
  })
console.log("finished")


store.dispatch((dispatch) => {
  dispatch({type: 'FETCH_USERS_START'})
  axios.get('http://rest.learncode.academy/api/wstern/users')
    .then((response) => {
      dispatch({type: 'RECEIVE_USERS', payload: response.data})
    })
    .catch((error) => {
      dispatch({type: 'FETCH_USERS_ERROR', payload: error})
    })
})

console.log('after thunk')
