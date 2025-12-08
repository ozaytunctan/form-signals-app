import {Component, signal} from '@angular/core';
import {
  apply,
  customError,
  Field,
  FieldState,
  form,
  max,
  minLength,
  required,
  schema,
  validate
} from '@angular/forms/signals';
import {JsonPipe} from '@angular/common';
import {Address, AddressTitle} from '../../core/models/addresses.model';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {ValidationErrors} from '../../shared/components/validations/validation-errors/validation-errors';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {Customer} from '../../core/models/customer.model';

export const CUSTOMER_EMPTY = {
  name: '',
  lastName: '',
  email: '',
  age: 20,
  gender: true,
  phone: '',
  nameValid: false,
  department: {
    name: '',
    description: '',
  },
  addresses: [
    {
      country: '',
      city: '',
      title: AddressTitle.HOME,
      zipCode: ''
    }
  ]
}

@Component({
  selector: 'fs-signal-form-page',
  imports: [
    JsonPipe,
    MatFormFieldModule,
    MatInputModule,
    Field,
    ValidationErrors,
    MatIconModule,
    MatButtonModule,
  ],
  template: `

    <div class="p-5  w-full h-full">
      <h2 class="flex justify-center m-4">Signal Forms</h2>
      <div class="flex flex-row gap-x-4 row-wrap">
        <form class="w-[600px]">
          <div class="form-content">
            <!--            -->
            <div class="flex items-center gap-4 mb-4">
              <label class="w-32 text-sm font-medium text-gray-700">
                Name:
              </label>
              <div class="flex flex-col w-full">
                <input
                  type="text"
                  [field]="customerForm.name"
                  class="flex-1 rounded-lg border border-gray-300 px-3 py-2
                           focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  placeholder="Enter first name"
                />
                @if (this.hasError(customerForm.name())) {
                  <fs-validation-errors class="text-red-500"
                                        [errors]="customerForm.name().errors()"/>
                }
              </div>
            </div>

            <!--            -->
            <div class="flex items-center gap-4 mb-4">
              <label class="w-32 text-sm font-medium text-gray-700">
                Last Name:
              </label>
              <div class="flex flex-col w-full">
                <input
                  type="text"
                  [field]="customerForm.lastName"
                  class="flex-1 rounded-lg border border-gray-300 px-3 py-2
                           focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  placeholder="Enter last name"
                />
                @if (this.hasError(customerForm.lastName())) {
                  <fs-validation-errors class="text-red-500"
                                        [errors]="customerForm.lastName().errors()"/>
                }
              </div>
            </div>

            <!--            -->
            <div class="flex items-center gap-4 mb-4">
              <label class="w-32 text-sm font-medium text-gray-700">
                Email:
              </label>
              <div class="flex flex-col w-full">
                <input
                  type="text"
                  [field]="customerForm.email"
                  class="flex-1 rounded-lg border border-gray-300 px-3 py-2
                           focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  placeholder="Enter email address"
                />
                @if (this.hasError(customerForm.email())) {
                  <fs-validation-errors class="text-red-500"
                                        [errors]="customerForm.email().errors()"/>
                }
              </div>
            </div>

            <!--            -->
            <div class="flex items-center gap-4 mb-4">
              <label class="w-32 text-sm font-medium text-gray-700">
                Age:
              </label>
              <div class="flex flex-col w-full">
                <input
                  type="number"
                  [field]="customerForm.age"
                  class="flex-1 rounded-lg border border-gray-300 px-3 py-2
                           focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  placeholder="Enter age"
                />
                @if (this.hasError(customerForm.age())) {
                  <fs-validation-errors class="text-red-500"
                                        [errors]="customerForm.age().errors()"/>
                }
              </div>
            </div>


            <div class="flex items-center gap-4 mb-4">
              <label class="w-32"></label>
              <div class="flex w-full ">
                <button class="text-white cursor-pointer bg-blue-500 border rounded-sm px-6 py-2">Save</button>
              </div>
            </div>

          </div>
        </form>


        <div class="text-black bg-white p-4 border-2 rounded-sm">
          Customer:
          <pre>
            {{ customerModel()|json }}
          </pre>

          Error:
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
export class SignalFormPage {
  customerModel = signal<Customer>(CUSTOMER_EMPTY);
  customerForm = form(this.customerModel, (path) => {
    apply(path, nameSchema)
    required(path.lastName,{message:"Soyad alanı zorunlu"})
    max(path.age, 100, {message: "Yaş maksimum 100 olmalıdır."})

  });

  hasError(field: FieldState<any>) {
    return field.invalid() && field.touched();
  }

  addNewAddressItem() {
    let address = this.customerForm.addresses();
    address.value.update(addr => [...addr, {
      zipCode: '',
      title: AddressTitle.WORK,
      city: '',
      country: 'ABD'
    }]);
  }

  onRemoveAddressItem(i: number) {
    let address = this.customerForm.addresses();
    address.value.update(values =>
      [...values.filter((v: Address, index: number) => index != i)])
  }
}

export const nameSchema = schema<Customer>((root) => {
  required(root.name, {message: 'Ad alanı zorunlu.'})
  minLength(root.name, 5, {message: "Ad alanı enaz 5 karakter olmalıdır."})
  validate(root.name, ({value}) => {
    const nameText = value();
    if (nameText != 'Muhittin') {
      return customError({
        kind: "muhittinPrefixInvalid",
        message: "Ad alanı muhittin ile başlamalı."
      })
    }
    return null;
  })
});


