import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap } from "rxjs";
import { UsersService } from "src/generated/apis/users.service";
import { usersActions } from "./actions";
import { GetUsersResponseInterface } from "src/generated/models/getUsersResponse.interface";

@Injectable()
export class UsersEffects {
  constructor(private actions$: Actions, private userService: UsersService) {}

  getUsers$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(usersActions.getUsers),
        switchMap(({ paramsUrl }) => {
          return this.userService.getUsers(paramsUrl).pipe(
            map((users: GetUsersResponseInterface) => {
              return usersActions.getUsersSuccess({ users });
            }),
            catchError((error) => {
              return of(usersActions.getUsersFailure(error));
            })
          );
        })
      ),
    {
      functional: true,
    }
  );
}