import * as Yup from "yup";

export const loginValidation = Yup.object().shape({
  username: Yup.string().required("Usuário obrigatório"),
  password: Yup.string()
    .required("Senha obrigatória"),
});
