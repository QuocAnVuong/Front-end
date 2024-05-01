import React from "react";
import { createContext, useState } from "react";

export const IngredientContext = createContext(null);
export const FlavorContext = createContext(null);
export const StyleContext = createContext(null);

function ContextProvider({ children }) {
  const [ingredients, setIngredients] = useState([]);
  const [flavors, setFlavors] = useState([]);
  const [styles, setStyles] = useState([]);
  return (
    <IngredientContext.Provider
      value={{
        ingredients,
        setIngredients,
      }}
    >
      <FlavorContext.Provider
        value={{
          flavors,
          setFlavors,
        }}
      >
        <StyleContext.Provider
          value={{
            styles,
            setStyles,
          }}
        >
          {children}
        </StyleContext.Provider>
      </FlavorContext.Provider>
    </IngredientContext.Provider>
  );
}

export default ContextProvider;
