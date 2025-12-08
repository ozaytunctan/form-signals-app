import {AfterContentInit, Component, computed, contentChildren, effect, inject, input, model} from '@angular/core';
import {FormValueControl} from '@angular/forms/signals';

@Component({
  selector: 'fs-listbox',
  imports: [],
  template: `
    <ng-content></ng-content>
  `,
  styles: ``,
  host: {
    'class': 'fs-listbox'
  }
})
export class Listbox implements FormValueControl<any> {
  value = model<any>();
  disabled = input<boolean>(false);
  options = contentChildren<FsOption>(FsOption);
}


@Component({
  selector: `fs-option`,
  template: `
    <ng-content></ng-content>
  `,
  host: {
    '(click)': 'selectOption()',
    '[class.selected]': 'isSelected()'
  }
})
export class FsOption {
  private readonly _listbox = inject<Listbox>(Listbox);
  value = input<any>();
  disabled = input<boolean>(false);
  isDisabled = computed(() => this.disabled() || this._listbox.disabled());
  isSelected = computed(() => !this.isDisabled() && this._listbox.value() === this.value());
  selectOption() {
    if (!this.isDisabled()) {
      this._listbox.value.set(this.value());
    }
  }

}
