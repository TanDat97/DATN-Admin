import { userConstants } from '../_constants';

export function account(state = {}, action) {
  switch (action.type) {
    case userConstants.GETALL_REQUEST:
      return {
        loading: true
      };
    case userConstants.GETALL_SUCCESS:
      return {
        type: userConstants.GETALL_SUCCESS,
        result: action.result
      };
    case userConstants.GETALL_FAILURE:
      return { 
        type: userConstants.GETALL_FAILURE,
        error: action.error
      };
    case userConstants.GETONE_REQUEST:
      return {
        loading: true
      };
    case userConstants.GETONE_SUCCESS:
      return {
        type: userConstants.GETONE_SUCCESS,
        result: action.result
      };
    case userConstants.GETONE_FAILURE:
      return { 
        type: userConstants.GETONE_FAILURE,
        error: action.error
      };
    default:
      return state
  }
}