import { parseISO } from 'date-fns';
import { Router } from 'express';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

const appointmentsRouter = Router();
const appointmentsRepository = new AppointmentsRepository();

appointmentsRouter.post('/', (request, response) => {
  try {
    const { provider, date } = request.body;
    const parsedDate = parseISO(date);
    const createAppointment: CreateAppointmentService = new CreateAppointmentService(appointmentsRepository);
    const appointment = createAppointment.execute({ provider, date: parsedDate });
    return response.json(appointment);
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
});

appointmentsRouter.get('/', (request, response) => {
  const appointments = appointmentsRepository.get();
  return response.json(appointments);
});

export default appointmentsRouter;
