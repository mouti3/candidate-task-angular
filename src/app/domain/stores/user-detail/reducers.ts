import { createReducer, on } from "@ngrx/store";
import { BackendErrorsInterface } from "src/generated/models/backend-errors.interface";
import { UserInterface } from "src/generated/models/user.interface";
import { userDetailActions } from "./actions";

export interface UserDetailStateInterface {
    loading: boolean
    error: BackendErrorsInterface | null
    data: UserInterface | null
  }

export const initialState: UserDetailStateInterface = {
    loading: false,
    error: null,
    data: null,
  };
  
export const userDetailReducer = createReducer(
    initialState,
    on(userDetailActions.getUserDetail, (state) => ({
      ...state,
      loading: true,
      error: null,
    })),
    on(userDetailActions.getUserDetailSuccess, (state, { data }) => {
      return ({
        ...state,
        loading: false,
        data,
      })
    }),
    on(userDetailActions.getUserDetailFailure, (state, {error}) => ({
      ...state,
      loading: false,
      error,
    })),
  );