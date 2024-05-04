import { useState } from "react";

const useToggleLoginForm = (initialValue: boolean = false) => {
  const [isOpenLoginForm, setIsOpenLoginForm] = useState<boolean>(initialValue);

  const openLoginForm = () => {
    setIsOpenLoginForm(true);
  };

  const closeLoginForm = () => {
    setIsOpenLoginForm(false);
  };

  return {
    isOpenLoginForm,
    openLoginForm,
    closeLoginForm,
  };
};

export default useToggleLoginForm;
