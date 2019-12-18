import {FETCH_ENVIRONMENTS_PENDING, FETCH_ENVIRONMENTS_SUCCESS, FETCH_ENVIRONMENTS_ERROR} from './../actions';

const initialState = {
    pending: false,
    environments: [],
    error: null
}

export const environmentsReducer = (state = initialState, action) => {
    switch(action.type) {
        case FETCH_ENVIRONMENTS_PENDING: 
            return {
                ...state,
                pending: true
            }
        case FETCH_ENVIRONMENTS_SUCCESS:
            return {
                ...state,
                pending: false,
                environments: action.environments
            }
        case FETCH_ENVIRONMENTS_ERROR:
            return {
                ...state,
                pending: false,
                error: action.error
            }
        default: 
            return state;
    }
}

export const getEnvironments = state =>  state.environmentsReducer.environments;
export const getEnvironmentsPending = state => state.environmentsReducer.pending;
export const getEnvironmentsError = state => state.environmentsReducer.error;