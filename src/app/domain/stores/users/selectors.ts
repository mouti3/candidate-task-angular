import { createFeatureSelector, createSelector } from "@ngrx/store";
import { UsersStateInterface } from "./reducers";

export const selectUsersState =
  createFeatureSelector<UsersStateInterface>('users');

export const selectUsers = createSelector(
  selectUsersState,
  (state: UsersStateInterface) => state.users
);

export const selectUsersLoading = createSelector(
  selectUsersState,
  (state: UsersStateInterface) => state.loading
);

export const selectUsersError = createSelector(
  selectUsersState,
  (state: UsersStateInterface) => state.error
);