import { all, call, put, takeLatest } from "redux-saga/effects"

import { fetchUsers, fetchUsersSucceeded, fetchUsersFailed } from "../slices/user-slice";
import { PayloadAction } from "@reduxjs/toolkit";
import { fetchUsersAPI } from "../../services/user-service";

function* fetchUsersSaga(action: PayloadAction<string>) {
    try {
        const users: UserDataType[] = yield fetchUsersAPI(action.payload);
        yield put(fetchUsersSucceeded(users));
    } catch (err) {
        yield put(fetchUsersFailed({ message: "Failed to fetch message." }));
    }
}

function* fetchUsersWatcher() {
    yield takeLatest(fetchUsers.type, fetchUsersSaga);
}

function* userSagas() {
    yield all([
        call(fetchUsersWatcher)
    ])
}

export { userSagas }