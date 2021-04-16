import { isEqual, startOfHour, parseISO } from 'date-fns';
import Appointment from '../models/Appointment';

interface CreateAppointmentDTO {
  provider: string;
  date: Date;
}
export default class AppointmentsRepository {
  private appointments: Appointment[] = [];

  constructor() {
    this.appointments = [];
  }

  public create({ date, provider }: CreateAppointmentDTO): Appointment {
    const appointment: Appointment = new Appointment({ provider, date });

    this.appointments.push(appointment);
    return appointment;
  }

  public get(): Appointment[] {
    return this.appointments;
  }

  public getByDate(date: Date): Appointment | null {
    const findAppointment = this.appointments.find(appointment => isEqual(appointment.date, date));
    return findAppointment || null;
  }
}
