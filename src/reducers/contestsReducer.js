/* eslint-disable no-console */
export function contests(state = [], action) {
  switch(action.type) {
    case 'FETCH_CONTEST_SUCCESS':
      return { 
        isLoading: false, 
        contests: action.payload
      };

    default :
      return state;
  }
};
