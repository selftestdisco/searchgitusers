import 'rxjs';
import { combineEpics } from 'redux-observable';
import { ajax } from 'rxjs/ajax';
import { of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import {FETCH_ALL_USERS} from './actionTypes';
import {fetchSuccess,fetchFailed} from './actions';

export const fetchAllUserEpic = (action$) => {
    return action$
        .ofType(FETCH_ALL_USERS)
        .pipe(
            switchMap(action => {
                return ajax.getJSON('https://api.github.com/users?since='+action.data)
                    .pipe(
                        map(users => fetchSuccess(users)),
                        catchError(error => of(fetchFailed()))
                    )
            })
        );
}

export default combineEpics(
    fetchAllUserEpic
);