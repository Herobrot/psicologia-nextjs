import Navbar from '../../../components/Navbar';

export const metadata = {
    charset: "UTF-8",
    title: "Inicio de sesión",
    descrpition: "Inicie sesión para continuar",
    script: "https://kit.fontawesome.com/88239f68d2.js"
}

export default function LoginLayout({ children }){
    return(
        <>
            {children}
        </>
    )
}