import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDetailRoutingModule } from './user-detail-routing.module';
import { SharedModule } from '../shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { userDetailReducer } from '../domain/stores/user-detail/reducers';
import { EffectsModule } from '@ngrx/effects';
import { UserDetailsEffects } from '../domain/stores/user-detail/effects';

@NgModule({
  declarations: [UserDetailComponent],
  imports: [
    CommonModule,
    UserDetailRoutingModule,
    SharedModule,
    StoreModule.forFeature('userDetail', userDetailReducer),
    EffectsModule.forFeature([UserDetailsEffects])
  ]
})
export class UserDetailModule { }
