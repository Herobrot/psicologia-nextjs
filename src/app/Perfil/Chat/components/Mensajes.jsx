import "./Mensajes.css";

export default function Mensajes({data}){
    return(
        <>
            {data.map((message, index) => (
                <div className={`${message.type === 'sent' ? 'sent' : 'received'}`}
                    key={index}
                    id="message">
                        {message.text}
                </div>
            ))}
        </>
    )
}