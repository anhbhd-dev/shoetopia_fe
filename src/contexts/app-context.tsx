"use client";
import useToggleLoginForm from "@/hooks/useToggleLogInForm";
import useToggleSignUpForm from "@/hooks/useToggleSignUpForm";
import React, { createContext, useContext } from "react";

interface AppContextValue {
  isOpenLoginForm: ReturnType<typeof useToggleLoginForm>["isOpenLoginForm"];
  openLoginForm: ReturnType<typeof useToggleLoginForm>["openLoginForm"];
  closeLoginForm: ReturnType<typeof useToggleLoginForm>["closeLoginForm"];
  isOpenSignUpForm: ReturnType<typeof useToggleSignUpForm>["isOpenSignUpForm"];
  openSignUpForm: ReturnType<typeof useToggleSignUpForm>["openSignUpForm"];
  closeSignUpForm: ReturnType<typeof useToggleSignUpForm>["closeSignUpForm"];
}

const AppContext = createContext<AppContextValue>({
  isOpenLoginForm: false,
  openLoginForm: () => {},
  closeLoginForm: () => {},
  isOpenSignUpForm: false,
  openSignUpForm: () => {},
  closeSignUpForm: () => {},
});

const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isOpenLoginForm, openLoginForm, closeLoginForm } =
    useToggleLoginForm();
  const { isOpenSignUpForm, openSignUpForm, closeSignUpForm } =
    useToggleSignUpForm();
  const contextValue: AppContextValue = {
    isOpenLoginForm,
    openLoginForm,
    closeLoginForm,
    isOpenSignUpForm,
    openSignUpForm,
    closeSignUpForm,
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};

const useAppContext = (): AppContextValue => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }

  return context;
};
export { AppContext, AppProvider, useAppContext };
