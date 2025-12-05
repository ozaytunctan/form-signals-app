import {apply, applyWhenValue, minLength, required, schema} from '@angular/forms/signals';

export interface CreateCustomerCommand {
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  phone: string;
  addresses: CreateCustomerAddressCommand[];
}

export interface CreateCustomerAddressCommand {
  city: string;
  country: string;
  zipcode: string;
}

export const CUSTOMER_ADDRESS_INITIAL_DATA: CreateCustomerAddressCommand = {
  city: '',
  country: '',
  zipcode: '',
}

export const CREATE_CUSTOMER_INITIAL_DATA: CreateCustomerCommand = {
  firstName: '',
  lastName: '',
  email: '',
  age: 20,
  phone: '',
  addresses: [CUSTOMER_ADDRESS_INITIAL_DATA]
};


export const firstNameSchema = schema<CreateCustomerCommand>(path => {
  required(path.firstName, {message: 'Ad alanı zorunlu'})
  minLength(path.firstName, 4, {message: 'Ad alanı enaz 4 karakter olmalıdır.'})
});

export const CUSTOMER_SCHEMA = schema<CreateCustomerCommand>((root) => {
  applyWhenValue(root, c=>c.age>20,firstNameSchema)
});


