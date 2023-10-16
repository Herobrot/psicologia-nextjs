import "./globals.css"
import Navbar from "../../components/Navbar"

export const metadata = {
    charset: "UTF-8",
    title: "Psicopedagogía en línea",
    descrpition: "Página para atención psicológica",
    script: "https://kit.fontawesome.com/88239f68d2.js"
}

export default function RootLayout({ children }){
    return(
        <html lang="es-MX">
            <head>
                <link rel="logo Psicopedagogía" href="/logoP.ico" type="image/x-icon" />
                <link href='https://fonts.googleapis.com/css?family=Blinker' rel='stylesheet' />
            </head>
            <body className="preLoad">
                <Navbar />
                {children}
            </body>
        </html>
    )
}