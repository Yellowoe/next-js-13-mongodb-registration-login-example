import { apiHandler } from 'helpers/api';
import { vacationsRepo } from 'helpers/api/vacations-repo';

export default apiHandler({
    post: register
});

async function register(req, res) {
    // Crear una nueva solicitud de vacaciones utilizando los datos recibidos en req.body
    await vacationsRepo.create(req.body);
    // Enviar una respuesta con un código de estado 200 indicando que la operación fue exitosa
    return res.status(200).json({});
}
