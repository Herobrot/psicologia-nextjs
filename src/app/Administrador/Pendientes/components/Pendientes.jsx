import "./Pendientes.css";

export default function Pendientes({data, AprobarCancelar}) {
    return(
        <>
            {data.map((cita, index) => (
                <div className="contenedorCita" key={index} onClick={() => {AprobarCancelar(cita)}}>
                    <p>Fecha de la cita: {format(new Date(cita.FechaCita), 'dd/MM/yyyy')}</p>
                </div>
            ))}
        </>
    )
}