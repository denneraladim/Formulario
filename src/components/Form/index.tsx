import styles from './Form.module.css';

import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from 'react';
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
  email: yup.string().email("Digite um e-mail válido").required("O e-mail é obrigatório"),
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

  const [successMessage, setSuccessMessage] = useState('');

  const onSubmit: SubmitHandler<FormInput> = async (userData) => {
   
    console.log(userData);

    setSuccessMessage('Cadastro realizado com sucesso!');
    
    setTimeout(() => {
      reset();
      setSuccessMessage('');
    },3000);

  
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <img src={FormLogo} alt="Imagem do logo" />

      <label htmlFor="name">
        Nome
        <input type='text' id="name" {...register("name")} />
        <span>{errors.name?.message}</span>
      </label>

      <label htmlFor="email">
        E-mail
        <input type='text' id="email" {...register("email")} />
        <span>{errors.email?.message}</span>
      </label>

      <label htmlFor="confirmEmail">
        Confirmar E-mail
        <input type='text' id="confirmEmail" {...register("confirmEmail")} />
        <span>{errors.confirmEmail?.message}</span>
      </label>

      <button type='submit'>Cadastrar-se</button>
      {successMessage && <p className={styles.success}>{successMessage}</p>}
    </form>
  );
}

export default Form;
