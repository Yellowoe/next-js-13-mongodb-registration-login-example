import { apiHandler } from 'helpers/api';
import { appointmentsRepo } from 'helpers/api/appointments-repo'; // Asegúrate de importar el repositorio de citas
console.log(appointmentsRepo);
import mongoose from 'mongoose';
const { ObjectId } = mongoose.Types;


// Exporta la función `apiHandler` con las funciones `getById`, `update` y `_delete` mapeadas a los métodos HTTP correspondientes
export default apiHandler({
    get: getById,  // Función para obtener una cita por su ID
    put: update,   // Función para actualizar una cita por su ID
    delete: _delete // Función para eliminar una cita por su ID
});

// Función para obtener una cita por su ID
async function getById(req, res) {
    // Obtener el ID de la cita desde la URL
    const appointmentId = req.query.id;

    // Utilizar el repositorio de citas para obtener la cita por su ID
    const appointment = await appointmentsRepo.getById(appointmentId);

    // Si la cita no se encuentra, lanzar un error
    if (!appointment) {
        res.status(404).json({ message: 'Appointment Not Found' });
    } else {
        // Responder con los datos de la cita en formato JSON
        res.status(200).json(appointment);
    }
}

// Función para actualizar una cita por su ID
async function update(req, res) {
    // Obtener el ID de la cita desde la URL
    const appointmentId = req.query.id;

    // Actualizar la cita utilizando los datos enviados en el cuerpo de la solicitud (`req.body`)
    await appointmentsRepo.update(appointmentId, req.body);

    // Responder con un código de estado 200 para indicar éxito
    res.status(200).json({});
}

// Función para eliminar una cita por su ID
//async function _delete(req, res) {
    // Obtener el ID de la cita desde la URL
    //const appointmentId = req.query.id;

    // Verificar que el ID sea válido

        // Eliminar la cita utilizando el ID
      //  await appointmentsRepo._delete(appointmentId);

        // Responder con un código de estado 200 para indicar éxito
       // res.status(200).json({});
//}
async function _delete(req, res) {
    await appointmentsRepo.delete(req.query.id);
    return res.status(200).json({});
}
