import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { userDetailActions } from 'src/app/domain/stores/user-detail/actions';

@Injectable({
  providedIn: 'root',
})
export class UserDetailResolver {
  constructor(private store: Store) {}

  resolve(route: ActivatedRouteSnapshot): void {
    const userId = route.paramMap.get('userId')!;
    return this.store.dispatch(userDetailActions.getUserDetail({ userId }));
  }
}
