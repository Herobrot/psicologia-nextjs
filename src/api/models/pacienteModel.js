import mongoose from "mongoose";

const pacienteSchema = new mongoose.Schema({
    nombre:{
        type: String,
        required: true
    },
    apellidoPaterno:{
        type: String,
        required: true
    },
    apellidoMaterno:{
        type: String,
        required: true
    },
    telefono:{
        type: Number,
        required: true
    },
    correo:{
        type: String,
        required: false
    },
    municipio:{
        type: String,
        required: true
    },
    estado:{
        type: String,
        required: true
    },
    estatusCliente:{
        type: String,
        enum: ['Activo', 'Inactivo']
    },
    password:{
        type: String,
        required: true
    }
    
});

const Paciente = mongoose.model('Pacientes', pacienteSchema);

module.exports = Paciente;