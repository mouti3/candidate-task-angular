import { createFeatureSelector, createSelector } from "@ngrx/store";
import { FilterStateInterface } from "./reducers";

export const selectFiltersState = createFeatureSelector<FilterStateInterface>('filters');

export const selectFilterLoading = createSelector(
  selectFiltersState,
  (state: FilterStateInterface) => state.loading
);

export const selectFilterError = createSelector(
  selectFiltersState,
  (state: FilterStateInterface) => state.error
);

export const selectFilterData = createSelector(
  selectFiltersState,
  (state: FilterStateInterface) => state.data
);