import { RootStore } from "store";

export const UserToken = (state: RootStore) => state.auth.userToken;
