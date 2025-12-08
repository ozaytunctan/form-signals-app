import {Component, effect, signal} from '@angular/core';
import {CREATE_CUSTOMER_INITIAL_DATA, CUSTOMER_SCHEMA} from './create-customer-command';
import {Field, form} from '@angular/forms/signals';
import {hasError} from 'ngExt/core/utils/has-error';
import {JsonPipe} from '@angular/common';
import {ValidationErrors} from '@ngExt/ui/validations';
import {PhoneField} from '@ngExt/ui/inputs/phone-field/phone-field';
import {FsOption, Listbox} from '@ngExt/ui/inputs/listbox/listbox';
import {Country} from 'ngExt/core/models/country';

@Component({
  selector: 'fs-customer-create-form',
  imports: [
    Field,
    JsonPipe,
    ValidationErrors,
    PhoneField,
    Listbox,
    FsOption
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


            <div class="flex items-center gap-4 mb-4">
              <label class="w-32 text-sm font-medium text-gray-700">
                Phone:
              </label>
              <div class="flex flex-col w-full">
                <fs-phone-field
                  class="flex-1"
                  type="text"
                  [field]="customerForm.phone"
                  placeholder="(___) ___ __ __"
                />
                @if (hasError(customerForm.phone())) {
                  <fs-validation-errors class="text-red-500"
                                        [errors]="customerForm.phone().errors()"/>
                }
              </div>
            </div>


            <div>
              Address List:
              <div>
                @for (addressForm of customerForm.addresses; track $index) {
                  <h4>Address {{$index+1}}</h4>
                  <div class="flex items-center gap-4 mb-4">
                    <label class="w-32 text-sm font-medium text-gray-700">
                      Country:
                    </label>
                    <div class="flex flex-col w-full">
                      <fs-listbox [field]="addressForm.countryId">
                        @for (country of countries; track country.id) {
                          <fs-option
                            [value]="country.id"
                            [disabled]="country.disabled">{{ country.name }}
                          </fs-option>
                        }
                      </fs-listbox>
                      @if (hasError(addressForm.countryId())) {
                        <fs-validation-errors
                          class="text-red-500"
                          [errors]="addressForm.countryId().errors()"/>
                      }
                    </div>
                  </div>
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
          <br>
          Errors:
          <pre>
            {{ customerForm().errorSummary()|json }}
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


  countries: Country[] = [
    {id: 1, name: 'Türkiye', code: '1' ,disabled:false},
    {id: 2, name: 'ABD', code: '2',disabled: false}
  ];


  logFirstNameChanges = effect(() => {
    console.log(this.customerForm.firstName().value());
  })

  handleSubmit(e: Event) {
    e.preventDefault();
    alert(JSON.stringify(this.customerForm().value()));
  }
}
