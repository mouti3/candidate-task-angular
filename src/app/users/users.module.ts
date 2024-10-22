import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersRoutingModule } from './users-routing.module';
import { SharedModule } from '../shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { usersReducer } from '../domain/stores/users/reducers';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from '../domain/stores/users/effects';
import { filtersReducer } from '../domain/stores/filters/reducers';
import { FiltersEffects } from '../domain/stores/filters/effects';
import { UsersComponent } from './components/users/users.component';




@NgModule({
  declarations: [UsersComponent],
  imports: [
    CommonModule,
    SharedModule,
    UsersRoutingModule,
    StoreModule.forFeature('users', usersReducer),
    StoreModule.forFeature('filters', filtersReducer),
    EffectsModule.forFeature([UserEffects,FiltersEffects]),
  ]
})
export class UsersModule { }
