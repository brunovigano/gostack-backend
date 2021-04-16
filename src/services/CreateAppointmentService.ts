import { startOfHour } from 'date-fns';
import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

interface Request {
  provider: string;
  date: Date;
}

export default class CreateAppointmentService {
  private appointmentsRepository: AppointmentsRepository;

  constructor(appointmentsRepository: AppointmentsRepository) {
    this.appointmentsRepository = appointmentsRepository;
  }

  public execute({ provider, date }: Request): Appointment {
    const parsedDate = startOfHour(date);
    const findAppointmentInSameDate = this.appointmentsRepository.getByDate(parsedDate);
    if (findAppointmentInSameDate) throw Error('This appointment is already booked');
    const appointment = this.appointmentsRepository.create({ provider, date: parsedDate });
    return appointment;
  }
}
