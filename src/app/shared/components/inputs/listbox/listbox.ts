import {Component, contentChildren, input, model, output, signal, ViewEncapsulation} from '@angular/core';
import {FormValueControl} from '@angular/forms/signals';

@Component({
  selector: 'fs-listbox',
  imports: [],
  template: `
    <ng-content></ng-content>
  `,
  styles: ``,
  host: {
    'class': 'fs-listbox flex flex-col',
  }
})
export class Listbox implements FormValueControl<any> {
  value = model<any>();
  options = contentChildren<FsOption>(FsOption);

  ngAfterContentInit() {
    this.options().forEach((option) => {
      option.selectValue.subscribe(value => {
        this.value.set(value);
        this.options().forEach((option) => {
          option.selected.set(option.value() === value);
        })
      });
    })
  }

}


@Component({
  selector: `fs-option`,
  template: `
    <span class="list-option-item">
    <ng-content></ng-content>
    </span>
  `,

  styles: [`
    .selected {
      color: blue;
    }
  `],
  host: {
    '(click)': 'onSelectOption()',
    '[class.selected]': 'selected()',


  },
  encapsulation: ViewEncapsulation.None,
})
export class FsOption {

  value = input<any>();
  selected = signal<boolean>(false);
  selectValue = output<any>();

  onSelectOption() {
    this.selected.set(true);
    this.selectValue.emit(this.value());
  }

}
