import styles from './Form.module.css';

import { useForm, SubmitHandler } from "react-hook-form";
import { useState,useEffect } from 'react';
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
  const [isSubmitting, setIsSubmitting] = useState(false); 

  // Recupera os dados salvos no localStorage ao carregar o componente
  useEffect(() => {

    const saveData = localStorage.getItem("formData");
    if(saveData){
      const parseData = JSON.parse(saveData)

      // Preenche o formulário com os dados do localStorage
      reset(parseData);
    }
  },[reset]);

  const onSubmit: SubmitHandler<FormInput> = async (userData) => {
    setIsSubmitting(true); 
   
    console.log(userData);

     // Salva os dados no localStorage
    localStorage.setItem("formData", JSON.stringify(userData));

    setSuccessMessage('Cadastro realizado com sucesso!');
    
    setTimeout(() => {
      reset();
      setSuccessMessage('');
      setIsSubmitting(false);

      // Limpa os dados do localStorage
      localStorage.removeItem("formData");
    },3000)

    
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <img src={FormLogo} alt="Imagem do logo" />

      <label htmlFor="name">
        Nome
        <input type='text' id="name" {...register("name")} />
        {errors.name && <span className={styles.error}>{errors.name.message}</span>}
      </label>

      <label htmlFor="email">
        E-mail
        <input type='email' id="email" {...register("email")} />
        {errors.email && <span className={styles.error}>{errors.email.message}</span>}
      </label>

      <label htmlFor="confirmEmail">
        Confirmar E-mail
        <input type='email' id="confirmEmail" {...register("confirmEmail")} />
        {errors.confirmEmail && <span className={styles.error}>{errors.confirmEmail.message}</span>}
      </label>

      <button type='submit' disabled={isSubmitting}>
      {isSubmitting ? 'Enviando...' : 'Cadastrar-se'}
        </button>

      {successMessage && <p className={styles.success}>{successMessage}</p>}
      

    </form>
  );
}

export default Form;
