import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type UserStateType = { loading: boolean, error?: FriendlyErrorType, users: UserDataType[] }
const Slice = createSlice({
    name: "",
    initialState: {} as UserStateType,
    reducers: {
        fetchUsers: (state, action: PayloadAction<string>) => { return { ...state } },
        fetchUsersSucceeded: (state, action: PayloadAction<UserDataType[]>) => { return { ...state, users: action.payload } },
        fetchUsersFailed: (state, action: PayloadAction<FriendlyErrorType>) => { return { ...state, error: action.payload } },
    }
})
export const { fetchUsers, fetchUsersSucceeded, fetchUsersFailed } = Slice.actions;
export default Slice.reducer;