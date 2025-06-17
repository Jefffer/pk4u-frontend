import { useState, useRef, useEffect } from "react";

function ParkingOccupacy({ total, children, rate }) {
    const [desplegado, setDesplegado] = useState(false);
    const plantasRef = useRef(null);

    useEffect(() => {
        if (desplegado && plantasRef.current) {
            plantasRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
        }
    }, [desplegado]);

    return (
        <div className="ocupacion-parking">
            <div
                className="ocupacion-total bg-teal-500 hover:bg-teal-600 text-white font-semibold px-4 py-2 rounded-lg shadow cursor-pointer transition-colors duration-200 mb-3 text-center"
                onClick={() => setDesplegado((prev) => !prev)}
            >
                <span className="mr-2 text-lg font-bold">🅿️</span>
                Total plazas: {total}
                <div className="text-xs mt-1 opacity-80">(desplegar para ver detalle)</div>
            </div>
            {rate && (
                <div className="text-sm text-teal-700 dark:text-teal-300 font-medium mb-2 text-center">
                    Precio: {rate}
                </div>
            )}
            {desplegado && (
                <div className="ocupacion-plantas" ref={plantasRef}>
                    {children}
                </div>
            )}
        </div>
    );
}

export default ParkingOccupacy;