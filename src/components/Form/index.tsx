
import styles from './Form.module.css';

import { useForm, SubmitHandler } from "react-hook-form";

type FormInput = {
    name: string;
    email: string;
    confirmEmail: string;
};

import FormLogo from '../../assets/form-logo.png';

function Form() {
    const {
        register,
        handleSubmit,
        // reset,
        formState: { errors },
      } = useForm<FormInput>({
        // resolver: yupResolver(schema),
      });


      const onSubmit: SubmitHandler<FormInput> = async (userData) => {
        console.log(userData);
      };

      console.log(errors);
    return (
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <img src={FormLogo} alt="imagem-logo" />
            <label>
             Nome
             <input {...register("name",{ required: true })}/>
             {errors.name && <span>O nome é obrigatório</span> }
            </label>
            <label>
             E-mail
             <input {...register("email")}/>
            </label>
            <label>
             Confirmar E-mail
             <input {...register("confirmEmail")}/>
            </label>
            <button type='submit'>Cadastrar-se</button>
        </form>
    )
}

export default Form;