import { Company } from "./user-company-interface";
import { Address } from './user-address-interface';


export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
}