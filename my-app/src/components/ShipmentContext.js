import React, { createContext, useState, useContext } from 'react';

const ShipmentContext = createContext();

export const useShipment = () => useContext(ShipmentContext);

export const ShipmentProvider = ({ children }) => {
    const [shipmentOrder, setShipmentOrder] = useState([]);

    return (
        <ShipmentContext.Provider value={{ shipmentOrder, setShipmentOrder }}>
            {children}
        </ShipmentContext.Provider>
    );
};
