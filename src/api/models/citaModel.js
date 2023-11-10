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

citaSchema.statics.obtenerCitasConFechaEnEspañol = function(callback) {
    this.aggregate([
        {
            $project: {
                _id: 1,
                FechaCita: {
                    $dateToString: {
                        date: '$FechaCita',
                        format: '%d-%m-%Y %H:%M:%S',
                        timezone: 'America/Mexico_City' 
                    }
                },
                EstatusCita: 1,
                NotasCitas: 1
            }
        }
    ], callback);
};

const Cita = mongoose.model('Citas', citaSchema);

module.exports = Cita;