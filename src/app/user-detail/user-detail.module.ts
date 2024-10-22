import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDetailRoutingModule } from './user-detail-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    UserDetailRoutingModule,
    SharedModule
  ]
})
export class UserDetailModule { }
