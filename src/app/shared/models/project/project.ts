import {Client} from '../client/client';
import {Employee} from '../employee/employee';

export class Project {
  idproject?: string;
  kind: string;
  dateInit: string;
  dateFinish: string;
  direction: string;
  state: string;
  cost: number;
  description: string;
  idemployee: string;
  idclient: string;
  client?: Client;
  employee?: Employee;
}
