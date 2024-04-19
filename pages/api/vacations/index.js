import { apiHandler, vacationsRepo } from 'helpers/api';

export default apiHandler({
    get: getAll,
    post: register
});

async function getAll(req, res) {
    // Obtiene todas las solicitudes de vacaciones utilizando el repositorio vacationsRepo
    const vacations = await vacationsRepo.getAll();
    // Devuelve las solicitudes de vacaciones en la respuesta con un código de estado 200
    return res.status(200).json(vacations);
}

async function register(req, res) {
    // Crear una nueva solicitud de vacaciones utilizando los datos recibidos en req.body
    await vacationsRepo.create(req.body);
    // Enviar una respuesta con un código de estado 200 indicando que la operación fue exitosa
    return res.status(200).json({});
}
