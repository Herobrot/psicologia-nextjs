import mongoose from "mongoose";

const citaSchema = new mongoose.Schema({
    FechaCita:{
        type: Date,
        required: true
    },
    EstatusCita:{
        type: String,
        required: true,
        enum: ['Agendada', 'Confirmada', 'Cancelada', 'Realizada']
    },
    NotasCitas: String
});

const Cita = mongoose.model('Citas', citaSchema);

module.exports = Cita;