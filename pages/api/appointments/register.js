import { apiHandler } from 'helpers/api';
import { appointmentsRepo } from 'helpers/api/appointments-repo'; // Asegúrate de importar el repositorio de citas

export default apiHandler({
    post: createAppointment // Asocia la función `createAppointment` con el método HTTP POST
});

// Función para crear una nueva cita
async function createAppointment(req, res) {
    // Crea una nueva cita utilizando los datos enviados en el cuerpo de la solicitud (`req.body`)
    await appointmentsRepo.create(req.body);

    // Responde con un código de estado 200 para indicar éxito
    return res.status(200).json({});
}
