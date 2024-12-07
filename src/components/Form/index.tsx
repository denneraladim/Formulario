
import styles from './Form.module.css';

// type FormInput = {
//     nome: string;
//     email: string;
//     confirmarEmail: string;
// };

import FormLogo from '../../assets/form-logo.png';

function Form() {
    return (
        <form className={styles.form}>
            <img src={FormLogo} alt="imagem-logo" />
            <label>
             Nome
             <input />
            </label>
            <label>
             E-mail
             <input />
            </label>
            <label>
             Confirmar E-mail
             <input />
            </label>
            <button type='submit'>Cadastrar-se</button>
        </form>
    )
}

export default Form;