import { v4 } from 'uuid';

export default class Appointment {
  id: string;

  provider: string;

  date: Date;

  constructor({ provider, date }: Omit<Appointment, 'id'>) {
    this.id = v4();
    this.provider = provider;
    this.date = date;
  }
}
