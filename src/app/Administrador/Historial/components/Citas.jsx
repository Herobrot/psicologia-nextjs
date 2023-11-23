"use client"

export default function Citas({citas}){
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
        return new Date(dateString).toLocaleDateString('es-MX', options);
    }
    return(
        <> 
          {citas.map(cita => {
            return(
                <div className="contenedorCita">
                    <span>{formatDate(cita.FechaCita)}</span>          
                </div>
            )
            })}
        </>
    )
}