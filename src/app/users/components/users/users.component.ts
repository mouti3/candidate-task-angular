import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { usersActions } from 'src/app/domain/stores/users/actions';

@Component({
  selector: 'userlane-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
})
export class UsersComponent implements OnInit {

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.buildFilters();
    this.loadUsers();
  }
  loadUsers() {
    this.store.dispatch(usersActions.getUsers({paramsUrl: ''}))
  }
  buildFilters() {
    // implement the dispatch filter
  }
}
