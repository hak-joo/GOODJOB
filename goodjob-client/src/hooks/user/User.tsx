import { useState } from "react";
import type { LoginForm } from "./types";

const useUserForm = () => {
  const [form, setForm] = useState<LoginForm>({
    id: "",
    name: "",
    gender: "male",
    password: "",
    passwordConfirm: "",
  });

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev: LoginForm) => ({ ...prev, [name]: value }));
  };

  return { form, handleFormChange };
};

export default useUserForm;
