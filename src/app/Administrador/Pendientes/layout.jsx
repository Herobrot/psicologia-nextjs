export const metadata = {
    charset: "UTF-8",
    title: "Lista de citas por realizar",
    descrpition: "Listado de citas que ya han sido confirmadas",
    script: "https://kit.fontawesome.com/88239f68d2.js"
}

export default function AdminPendientesLayout({ children }){
    return(
        <>
            {children}
        </>
    )
}