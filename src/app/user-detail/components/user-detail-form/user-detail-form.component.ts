import { formatDate } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserInterface } from 'src/generated/models/user.interface';

@Component({
  selector: 'userlane-user-detail-form',
  templateUrl: './user-detail-form.component.html',
  styleUrl: './user-detail-form.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserDetailFormComponent implements OnInit {
  @Input({ required: true }) user!: UserInterface;
  @Output() onUpdateUser: EventEmitter<UserInterface> =
    new EventEmitter<UserInterface>();

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required],
      birthDate: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    this.form.setValue({
      username: this.user.username,
      email: this.user.email,
      role: this.user.role,
      birthDate: new Date(this.user.birthDate),
    });
  }

  onSubmitForm() {
    const birthDate = formatDate(
      this.form.get('birthDate')?.value,
      'yyyy-MM-dd',
      'en'
    );
    this.onUpdateUser.emit({
      ...this.form.value,
      birthDate,
    });
  }
}
