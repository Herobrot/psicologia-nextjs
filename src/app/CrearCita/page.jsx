"use client"
import { useEffect, useState } from "react";
import { format, setHours, setMinutes } from 'date-fns';
import es from 'date-fns/locale/es';
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import "./Cita.css";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { saveAuthData, getAuthData, clearAuthData } from "../../../Token"
export default function Cita() {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedTime, setSelectedTime] = useState({
        hour: format(new Date(), 'hh'),
        minute: format(new Date(), 'mm'),
        period: format(new Date(), 'aa').toUpperCase(),
    });
    const [modalidadget,setmodalidad] =useState('');
    const authData = getAuthData();
    const hours = Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, '0'));
    const minutes = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0'));
    const [usuario, setUsuario] = useState({
        nombre: "",
        apellidos: "",
        telefono: "",
        correo: "",
        municipio: "",
        estado: "",
        password: ""
    });
    const handleTimeChange = (event, type) => {
        setSelectedTime({ ...selectedTime, [type]: event.target.value });
    };

    useEffect(() => {
        const periodOffset = selectedTime.period === 'PM' ? 12 : 0;
        const hours24 = parseInt(selectedTime.hour) % 12 + periodOffset;
        const newDate = setMinutes(setHours(selectedDate, hours24), parseInt(selectedTime.minute));
        setSelectedDate(newDate);
    }, [selectedTime]);
    useEffect(() => {

        fetch('https://apibuena.onrender.com/paciente/' + authData.userId, {
            headers: {
                'Authorization': `${authData.token}`,
                'Content-Type': 'application/json'

            },
        })
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    clearAuthData();
                    window.location = "/"
                }
                setUsuario({
                    nombre: data.nombre,
                    apellidos: data.apellidos,
                    telefono: data.telefono,
                    correo: data.correo,
                    municipio: data.municipio,
                    estado: data.estado,
                    password: data.password
                });
         
            })
            .catch(error => {
                console.error('Error al obtener datos:', error);
            });
    }, []);


    const handleConfirm = () => {

        const fechaCita = convertToDateTime(selectedTime.hour, selectedTime.minute, selectedTime.period);
        Swal.fire({
            title: 'Desea confirmar su cita?',
            text: `${usuario.nombre +" "+ usuario.apellidos}  Tu cita sera agendada para el ${format(selectedDate, 'dd/MM/yyyy')} a las ${format(selectedDate, 'hh:mm aa')}`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Agendar',
            cancelButtonText: 'Salir'
        }).then((result)=>{
            if(result.value){
                fetch('https://apibuena.onrender.com/paciente/agregarCita', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                       
                    },
                    body: JSON.stringify({
                        idPaciente: authData.userId,
                        datosCita: {
                            FechaCita: fechaCita, 
                            EstatusCita: 'Agendada', 
                            NotasCitas: 'Agendada', 
                            modalidad: modalidadget, 
                            idUser: authData.userId 
                        }
                    })
                })
                .then(response => response.json())
                .then(() => {
                    Swal.fire({
                        title: 'Cita Confirmada',
                        text: `Tu cita ha sido agendada para el ${format(selectedDate, 'dd/MM/yyyy')} a las ${format(selectedDate, 'hh:mm aa')}`,
                        icon: 'success',
                        customClass:{
                            title: "swal-title",
                            actions: "swal-actions"
                        }
                    })
                  
                })
                .catch(error => console.error('Error:', error));

            }
        });
    };
    function convertToDateTime(hour, minute, period) {
        const now = new Date();
        let hours = parseInt(hour);
    
      
        if (period === 'PM' && hours < 12) {
            hours += 12;
        } else if (period === 'AM' && hours === 12) {
            hours = 0;
        }
    
        now.setHours(hours, parseInt(minute));
        return now;
    }
    const handleCancel = () => {
        Swal.fire({
            title: 'Cita No Guardada',
            text: 'La cita no se agendada si sale de esta página.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Salir',
            cancelButtonText: 'Permanecer'
        }).then((result) => {
            if (result.value) {
                window.location = "/Perfil"
            }
        });
    };


    return (
        <div className="date-picker-container">
            <h1>¿Cuándo quiere su cita?</h1>
            <p>Seleccione el día de su cita.</p>
            <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                inline
                locale={es}
                dateFormat="dd/MM/yyyy"
            />
            <p>Seleccione la hora de su cita.</p>
            <div className="time-selector">
                <select onChange={(e) => handleTimeChange(e, 'hour')} value={selectedTime.hour}>
                    {hours.map(hour => <option key={hour} value={hour}>{hour}</option>)}
                </select>
                <select onChange={(e) => handleTimeChange(e, 'minute')} value={selectedTime.minute}>
                    {minutes.map(minute => <option key={minute} value={minute}>{minute}</option>)}
                </select>
                <select onChange={(e) => handleTimeChange(e, 'period')} value={selectedTime.period}>
                    <option value="AM">AM</option>
                    <option value="PM">PM</option>
                </select>
            </div>
            <div className="time-selector">
            <label>Eliga su modalidad:</label>
             
                <select onChange={(ev) => {
                                setmodalidad(ev.target.value)
                            }} >
                    <option value="En línea">Virtual</option>
                    <option value="Presencial">Presencial</option>
                </select>
            </div>
            <div className="date-confirm">
                <label>Su día y horario elegido es:</label>
                <input 
                    id="selected-date"
                    type="text" 
                    value={format(selectedDate, 'dd/MM/yyyy hh:mm aa', { locale: es })} 
                    readOnly 
                />
            </div>
            <div className="action-buttons">
                <button onClick={handleCancel} className="cancel-button">
                    <FontAwesomeIcon icon={faTimesCircle} color="red" />
                </button>
                <button onClick={handleConfirm} className="confirm-button">
                    <FontAwesomeIcon icon={faCheckCircle} color="blue" />
                </button>
            </div>
        </div>
    );
}
