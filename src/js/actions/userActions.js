export function fetchUser(){
  return {
    type: 'FETCH_USER_FULFILLED',
    payload: {
      name: 'Will',
      age: 28
    }
  }
}


export function setUserName(name) {
  return {
    type: 'SET_USER_NAME',
    payload: name
  }
}

export function setUserAge(age) {
  return {
    type: 'SET_USR_AGE',
    payload: age
  }
}
