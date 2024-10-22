import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserDetailStateInterface } from './reducers';

export const selectUserDetailState =
  createFeatureSelector<UserDetailStateInterface>('userDetail');

export const selectUserDetail = createSelector(
  selectUserDetailState,
  (state: UserDetailStateInterface) => state.data
);

export const selectUserDetailLoading = createSelector(
  selectUserDetailState,
  (state: UserDetailStateInterface) => state.loading
);

export const selectUserDetailError = createSelector(
  selectUserDetailState,
  (state: UserDetailStateInterface) => state.error
);
