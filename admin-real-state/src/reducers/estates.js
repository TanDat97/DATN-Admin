import * as Types from './../constants/ActionTypes';
var initialState = [];
const estates = (state = initialState, action) => {
    // var index = -1;
    // var { id, estate } = action;
    switch (action.type) {
        case Types.FETCH_ESTATES:
            state = action.estates;
            return [...state];
        
        default: return [...state];
    }
};

export default estates;