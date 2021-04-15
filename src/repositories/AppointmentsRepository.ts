import { isEqual, startOfHour, parseISO } from 'date-fns';
import Appointment from '../models/Appointment';

export default class AppointmentsRepository {
  private appointments: Appointment[] = [];

  constructor() {
    this.appointments = [];
  }

  public create(provider: string, date: string): Appointment {
    const parsedDate = startOfHour(parseISO(date));
    const appointment: Appointment = new Appointment(provider, parsedDate);

    this.appointments.push(appointment);
    return appointment;
  }

  public get(): Appointment[] {
    return this.appointments;
  }

  public getByDate(date: string): Appointment | null {
    const parsedDate = startOfHour(parseISO(date));

    const findAppointment = this.appointments.find(appointment =>
      isEqual(appointment.date, parsedDate),
    );

    return findAppointment || null;
  }
}
