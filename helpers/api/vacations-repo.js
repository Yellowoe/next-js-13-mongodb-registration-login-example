import { db } from 'helpers/api';
import mongoose from 'mongoose';

const { ObjectId } = mongoose.Types;

// Importar el modelo de vacaciones
const Vacation = db.Vacation;

// Exportar el repositorio de vacaciones
export const vacationsRepo = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

// Función para obtener todas las vacaciones
async function getAll() {
    // Obtener todas las vacaciones y poblar las referencias a la entidad de usuario
    return await Vacation.find().populate('userId', 'username ');
}

// Función para obtener unas vacaciones por su ID
async function getById(id) {
    // Encontrar vacaciones por ID y poblar la referencia a la entidad de usuario
    return await Vacation.findById(id).populate('userId', 'username');
}

// Función para crear una nueva vacaciones
async function create(params) {
    // Validaciones de parámetros de entrada

    // Verifica que `userId` esté presente y sea un ObjectId válido
    if (!params.userId || !ObjectId.isValid(params.userId)) {
        throw new Error('Invalid or missing userId');
    }

    // Verifica que `startDate` y `endDate` estén presentes y sean fechas válidas
    if (!params.startDate || isNaN(new Date(params.startDate).getTime()) ||
        !params.endDate || isNaN(new Date(params.endDate).getTime())) {
        throw new Error('Invalid or missing startDate or endDate');
    }

    // Verifica que `status` esté presente y sea un valor permitido
    const allowedStatuses = ['approved', 'pending', 'rejected'];
    if (!params.status || !allowedStatuses.includes(params.status)) {
        throw new Error('Invalid or missing status');
    }

    // Si todas las validaciones pasan, crea unas nuevas vacaciones
    const vacation = new Vacation(params);

    // Guarda las nuevas vacaciones en la base de datos
    await vacation.save();
}

// Función para actualizar unas vacaciones existentes
async function update(id, params) {
    const vacation = await Vacation.findById(id);

    // Validar si las vacaciones existen
    if (!vacation) throw new Error('Vacation not found');

    // Copiar las propiedades de params a las vacaciones
    Object.assign(vacation, params);

    // Guardar los cambios en la base de datos
    await vacation.save();
}

// Función para eliminar unas vacaciones por su ID
async function _delete(id) {
    // Eliminar vacaciones por ID
    await Vacation.findByIdAndRemove(id);
}
