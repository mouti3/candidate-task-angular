import { UserlaneFilterComponent } from './components/userlane-filter/userlane-filter.component';
import { MatTableModule } from '@angular/material/table';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule } from '@angular/material/paginator';
import { UserlaneTableComponent } from './components/userlane-table/userlane-table.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import {
  provideNativeDateAdapter,
} from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';

@NgModule({
  declarations: [UserlaneTableComponent, UserlaneFilterComponent],
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatCardModule,
    MatButtonModule,
    MatDatepickerModule,
  ],
  providers: [
    provideNativeDateAdapter(),
  ],
  exports: [
    UserlaneTableComponent,
    UserlaneFilterComponent,
    MatFormFieldModule,
    MatCardModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatDatepickerModule,
  ],
})
export class SharedModule {}
