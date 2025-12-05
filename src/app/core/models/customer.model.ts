import {Address} from './addresses.model';
import {Department} from './department.model';

export interface Customer {
  name: string;
  lastName: string;
  email: string;
  phone: string;
  age: number;
  gender: boolean;
  department: Department,
  addresses: Address[],
  nameValid: boolean;
}
