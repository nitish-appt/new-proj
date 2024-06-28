import { all, call } from "redux-saga/effects";
import { userSagas } from "./user-sagas";


function* rootSagas() {
  yield all([call(userSagas)]);
  
}

export { rootSagas }