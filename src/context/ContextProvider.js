import React from "react";
import { createContext, useState } from "react";

export const IngredientContext = createContext(null);
export const FlavorContext = createContext(null);
export const StyleContext = createContext(null);
export const LoginContext = createContext(null);
export const LoginPageContext = createContext(null);
export const UserContext = createContext(null);
export const AIContext = createContext(null);
export const CourseContext = createContext(null);
export const SearchContext = createContext(null);

function ContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [ingredients, setIngredients] = useState([]);
  const [flavors, setFlavors] = useState([]);
  const [styles, setStyles] = useState([]);
  const [courses, setCourses] = useState([]);
  const [duringLogin, setDuringLogin] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [fromSearch, setFromSearch] = useState(false);
  const [selectedOption, setSelectedOption] = useState(0);

  return (
    <SearchContext.Provider
      value={{
        selectedOption,
        setSelectedOption,
      }}
    >
      <CourseContext.Provider
        value={{
          courses,
          setCourses,
        }}
      >
        <AIContext.Provider
          value={{
            fromSearch,
            setFromSearch,
          }}
        >
          <UserContext.Provider
            value={{
              user,
              setUser,
            }}
          >
            <LoginPageContext.Provider
              value={{
                duringLogin,
                setDuringLogin,
              }}
            >
              <LoginContext.Provider
                value={{
                  isLogin,
                  setIsLogin,
                }}
              >
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
              </LoginContext.Provider>
            </LoginPageContext.Provider>
          </UserContext.Provider>
        </AIContext.Provider>
      </CourseContext.Provider>
    </SearchContext.Provider>
  );
}

export default ContextProvider;
