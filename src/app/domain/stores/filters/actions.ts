import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { FilterInterface } from "src/app/shared/models/filter.interface";
import { BackendErrorsInterface } from "src/generated/models/backend-errors.interface";

export const filterActions = createActionGroup({
    source: 'filters',
    events: {
      'Get all filters': emptyProps(),
      'Get all filters success': props<{
        data: FilterInterface[]
      }>(),
      'Get all filters failure': props<{ error: BackendErrorsInterface }>(),
    },
  });
  