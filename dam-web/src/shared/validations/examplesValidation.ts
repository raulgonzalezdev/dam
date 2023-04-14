import * as Yup from "yup";

export const exampleValidation = Yup.object().shape({
  first_name: Yup.string().required("Nome obrigatório"),
  last_name: Yup.string().required("Sobrenome obrigatório"),
  username: Yup.string().required("Usuário obrigatório"),
  email: Yup.string().email("E-mail inválido").required("E-mail obrigatório"),
  password: Yup.string()
    .min(6, "Mínimo 6 caracteres")
    .required("Senha obrigatória"),
});
