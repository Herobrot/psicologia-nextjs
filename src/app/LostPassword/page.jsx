"use client"
import React from "react";
import { BotonContinuar } from "./Componentes/BotonContinuar";
import { EntradaCorreo } from "./Componentes/EntradaCorreo";
import "./LostPassword.css";

export default  function LostPassword (){
  return (
    <main>
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
    </main>
  );
};