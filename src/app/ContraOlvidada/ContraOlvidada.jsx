import React from "react";
import { BotonContinuar } from "./BotonContinuar";
import { EntradaCorreo } from "./EntradaCorreo";
import "./style.css";

export const ContraseaOlvidada = () => {
  return (
    <div className="contrasea-olvidada">
      <div className="div-2">
        <img className="boton-atras" alt="Boton atras" src="boton-atras.png" />
        <BotonContinuar className="boton-continuar-instance" />
        <EntradaCorreo className="entrada-correo-instance" />
        <p className="para-continuar">
          Para continuar, ingrese su correo electronico con
          <br />
          el que se registro.
        </p>
        <div className="text-wrapper-2">¡Ups!</div>
      </div>
    </div>
  );
};