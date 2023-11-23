export const metadata = {
    charset: "UTF-8",
    title: "Paciente", //no se como agregar el nombre del paciente como titulo
    descrpition: "Gestione la lista de pacientes",
    script: "https://kit.fontawesome.com/88239f68d2.js"
}

export default function AdminPacientesLayout({ children }){
    return(
        <>
            {children}
        </>
    )
}