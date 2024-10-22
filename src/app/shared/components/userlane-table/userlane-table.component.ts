import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ColumnInterface } from '../../models/column.interface';
import { PaginationInterface } from '../../models/pagination.interface';

@Component({
  selector: 'userlane-table',
  templateUrl: './userlane-table.component.html',
  styleUrl: './userlane-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserlaneTableComponent implements OnInit {
  @Input() columns: ColumnInterface[] = [];
  @Input() data: any[] = [];
  @Input()
  pageSize!: number;
  @Input() totalData!: number;
  @Input() pageNumber!: number;

  @Output() onPaginationChanged: EventEmitter<PaginationInterface> =
    new EventEmitter();

  @Output() onSelectedRowItemId: EventEmitter<string> = new EventEmitter();

  displayedColumns: string[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor() {}

  ngOnInit() {
    this.displayedColumns = this.columns.map((c) => c.columnDef);
  }

  onPaginationChange($event: PageEvent) {
    this.onPaginationChanged.emit({
      pageNumber: $event.pageIndex,
      pageSize: $event.pageSize,
    });
  }

  onSelectRow({ id }: { id: string }) {
    this.onSelectedRowItemId.emit(id);
  }
}
