import {Component, signal} from '@angular/core';
import {CREATE_CUSTOMER_INITIAL_DATA, CUSTOMER_SCHEMA} from './create-customer-command';
import {Field, form} from '@angular/forms/signals';
import {ValidationErrors} from '../../../shared/components/validation-errors/validation-errors';
import {hasError} from '../../../core/utils/has-error';
import {JsonPipe} from '@angular/common';

@Component({
  selector: 'fs-customer-create-form',
  imports: [
    ValidationErrors,
    Field,
    JsonPipe
  ],
  template: `
    <div class="p-5  w-full h-full">
      <h2 class="flex justify-center m-4">Signal Forms</h2>
      <div class="flex flex-row gap-x-4 row-wrap">
        <form class="w-[600px]" (submit)="handleSubmit($event)">
          <div class="form-content">
            <!--            -->
            <div class="flex items-center gap-4 mb-4">
              <label class="w-32 text-sm font-medium text-gray-700">
                Name:
              </label>
              <div class="flex flex-col w-full">
                <input
                  type="text"
                  [field]="customerForm.firstName"
                  class="flex-1 form-field"
                  placeholder="Enter first name"
                />
                @if (hasError(customerForm.firstName())) {
                  <fs-validation-errors class="text-red-500"
                                        [errors]="customerForm.firstName().errors()"/>
                }
              </div>
            </div>


            <div class="flex items-center gap-4 mb-4">
              <label class="w-32 text-sm font-medium text-gray-700">
                Last Name:
              </label>
              <div class="flex flex-col w-full">
                <input
                  type="text"
                  [field]="customerForm.lastName"
                  class="flex-1 form-field"
                  placeholder="Enter last name"
                />
                @if (hasError(customerForm.lastName())) {
                  <fs-validation-errors class="text-red-500"
                                        [errors]="customerForm.lastName().errors()"/>
                }
              </div>
            </div>

            <button class="text-white bg-amber-600 px-6 py-2 cursor-pointer">Save</button>
          </div>
        </form>

        <div>
          Customer:
          <pre>
            {{ customerForm().value()|json }}
          </pre>
        </div>

      </div>
    </div>
  `,
  styles: `

  `,
})
export class CustomerCreateForm {

  customerModel = signal({...CREATE_CUSTOMER_INITIAL_DATA});
  customerForm = form(this.customerModel, CUSTOMER_SCHEMA);
  protected readonly hasError = hasError;

  handleSubmit(e:Event) {
    e.preventDefault();
    alert(JSON.stringify(this.customerForm().value()));
  }
}
