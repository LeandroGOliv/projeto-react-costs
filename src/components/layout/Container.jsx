import styles from "./Container.module.css";

function Container(props) {
  return (
    <div className={`${styles.container} ${styles[props.customClass]}`}>
      {/*esse customClass serve pra ativar apenas nos containers que eu quiser e nao em todos...*/}
      {props.children} {/* Explicado melhor no notion */}
    </div>
  );
}

export default Container;
