import { MatTableModule } from '@angular/material/table';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule } from '@angular/material/paginator';
import { UserlaneTableComponent } from './components/userlane-table/userlane-table.component';


@NgModule({
  declarations: [UserlaneTableComponent],
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule
  ],
  exports: [
    UserlaneTableComponent
  ]
})
export class SharedModule { }
