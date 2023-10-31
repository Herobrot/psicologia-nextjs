import React from "react";
import { BotonIniciar } from "./BotonIniciar";
import { Encabezado } from "./Encabezado";
import { EntradaUsuario } from "./EntradaUsuario";
import { EntradacontraseA } from "./EntradacontraseA";
import "./style.css";

export const SesionAdmin = () => {
  return (
    <div className="sesion-admin">
      <div className="div-2">
        <BotonIniciar className="boton-iniciar-instance" />
        <EntradacontraseA className="entrada-contrasea" />
        <EntradaUsuario className="entrada-usuario-instance" />
        <Encabezado
          className="encabezado-instance"
          divClassName="design-component-instance-node"
          text={
            <>
              Modo Administrador.
              <br />
              Para continuar, debes iniciar sesion, o pedirle a alguien
              <br />
              encargado del sistema.
            </>
          }
        />
        <img className="salir" alt="Salir" src="salir.png" />
      </div>
    </div>
  );
};