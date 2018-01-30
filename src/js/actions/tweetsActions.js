import axios from 'axios'

export function fetchTweets(){
  return function(dispatch){
    axios.get('http://rest.learncode.academy/api/test123/tweets')
    .then((response) => {
      dispatch({type: 'FETCH_TWEETS_FULFILLED', payload: response.data})
    })
    .catch((error) => {
      dispatch({type: 'FETCH_TWEETS_REJECTED', payload: error})
    })
  }
}

export function addTweet(id, text) {
  return {
    type: 'ADD_TWEET',
    payload: {
      id,
      text
    }
  }
}

