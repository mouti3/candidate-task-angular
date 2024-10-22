import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { UsersService } from "src/generated/apis/users.service";
import { filterActions } from "./actions";
import { catchError, forkJoin, map, of, switchMap } from "rxjs";
import { FilterMapper } from "../../mappers/filter-mapper";

@Injectable()
export class FiltersEffects {
  constructor(private actions$: Actions, private userService: UsersService) {}

  getAllFilters$ = createEffect(() => 
    this.actions$.pipe(
      ofType(filterActions.getAllFilters),
      switchMap(() => {
        return forkJoin({
          usernames: this.userService.getUserNames(),
          emails: this.userService.getEmails(),
          roles: this.userService.getRoles(),
        }).pipe(
          map(({ usernames, emails, roles }) =>
            filterActions.getAllFiltersSuccess({
              data: [
                { key: 'none' },
                {
                  key: 'username',
                  placeHolder: 'Filter by name',
                  values: FilterMapper.mapUsernamesData(usernames.users),
                },
                {
                  key: 'email',
                  placeHolder: 'Filter by email',
                  values: FilterMapper.mapEmailsData(emails.users),
                },
                {
                  key: 'role',
                  placeHolder: 'Filter by role',
                  values: FilterMapper.mapRolesData(roles.users),
                },
              ],
            })
          ),
          catchError((error) =>
            of(filterActions.getAllFiltersFailure({ error }))
          )
        );
      })
    ), {
      functional: true
    }
  );
}