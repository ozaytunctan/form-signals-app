import {Directive, ElementRef} from '@angular/core';


@Directive(
  {
    selector: 'input[digitOnly]',
    host: {
      '(input)': 'updateValue($event)'
    }
  }
)
export class DigitOnly {

  constructor(private _el: ElementRef) {
  }

  updateValue(event: Event) {
    const initialValue = this._el.nativeElement.value;
    this._el.nativeElement.value = initialValue.replace(/[^0-9]*/g, '');
    if (initialValue !== this._el.nativeElement.value) {
      event.stopPropagation();
    }
  }

}
