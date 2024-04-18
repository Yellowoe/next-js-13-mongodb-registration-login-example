import { apiHandler } from 'helpers/api';
import { appointmentsRepo } from 'helpers/api/appointments-repo'; // Asegúrate de importar el repositorio de citas

export default apiHandler({
    get: getAllAppointments // Asocia la función `getAllAppointments` con el método HTTP GET
});

// Función para obtener todas las citas
async function getAllAppointments(req, res) {
    // Obtén todas las citas utilizando el repositorio de citas (`appointmentsRepo`)
    const appointments = await appointmentsRepo.getAll();
    
    // Responde con un código de estado 200 y la lista de citas
    return res.status(200).json(appointments);
}
