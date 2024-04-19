import { apiHandler } from 'helpers/api';
import { appointmentsRepo } from 'helpers/api/appointments-repo'; // Asegúrate de importar el repositorio de citas

export default apiHandler({
    get: getAllAppointments,// Asocia la función `getAllAppointments` con el método HTTP GET
    post: createAppointment // Asocia la función `createAppointment` con el método HTTP POST
});

// Función para obtener todas las citas
async function getAllAppointments(req, res) {
    // Obtén todas las citas utilizando el repositorio de citas (`appointmentsRepo`)
    const appointments = await appointmentsRepo.getAll();

    // Responde con un código de estado 200 y la lista de citas
    return res.status(200).json(appointments);


}

async function createAppointment(req, res) {
    // Crea una nueva cita utilizando los datos enviados en el cuerpo de la solicitud (`req.body`)
await appointmentsRepo.create(req.body);

    // Responde con un código de estado 200 para indicar éxito
return res.status(200).json({});
}
