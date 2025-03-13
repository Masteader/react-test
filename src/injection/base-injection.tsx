import React from "react";
import { BoolProvider } from "../context/boolean.context";
import { AuthProvider } from "../context/AuthContext";
import { ThemeProvider } from "../context/Themecontext";

const BaseInjectionComponent: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <AuthProvider>
      <BoolProvider>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </BoolProvider>
    </AuthProvider>
  );
};

export default BaseInjectionComponent;
