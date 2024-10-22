import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  combineLatest,
  concatMap,
  forkJoin,
  map,
  mergeMap,
  Observable,
} from 'rxjs';
import { filterActions } from 'src/app/domain/stores/filters/actions';
import {
  selectFilterData,
  selectFilterError,
  selectFilterLoading,
} from 'src/app/domain/stores/filters/selectors';
import { usersActions } from 'src/app/domain/stores/users/actions';
import {
  selectUsers,
  selectUsersError,
  selectUsersLoading,
} from 'src/app/domain/stores/users/selectors';
import { ColumnInterface } from 'src/app/shared/models/column.interface';
import { FilterInterface } from 'src/app/shared/models/filter.interface';
import { PaginationInterface } from 'src/app/shared/models/pagination.interface';
import { BackendErrorsInterface } from 'src/generated/models/backend-errors.interface';
import { GetUsersResponseInterface } from 'src/generated/models/getUsersResponse.interface';

@Component({
  selector: 'userlane-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
})
export class UsersComponent implements OnInit {

  public columnsConfig: ColumnInterface[] = [
    { columnDef: 'id', header: 'ID' },
    { columnDef: 'username', header: 'Name' },
    { columnDef: 'email', header: 'Email' },
    { columnDef: 'role', header: 'Role' },
    { columnDef: 'birthDate', header: 'Birth Date' },
  ];

  public pageNumber: number = 0;
  public pageSize: number = 10;
  public filterParams: string = '';


  data$: Observable<{
    loading: boolean;
    error: BackendErrorsInterface | null;
    data: GetUsersResponseInterface | null;
  }>;

  constructor(private store: Store) {
    this.data$ = combineLatest({
      loading: this.store.select(selectUsersLoading),
      error: this.store.select(selectUsersError),
      data: this.store.select(selectUsers),
    });
  }

  ngOnInit(): void {
    this.buildFilters();
    this.loadUsers();
  }

  loadUsers() {
    const paramsUrl = this.buildParams();
    this.store.dispatch(usersActions.getUsers({ paramsUrl }));
  }

  buildFilters() {
    this.store.dispatch(filterActions.getAllFilters());
  }

  public onPaginationHandler(pagination: PaginationInterface): void {
    this.pageSize = pagination.pageSize;
    this.pageNumber = pagination.pageNumber;
    this.loadUsers();
  }

  private buildParams(): string {
    const pagination = `limit=${this.pageSize}&skip=${
      (this.pageNumber * this.pageSize)
    }`;
    return this.filterParams
      ? `${this.filterParams}&${pagination}`
      : `?${pagination}`;
  }

}
