export interface Address {
  country: string;
  city: string;
  title: AddressTitle | number,
  zipCode: string;
}

export enum AddressTitle {
  HOME = 0,
  WORK = 1,
  OTHER = 2
}
