import React, { createContext, useContext, useState } from "react";

// Create the context with default values
type BoolContextType = {
  value: boolean; // Default value
  setValue: (val: boolean) => void; // Placeholder function
};

const BoolContext = createContext<BoolContextType>({
    value: false,
    setValue: ()=>{}
});

// Provider component to wrap the app and provide access to the value
export const BoolProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [value, setValue] = useState(false); // State that all pages will share

  return (
    <BoolContext.Provider value={{ value, setValue }}>
      {children}
    </BoolContext.Provider>
  );
};

// Custom hook for easy access in any page
export const useBoolContext = () => {
    return useContext(BoolContext);
  };
    
