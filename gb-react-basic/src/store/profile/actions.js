// export const ADD_PROFILE = 'ADD_PROFILE';
export const CHANGE_NAME_PROFILE = 'CHANGE_PROFILE';
export const CHANGE_STATUS_PROFILE = 'CHANGE_STATUS_PROFILE';
export const REMOVE_PROFILE = 'REMOVE_PROFILE';

// export const addProfileAction = (profileName) => ({
//   type: ADD_PROFILE,
//   payload: profileName
// })

export const changeProfileStatusAction = () => ({
  type: CHANGE_STATUS_PROFILE,
});

export const changeNameProfileAction = (profileName) => ({
  type: CHANGE_NAME_PROFILE,
  payload: profileName
});

export const removeProfileAction = () => ({
  type: REMOVE_PROFILE
})