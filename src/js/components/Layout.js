import React, { Component } from 'react'
import { connect } from 'react-redux'

import { fetchUser } from '../actions/userActions'
import { fetchTweets } from '../actions/tweetsActions'


// connect inject redux store as props in Layout. we use babel-plugin-transform-decorator-legacy here to transpile to ES6
@connect((store) => {
  return {
    user: store.user.user,
    tweets: store.tweets.tweets
  }
})


export default class Layout extends Component {
  componentWillMount(){
    this.props.dispatch(fetchUser())  
  }

  fetchTweets(){
    this.props.dispatch(fetchTweets())
  }
 
  render(){
    const { user, tweets } = this.props

    if(!tweets.length){
      return <button onClick={this.fetchTweets.bind(this)}>Get Tweets</button>
    }

    console.log(tweets)

    const mappedTweets = tweets.map(tweet => <li key={tweet.id}>{tweet.text}</li>)
  
    return(
      <div>
        {user.name}
        <ul>
          {mappedTweets}
        </ul>
      </div>
    )
  }
}

