import {FieldState} from '@angular/forms/signals';

export function hasError(field: FieldState<any>) {
  return field.invalid() && field.touched();
}
