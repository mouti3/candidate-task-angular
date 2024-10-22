import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { UserDetailResolver } from './services/user-detail-resolver.service';

const routes: Routes = [{
  path: '',
  component: UserDetailComponent,
  resolve: {
    userDetail: UserDetailResolver
  } 
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserDetailRoutingModule { }
