import { useState } from "react"; //로그인 폼

interface FormInputs {
  [key: string]: string;
}

function useForm() {
  const [inputs, setInputs] = useState<FormInputs>({
    ID: "",
    password: "",
    nickName: "",
  });
  const [islogin, setIslogin] = useState(false);
  const [okid, setOkid] = useState(false);
  const [okps, setOkps] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
    0;

    if (name === "ID") {
      setOkid(value.length > 0 && !emailRegex.test(value));
    }
    if (name === "password") {
      setOkps(value.length > 0 && value.length < 6);
    }

    setIslogin(
      emailRegex.test(name === "ID" ? value : inputs.ID) &&
        (name === "password" ? value.length >= 6 : inputs.password.length >= 6)
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    alert("로그인 시도!");
  };
  const handlePassword = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowPassword((prev) => !prev);
  };

  return {
    inputs,
    handleChange,
    handleSubmit,
    handlePassword,
    showPassword,
    islogin,
    okid,
    okps,
  };
}

export default useForm;
