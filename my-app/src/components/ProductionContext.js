import React, { createContext, useContext, useState } from 'react';

// Utwórz kontekst produkcji
const ProductionContext = createContext();

// Utwórz dostawcę kontekstu produkcji
export const ProductionProvider = ({ children }) => {
  const [productionTableData, setProductionTableData] = useState([]);

  return (
    <ProductionContext.Provider value={{ productionTableData, setProductionTableData }}>
      {children}
    </ProductionContext.Provider>
  );
};

// Utwórz hook używający kontekstu produkcji
export const useProduction = () => useContext(ProductionContext);
