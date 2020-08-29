import { Client } from '../client/client';
import { Employee } from '../employee/employee';

export class Contract {
  idcontract?: string;
  cost: number;
  startDate: string;
  endDate: string;
  idemployee: string;
  idclient: string;
  client?: Client;
  contractor?: Employee;
}
