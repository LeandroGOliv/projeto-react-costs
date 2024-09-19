import styles from "./Company.module.css";

function Company() {
  return (
    <div className={styles.company_container}>
      <div className={styles.tittle_container}>
        <h1>Quem Somos</h1>
      </div>
      <p>
        <span className={styles.company_container_text}>
          A <span className={styles.contrast}>COST</span> é uma plataforma
          dedicada a auxiliar empresas no controle e planejamento financeiro de
          seus projetos. Nosso foco é fornecer ferramentas para que as
          organizações possam registrar e gerenciar seus custos de forma
          eficiente, facilitando a alocação de recursos, o acompanhamento de
          despesas e a previsão de investimentos. Com nossa solução, as empresas
          ganham clareza e precisão sobre onde estão aplicando seu orçamento,
          permitindo um planejamento mais estratégico e decisões financeiras
          mais assertivas.
        </span>
      </p>
    </div>
  );
}

export default Company;
