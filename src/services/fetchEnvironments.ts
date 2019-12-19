import {fetchEnvironmentsPending, fetchEnvironmentsSuccess, fetchEnvironmentsError} from '../actions';
import { config } from './../config/config'
import { httpService } from './httpServices'


function fetchEnvironments() {
    return dispatch => {
        dispatch(fetchEnvironmentsPending());
        httpService(`${config.baseApiPathUrl}home/refresh`)
            .then(res => res.json())
            .then(res => {
                if (res.msg == "ok") {
                    return
                }
            })
            .then(() => httpService(`${config.baseApiPathUrl}home/environments`))
            .then(res => res.json())
            .then(res => {
                if(res.error) {
                    throw(res.error);
                }
                dispatch(fetchEnvironmentsSuccess(res.environments))
                return res.environments;
            })
            .catch(error => {
                dispatch(fetchEnvironmentsError(error));
            })
    }
}

export default fetchEnvironments;