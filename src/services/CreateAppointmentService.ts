/* eslint-disable class-methods-use-this */
import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

interface Request {
  provider: string;
  date: Date;
}

export default class CreateAppointmentService {
  public async execute({ provider, date }: Request): Promise<Appointment> {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);
    const parsedDate = startOfHour(date);
    const findAppointmentInSameDate = await appointmentsRepository.getByDate(parsedDate);
    if (findAppointmentInSameDate) throw Error('This appointment is already booked');
    const appointment = appointmentsRepository.create({ provider, date: parsedDate });
    await appointmentsRepository.save(appointment);

    return appointment;
  }
}
