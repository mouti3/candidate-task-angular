import { createActionGroup, props } from "@ngrx/store";
import { BackendErrorsInterface } from "src/generated/models/backend-errors.interface";
import { UserInterface } from "src/generated/models/user.interface";

export const userDetailActions = createActionGroup({
    source: 'userDetail',
    events: {
      'Get userDetail': props<{ userId: string }>(),
      'Get userDetail success': props<{ data: UserInterface }>(),
      'Get userDetail failure': props<{ error: BackendErrorsInterface }>(),
    },
  });