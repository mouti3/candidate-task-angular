import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDetailRoutingModule } from './user-detail-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [UserDetailComponent],
  imports: [
    CommonModule,
    UserDetailRoutingModule,
    SharedModule
  ]
})
export class UserDetailModule { }
