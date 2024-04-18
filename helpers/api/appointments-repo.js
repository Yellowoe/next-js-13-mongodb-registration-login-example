import { db } from 'helpers/api';
import mongoose from 'mongoose';

const { ObjectId } = mongoose.Types;


const Appointment = db.Appointment; // Importar el modelo de citas

export const appointmentsRepo = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

// Función para obtener todas las citas
async function getAll() {
    return await Appointment.find().populate('userId', 'username firstName lastName');
}

// Función para obtener una cita por su ID
async function getById(id) {
    return await Appointment.findById(id).populate('userId', 'username firstName lastName');
}


// Función para crear una nueva cita
async function create(params) {
    // Validaciones de parámetros de entrada

    // Verifica que `userId` esté presente y sea un ObjectId válido
    if (!params.userId || !ObjectId.isValid(params.userId)) {
        throw new Error('Invalid or missing userId');
    }

    // Verifica que `dateTime` esté presente y sea una fecha válida
    if (!params.dateTime || isNaN(new Date(params.dateTime).getTime())) {
        throw new Error('Invalid or missing dateTime');
    }

    // Verifica que `description` esté presente y no esté vacía
    if (!params.description || params.description.trim() === '') {
        throw new Error('Invalid or missing description');
    }

    // Verifica que `status` esté presente y sea un valor permitido
    const allowedStatuses = ['pending', 'completed', 'canceled'];
    if (!params.status || !allowedStatuses.includes(params.status)) {
        throw new Error('Invalid or missing status');
    }

    // Si todas las validaciones pasan, crea una nueva cita
    const appointment = new Appointment(params);

    // Guarda la nueva cita en la base de datos
    await appointment.save();
}


// Función para actualizar una cita existente
async function update(id, params) {
    const appointment = await Appointment.findById(id);

    // Validar si la cita existe
    if (!appointment) throw 'Appointment not found';

    // Copiar las propiedades de params a la cita
    Object.assign(appointment, params);

    // Guardar los cambios en la base de datos
    await appointment.save();
}

// Función para eliminar una cita por su ID
async function _delete(id) {
    console.log('Deleting appointment with ID:', id);
    await Appointment.findByIdAndRemove(id);
}


