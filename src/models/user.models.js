import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

// Definimos el esquema de Usuario
const userSchema = new mongoose.Schema({
    nombres: {
        type: String,
        required: true,
        trim: true
    },
    apellidos: {
        type: String,
        required: true,
        trim: true
    },
    correo: {
        type: String,
        required: true,
        unique: true,
        match: [/.+\@.+\..+/, 'Por favor ingresa un correo válido']
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    saldo: {
        type: Number,
        default: 0
    },
    rol: {
        type: String,
        enum: ['usuario', 'administrador'],
        default: 'usuario'
    },
    celular: {
        type: String,
        required: true,
        match: [/^\d{7,15}$/, 'Por favor ingresa un número celular válido']
    },
    tipoDocumento: {
        type: String,
        enum: ['CC', 'CE', 'Pasaporte'],
        required: true
    },
    numeroDocumento: {
        type: String,
        required: true,
        unique: true
    },
    fechaNacimiento: {
        type: Date,
        required: true
    },
    pais: {
        type: String,
        required: true
    },
    fechaRegistro: {
        type: Date,
        default: Date.now
    },
    cuentaBanco: {
        type: String,
        enum: ['confirmada', 'sin registrar'],
        default: 'sin registrar'
    },
    estado: {
        type: String,
        enum: ['activo', 'inactivo'],
        default: 'activo',
    },
    ultimaActividad: {
        type: Date,
        default: null,
    },

}, {
  timestamps: true
});

// Middleware para encriptar la contraseña antes de guardar
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Método para comparar contraseñas
userSchema.methods.comparePassword = async function (inputPassword) {
    return await bcrypt.compare(inputPassword, this.password);
};
// Middleware para actualizar `ultimaActividad`
userSchema.pre('save', function (next) {
    if (this.isModified('password')) {
        this.ultimaActividad = Date.now();
    }
    next();
});
const User = mongoose.model('User', userSchema);

export default User;
