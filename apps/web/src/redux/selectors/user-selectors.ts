import { RootState } from "../store";

export const selectAllUsers = (state: RootState) => state.user.users;