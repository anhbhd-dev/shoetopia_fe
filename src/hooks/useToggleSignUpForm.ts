import { useState } from "react";

const useToggleSignUpForm = (initialValue: boolean = false) => {
  const [isOpenSignUpForm, setIsOpenSignUpForm] =
    useState<boolean>(initialValue);

  const openSignUpForm = () => {
    setIsOpenSignUpForm(true);
  };

  const closeSignUpForm = () => {
    setIsOpenSignUpForm(false);
  };

  return {
    isOpenSignUpForm,
    openSignUpForm,
    closeSignUpForm,
  };
};

export default useToggleSignUpForm;
