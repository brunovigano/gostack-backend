import { Router } from 'express';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

const appointmentsRouter = Router();
const appointmentsRepository = new AppointmentsRepository();

appointmentsRouter.post('/', (request, response) => {
  const { provider, date } = request.body;
  const findAppointmentInSameDate = appointmentsRepository.getByDate(date);

  if (findAppointmentInSameDate) {
    return response.status(400).json({ message: 'This appointment is already booked' });
  }

  const appointment = appointmentsRepository.create({ date, provider });
  return response.json(appointment);
});

appointmentsRouter.get('/', (request, response) => {
  const appointments = appointmentsRepository.get();
  return response.json(appointments);
});

export default appointmentsRouter;
