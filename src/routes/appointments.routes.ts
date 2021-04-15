import { Router } from 'express';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

const appointmentsRouter = Router();
const appointmentsRepository = new AppointmentsRepository();

appointmentsRouter.post('/', (request, response) => {
  const { provider, date } = request.body;
  const findAppointmentInSameDate = appointmentsRepository.getByDate(date);

  if (findAppointmentInSameDate) {
    return response
      .status(400)
      .json({ message: 'This appointment is already booked' });
  }

  const appointment = appointmentsRepository.create(provider, date);
  return response.json(appointment);
});

export default appointmentsRouter;
