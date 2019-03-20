import * as Types from './../constants/ActionTypes';

//==================== Estates ==================== 
export const actFetchEstates = (estates) => {
    return {
        type : Types.FETCH_ESTATES,
        estates: estates
    }
}
