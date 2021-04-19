import { call, put, select, takeLatest, takeLeading } from 'redux-saga/effects';
import {
  GET_TOKEN,
} from './constants';

import request from 'utils/request';
import { tokenReceived } from './actions';

const head_request = async(url) => {
  const response = await fetch(url, {
    method: 'HEAD',
    mode: 'same-origin',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Context-Type': 'application/json',
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
  });
  if (response.status >= 200 && response.status < 300) {
    if (response.status === 204 || response.status === 205) {
      return null;
    }
    return response;
  }
}

export function* getTokenGen() {
  const requestURL = `http://localhost:3000/get_csrf_token`;
  console.log('getTokenGen: ', requestURL);

  try {
    const response = yield call(head_request, requestURL, {credentials: "include",});
    const token = response.headers.get('x-csrf-token');
    console.log(`getTokenGen: ${token}`);
    yield put(tokenReceived(token));
  } catch (err) {
    console.log(`getTokenGenError: ${err}`);
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* getTokenReq() {
  // Watches for LOAD_REPOS actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLeading(GET_TOKEN, getTokenGen);
}
