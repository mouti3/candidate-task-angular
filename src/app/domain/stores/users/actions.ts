import { createActionGroup, props } from "@ngrx/store";
import { BackendErrorsInterface } from "src/generated/models/backend-errors.interface";
import { GetUsersResponseInterface } from "src/generated/models/getUsersResponse.interface";

export const usersActions = createActionGroup({
    source: 'users',
    events: {
      'Get users': props<{ paramsUrl: string }>(),
      'Get users success': props<{ users: GetUsersResponseInterface }>(),
      'Get users failure': props<{ error: BackendErrorsInterface }>(),
    },
  });
  