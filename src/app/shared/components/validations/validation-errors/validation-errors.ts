import {Component, input} from '@angular/core';
import {ValidationError} from '@angular/forms/signals';
import {MatError} from '@angular/material/form-field';

@Component({
  selector: 'fs-validation-errors',
  imports: [
    MatError
  ],
  template: `
    @let _errors = errors();
    @if (_errors && _errors.length > 0) {
      <div>
        @for (error of _errors; track error) {
          <mat-error>{{ error.message }}</mat-error>
        }
      </div>
    }

  `,
  styles: ``,
})
export class ValidationErrors {
  errors =//
    input.required<ValidationError.WithField[]>();
}
