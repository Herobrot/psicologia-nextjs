import Navbar from '../../../components/Navbar';

export const metadata = {
    charset: "UTF-8",
    title: "Contraseña Olvidada",
    descrpition: "Recupere Su Contraseña",
    script: "https://kit.fontawesome.com/88239f68d2.js"
}

export default function LostPasswordLayout({ children }){
    return(
        <>
            <Navbar />
            {children}
        </>
    )
}