export const FETCH_ENVIRONMENTS_PENDING = 'FETCH_ENVIRONMENTS_PENDING';
export const FETCH_ENVIRONMENTS_SUCCESS = 'FETCH_ENVIRONMENTS_SUCCESS';
export const FETCH_ENVIRONMENTS_ERROR = 'FETCH_ENVIRONMENTS_ERROR';

function fetchEnvironmentsPending() {
    return {
        type: FETCH_ENVIRONMENTS_PENDING
    }
}

function fetchEnvironmentsSuccess(environments) {
    return {
        type: FETCH_ENVIRONMENTS_SUCCESS,
        environments: environments
    }
}

function fetchEnvironmentsError(error) {
    return {
        type: FETCH_ENVIRONMENTS_ERROR,
        error: error
    }
}

export { fetchEnvironmentsPending, fetchEnvironmentsSuccess, fetchEnvironmentsError}