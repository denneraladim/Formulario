import styles from './Form.module.css';

import { useForm, SubmitHandler } from "react-hook-form";

import FormLogo from '../../assets/form-logo.png';

import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

type FormInput = {
  name: string;
  email: string;
  confirmEmail: string;
};

const schema = yup
.object({
  name: yup.string().required("O nome é obrigatório"),
  email: yup.string().email("E-mail inválido").required("O e-mail é obrigatório"),
  confirmEmail: yup.string().email("E-mail inválido").oneOf([yup.ref('email')], "Os e-mails não coincidem").required("É necessário confirmar o e-mail"),
  })
  .required();

function Form() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormInput>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<FormInput> = async (userData) => {
    console.log(userData);

    reset(); // Reseta o formulário após o envio
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <img src={FormLogo} alt="Imagem do logo" />

      <label htmlFor="name">
        Nome
        <input id="name" {...register("name")} />
        {errors.name && <span>{errors.name.message}</span>}
      </label>

      <label htmlFor="email">
        E-mail
        <input id="email" {...register("email")} />
        {errors.email && <span>{errors.email.message}</span>}
      </label>

      <label htmlFor="confirmEmail">
        Confirmar E-mail
        <input id="confirmEmail" {...register("confirmEmail")} />
        {errors.confirmEmail && <span>{errors.confirmEmail.message}</span>}
      </label>

      <button type='submit'>Cadastrar-se</button>
    </form>
  );
}

export default Form;
