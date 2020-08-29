import { Employee } from '../employee/employee';
import { Advance } from '../advance/advance';
import { Contract } from '../contract/contract';

export class Project {
  idproject?: string;
  address: string;
  status: string;
  description: string;
  projectType: string;
  employees: Array<Employee>;
  advances: Array<Advance>;
  idcontract: string;
  contract?: Contract;
}
