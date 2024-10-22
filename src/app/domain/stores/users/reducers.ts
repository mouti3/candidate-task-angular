import { createReducer, on } from "@ngrx/store";
import { BackendErrorsInterface } from "src/generated/models/backend-errors.interface";
import { GetUsersResponseInterface } from "src/generated/models/getUsersResponse.interface";
import { usersActions } from "./actions";

export interface UsersStateInterface {
    loading: boolean
    error: BackendErrorsInterface | null
    users: GetUsersResponseInterface | null
  }

export const initialState: UsersStateInterface = {
    loading: false,
    error: null,
    users: null,
  };
  
export const usersReducer = createReducer(
    initialState,
    on(usersActions.getUsers, (state) => ({
      ...state,
      loading: true,
      error: null,
    })),
    on(usersActions.getUsersSuccess, (state, { users }) => {
      return ({
        ...state,
        loading: false,
        users,
      })
    }),
    on(usersActions.getUsersFailure, (state, {error}) => ({
      ...state,
      loading: false,
      error,
    })),
  );