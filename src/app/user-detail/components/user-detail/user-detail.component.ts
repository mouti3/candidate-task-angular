import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { combineLatest, Observable } from 'rxjs';
import { userDetailActions } from 'src/app/domain/stores/user-detail/actions';
import { selectUserDetail, selectUserDetailError, selectUserDetailLoading } from 'src/app/domain/stores/user-detail/selectors';
import { BackendErrorsInterface } from 'src/generated/models/backend-errors.interface';
import { UserInterface } from 'src/generated/models/user.interface';

@Component({
  selector: 'userlane-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserDetailComponent {
  
  isEditMode = false;

  userDetail$: Observable<{ loading: boolean; error: BackendErrorsInterface | null; data: UserInterface | null; }>;

  constructor(
    private router: Router,
    private store: Store
  ) {
    this.userDetail$ =  combineLatest({
      loading: this.store.select(selectUserDetailLoading),
      error: this.store.select(selectUserDetailError),
      data: this.store.select(selectUserDetail),
    })
  }

  ngOnInit(): void {
  }

  onUpdateUser(userId: number,userDetails: UserInterface) {
    this.isEditMode = !this.isEditMode;
    this.store.dispatch(userDetailActions.updateUserDetail({
      userId: `${userId}`,
      userDetails
    }))
  } 

  handleEditMode() {
    this.isEditMode = !this.isEditMode;
  }

  onBackClicked() {
    this.router.navigate([''])
  }
}
