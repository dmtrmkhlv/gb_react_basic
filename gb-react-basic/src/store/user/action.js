import {profileRef} from "../../services/firebase"

export const ADD_USER_FAIL = 'ADD_USER_FAIL'
export const ADD_USER_SUCCESS = 'ADD_USER_SUCCESS'
export const ADD_USER_LOADING = 'ADD_USER_LOADING'
export const REMOVE_USER = 'REMOVE_USER'
export const RESET_USER = 'RESET_USER'

export const resetUsers = () => ({
  type: RESET_USER,
})

export const addUserFailAction = (error) => ({
  type: ADD_USER_FAIL,
  payload: error
})

export const addUserLoadingAction = (isLoading) => ({
  type: ADD_USER_LOADING,
  payload: isLoading
})

export const addUserSuccessAction = (user) => ({
  type: ADD_USER_SUCCESS,
  payload: user
})

export const removeUserAction = (userID) => ({
  type: REMOVE_USER,
  payload: userID
})

export const addUserAction = (user) => (dispatch) => {
  profileRef.push(user, (error) => {
    if (error) {
      dispatch(addUserFailAction(error));
    }
  })
}

export const addUserTracker = (dispatch) => {
  profileRef.on('child_added', (snapshot) => {
    dispatch(addUserSuccessAction({
      ...snapshot.val(),
      id: snapshot.key,
    }))
  })
}

export const addUserOffTracker = (dispatch) => {
  dispatch(resetUsers());
  profileRef.off('child_added');
}


export const removeUserCommand = (userId) => (dispatch) =>{
  profileRef.child(userId).remove((error) => {
    if (error) {
      dispatch(addUserFailAction(error));
    }
  })
}

export const removeUserTracker = (dispatch) => {
  profileRef.on('child_removed', (snapshot) => {
    dispatch(removeUserAction(snapshot.key))
  })
}

export const removeUserOffTracker = () => {
  profileRef.off('child_removed');
}