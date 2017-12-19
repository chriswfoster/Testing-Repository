import axios from 'axios';

//INITAL STATE
const initialState= {
  user: {}
}


//ACTION TYPES
const REQ_USER= 'REQ_USER';


//REDUCER
export default function reducer(state= initialState, action){
  switch(action.type){
    case REQ_USER + "_PENDING":
      return Object.assign({}, state, { isLoading: true });
    case REQ_USER + "_FULFILLED":
      return Object.assign({}, state, {
        isLoading: false,
        user: action.payload
    });
  }
}


//ACTION CREATORS
export function reqUser(){
  return {
    type: REQ_USER,
    payload: axios.get('/api/me').then(response=> reponse.data);
  }
}
