import {Component, effect, input, model} from '@angular/core';
import {FormValueControl} from '@angular/forms/signals';
import {DigitOnly} from 'ngExt/core/directives/is-numeric';

@Component({
  selector: 'fs-phone-field',
  imports: [
    DigitOnly

  ],
  template: `
    <input
      class="form-field w-full"
      digitOnly
      (input)="updateValue($event.target.value)"
      [value]="value()"
      [disabled]="disabled()"
      [required]="required()"
      [placeholder]="placeholder()"
      [maxLength]="maxLength()"
    />
  `,
  styles: ``,
})
export class PhoneField implements FormValueControl<string> {

  value = model<string>('');
  disabled = input<boolean>(false);
  required = input<boolean>(false);
  placeholder = input<string>();
  maxLength = input<number>();


  updateValue(value: string) {
    this.value.set(value);
  }
}
