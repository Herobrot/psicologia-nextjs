import Navbar from '../../../../components/Navbar';

export const metadata = {
    charset: "UTF-8",
    title: "Información",
    descrpition: "Información del paciente",
    script: "https://kit.fontawesome.com/88239f68d2.js"
}

export default function InformacionLayout({ children }){
    return(
        <>
            {children}
        </>
    )
}