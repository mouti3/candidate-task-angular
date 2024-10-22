import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { UsersService } from "src/generated/apis/users.service";
import { userDetailActions } from "./actions";
import { catchError, map, of, switchMap } from "rxjs";
import { UserInterface } from "src/generated/models/user.interface";

@Injectable()
export class UserDetailsEffects {
  constructor(private actions$: Actions, private userService: UsersService) {}

  getUserDetail$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(userDetailActions.getUserDetail),
        switchMap(({ userId }) => {
          return this.userService.getUserDetails(userId).pipe(
            map((data: UserInterface) => {
              return userDetailActions.getUserDetailSuccess({ data });
            }),
            catchError((error) => {
              return of(userDetailActions.getUserDetailFailure(error));
            })
          );
        })
      ),
    {
      functional: true,
    }
  );
}