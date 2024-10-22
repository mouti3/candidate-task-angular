import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersRoutingModule } from './users-routing.module';
import { SharedModule } from '../shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { usersReducer } from '../domain/stores/users/reducers';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from '../domain/stores/users/effects';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    UsersRoutingModule,
    SharedModule,
    StoreModule.forFeature('users', usersReducer),
    EffectsModule.forFeature([UserEffects]),
  ]
})
export class UsersModule { }
