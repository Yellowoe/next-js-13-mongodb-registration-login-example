import getConfig from 'next/config';
import mongoose from 'mongoose';
const { ObjectId } = mongoose.Types;


const { serverRuntimeConfig } = getConfig();
const Schema = mongoose.Schema;

mongoose.connect(process.env.MONGODB_URI || serverRuntimeConfig.connectionString);
mongoose.Promise = global.Promise;

export const db = {
    User: userModel(),
    Appointment: appointmentModel(),
    Vacation: vacationModel()
};

// mongoose models with schema definitions

function userModel() {
    const schema = new Schema({
        name: { type: String, required: true }, // Nombre del usuario
        email: { type: String, unique: true, required: true, match: /.+\@.+\..+/ }, // Email del usuario, debe ser único y seguir el formato de email
        hash: { type: String, required: true }, // Contraseña (hash)
        role: { type: String, enum: ['admin', 'employee', 'user'], default: 'user', required: true }, // Rol del usuario, con valores posibles y valor predeterminado
        createdAt: { type: Date, default: Date.now }, // Fecha de registro, con valor predeterminado
    });


    schema.set('toJSON', {
        virtuals: true,
        versionKey: false,
        transform: function (doc, ret) {
            delete ret._id;
            delete ret.hash;
        }
    });

    return mongoose.models.User || mongoose.model('User', schema);
}

function appointmentModel(){
const appointmentSchema = new Schema({
    dateTime: { type: Date, required: true }, // Date and time of the appointment
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Relationship with User entity (User ID)
    description: { type: String, required: true }, // Description of the appointment
    status: {
        type: String,
        enum: ['pending', 'completed', 'canceled'],
        required: true,
        default: 'pending'
    } // Status of the appointment with possible values
}, {
    timestamps: true // Adds createdAt and updatedAt fields
});

// Configuration for the JSON representation of the document
appointmentSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id; // Removes the _id field
    }
});

// Create and export the Appointment model
return  mongoose.models.Appointment || mongoose.model('Appointment', appointmentSchema);

}

function vacationModel(){
const vacationSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Relación con la entidad User (ID de usuario)
    startDate: { type: Date, required: true }, // Fecha de inicio de las vacaciones
    endDate: { type: Date, required: true }, // Fecha de fin de las vacaciones
    status: {
        type: String,
        enum: ['approved', 'pending', 'rejected'],
        required: true,
        default: 'pending'
    }, // Estado del registro (aprobado, pendiente, rechazado)
    comments: { type: String, default: '' } // Comentarios opcionales
}, {
    timestamps: true // Agrega campos createdAt y updatedAt
});

// Configuración para la representación JSON del documento
vacationSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id; // Elimina el campo _id
    }
});

// Crea y exporta el modelo VacationRecord
return  mongoose.models.Vacation || mongoose.model('Vacation', vacationSchema);
}

