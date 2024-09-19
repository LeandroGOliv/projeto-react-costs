import { Link } from "react-router-dom";
import styles from "./LinkButton.module.css";

function LinkButton({ to, text }) {
  // o to vai servir para indicar para onde o usuario vai ao clicar e o text que vai mudar o texto do conteudo do botao
  return (
    <Link className={styles.btn} to={to}>
      {text}
    </Link>
  );
}

export default LinkButton;
