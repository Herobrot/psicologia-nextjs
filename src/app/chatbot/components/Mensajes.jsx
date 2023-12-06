import "./Mensajes.css";

export default function Mensajes({data}){
    return(
        <>
            {data.map((message, index) => (
                <div className='message' key={index}>{message}</div>
            ))}
        </>
    )
}