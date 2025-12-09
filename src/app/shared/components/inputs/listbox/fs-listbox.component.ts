import {Component, computed, contentChildren, inject, input, model} from '@angular/core';
import {FormValueControl} from '@angular/forms/signals';

@Component({
  selector: 'fs-listbox',
  imports: [],
  template: `
    <ng-content></ng-content>
  `,
  styles: ``,
  host: {
    'role': 'listbox',
    'class': 'fs-listbox'
  }
})
export class FsListbox implements FormValueControl<any> {
  value = model<any>();
  disabled = input<boolean>(false);
  options = contentChildren<FsOption>(FsOption);
}


@Component({
  selector: `fs-option`,
  template: `
    <ng-content></ng-content>
    @if (isSelected()) {
      ✓
    }
  `,
  host: {
    'role':'option',
    '(click)': 'selectOption()',
    '[attr.aria-disabled]': 'isDisabled()',
    '[attr.aria-selected]': 'isSelected()',
    '[class.selected]': 'isSelected()'
  }
})
export class FsOption {
  private readonly _listbox = inject<FsListbox>(FsListbox);
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
