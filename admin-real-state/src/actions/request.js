import * as Action from './index';
import callApi from './../utils/apiCaller';

export const actFetchEstatesRequest = (info) => {
    return dispatch => {
        return callApi('projects/getListInRadius', 'POST', info).then(res => {
            dispatch(Action.actFetchEstates(res.data.projects));
        });
    };
}
