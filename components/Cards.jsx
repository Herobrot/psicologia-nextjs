import "./Cards.css"

export function Card_B({title, text}){
    return(
        <>
            <div className="ayuda">
                <div className="h1">
                    <h1>{title}</h1>
                </div>
                <p>
                    {text}
                </p>
            </div>
        </>
    );
}