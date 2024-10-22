import { createReducer, on } from "@ngrx/store";
import { BackendErrorsInterface } from "src/generated/models/backend-errors.interface";
import { filterActions } from "./actions";
import { FilterInterface } from "src/app/shared/models/filter.interface";

export interface FilterStateInterface {
    loading: boolean;
    error: BackendErrorsInterface | null;
    data: FilterInterface[];
  }
  
  export const initialState: FilterStateInterface = {
    loading: false,
    error: null,
    data: []
  };
  
  export const filtersReducer = createReducer(
    initialState,
    on(filterActions.getAllFilters, (state) => ({
      ...state,
      loading: true,
      error: null,
    })),
    on(filterActions.getAllFiltersSuccess, (state, { data }) => ({
      ...state,
      loading: false,
      data
    })),
    on(filterActions.getAllFiltersFailure, (state, { error }) => ({
      ...state,
      loading: false,
      error,
    }))
  );