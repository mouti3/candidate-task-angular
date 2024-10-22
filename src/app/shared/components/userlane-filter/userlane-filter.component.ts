import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FilterInterface } from '../../models/filter.interface';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { FilterValueInterface } from '../../models/filter-value.interface';

@Component({
  selector: 'userlane-filter',
  templateUrl: './userlane-filter.component.html',
  styleUrl: './userlane-filter.component.css'
})
export class UserlaneFilterComponent {
  @Input() filters!: FilterInterface[];
  @Output() onFilterChanged: EventEmitter<FilterValueInterface> =
    new EventEmitter();

  public filteredOptions: string[] = [];
  currentFilter: FilterInterface = {
    key: 'none'
  }

  formFilter: FormGroup;

  constructor(private fb: FormBuilder) {
    this.formFilter = fb.group({
      key: ['none'],
      value: [''],})
  }

  ngOnInit(): void {
    this.formFilter.valueChanges.subscribe((values) => {
      this.filteredOptions = this._filter(values.key, values.value || '');
    });
  }

  onSelectFilterType($event: MatSelectChange) {
    if($event.value === 'none') {
      this.onFilterChanged.emit({
        key: 'none'
      })
    }
  }

  onSelectFilterValue(value: string) {
    this.onFilterChanged.emit({
      key: this.formFilter.value.key,
      value
    })
  }

  private _filter(key: string,value: string): string[] {
    const filterValue = value.toLowerCase();
    const options = this.filters.find(f => f.key === key)?.values;
    if(options) {
      return options.filter((option) =>
        option.toLowerCase().includes(filterValue));
    }
    return [];
  }
}
