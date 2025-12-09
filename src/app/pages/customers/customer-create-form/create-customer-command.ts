import {
  apply,
  applyEach,
  debounce,
  disabled,
  email,
  maxLength,
  minLength,
  required,
  schema
} from '@angular/forms/signals';

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
  countryId: number | null;
  zipcode: string;
}

export const CUSTOMER_ADDRESS_INITIAL_DATA: CreateCustomerAddressCommand = {
  city: '',
  countryId: null,
  zipcode: '',
}
export const CREATE_CUSTOMER_INITIAL_DATA: CreateCustomerCommand = {
  firstName: '',
  lastName: '',
  email: '',
  age: 20,
  phone: '',
  addresses: [{...CUSTOMER_ADDRESS_INITIAL_DATA}]
};
export const lastNameSchema = schema<{ lastName: string }>((path) => {
  required(path.lastName, {message: 'Soyad alanı zorunlu.'});
  minLength(path.lastName, 2, {message: 'Soyad minimum 2 karakter olmalı.'});
  maxLength(path.lastName, 255, {message: 'Soyad maksimum 255 karakter olmalı.'});
  debounce(path.lastName, 500)
});

export const firstNameSchema = schema<CreateCustomerCommand>(path => {
  required(path.firstName, {message: 'Ad alanı zorunlu'});
  minLength(path.firstName, 4, {message: 'Ad alanı minimum 4 karater girilmelidir.'});
  maxLength(path.firstName, 255, {message: 'Ad alanına maksimum 255 karakter girilmelidir.'})
});

export const ADDRESS_SCHEMA = schema<CreateCustomerAddressCommand>((path) => {
  required(path.countryId, {message: "Ülke seçiniz."});
  disabled(path.countryId, () => false);
  required(path.city, {message: 'Şehir seçiniz.'})
})

export const CUSTOMER_SCHEMA = schema<CreateCustomerCommand>((root) => {
  apply(root, firstNameSchema);
  apply(root, lastNameSchema);
  email(root.email, {message: 'Email formatı hatalı.'});
  maxLength(root.phone, 10);
  applyEach(root.addresses, ADDRESS_SCHEMA)
});



