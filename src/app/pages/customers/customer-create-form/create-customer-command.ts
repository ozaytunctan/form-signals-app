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
  addresses: [{...CUSTOMER_ADDRESS_INITIAL_DATA},{...CUSTOMER_ADDRESS_INITIAL_DATA}]
};


export const firstNameSchema = schema<CreateCustomerCommand>(path => {
  required(path.firstName, {message: 'Ad alanı zorunlu'});
  minLength(path.firstName, 4, {message: 'Ad alanı minimum 4 karater girilmelidir.'});
  maxLength(path.firstName, 255, {message: 'Ad alanına maksimum 255 karakter girilmelidir.'})
});


export const ADDRESS_SCHEMA = schema<CreateCustomerAddressCommand>((path) => {
  required(path.countryId, {message: "Ülke seçiniz."});
  disabled(path.countryId, () => false);
  required(path.city,{message:'Şehir seçiniz.'})
})

export const CUSTOMER_SCHEMA = schema<CreateCustomerCommand>((root) => {
  // applyWhenValue(root, c => c.age > 20, firstNameSchema)
  apply(root, firstNameSchema);
  required(root.lastName, {message: 'Soyad alanı zorunlu.'})
  debounce(root.lastName, 500);
  email(root.email, {message: 'Email formatı hatalı.'});
  maxLength(root.phone, 10);
  applyEach(root.addresses, ADDRESS_SCHEMA)
});



