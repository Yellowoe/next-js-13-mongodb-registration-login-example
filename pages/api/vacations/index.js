import { apiHandler, vacationsRepo } from 'helpers/api';

export default apiHandler({
    get: getAll
});

async function getAll(req, res) {
    // Obtiene todas las solicitudes de vacaciones utilizando el repositorio vacationsRepo
    const vacations = await vacationsRepo.getAll();
    // Devuelve las solicitudes de vacaciones en la respuesta con un código de estado 200
    return res.status(200).json(vacations);
}
