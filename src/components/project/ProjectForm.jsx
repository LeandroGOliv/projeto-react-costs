import { useEffect, useState } from "react";

import Input from "../form/Input";
import Select from "../form/Select";
import SubmitButton from "../form/SubmitButton";
import styles from "./ProjectForm.module.css";

function ProjectForm({ handleSubmit, btnText, projectData }) {
  const [categories, setCategories] = useState([]);
  const [project, setProject] = useState(projectData || {}); //se vierem os dados do formulario de edicao, ele vai preecher atravees do projectData, se não vai ser vazio pra eu mesmo preencher

  useEffect(() => {
    fetch("http://localhost:5000/categories", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json()) //pego a resposta e transformo em json, coisas padrão de promises aqui
      .then((data) => {
        //pego os dados e falo que setCategories é igual aos dados
        setCategories(data);
      })
      .catch((err) => console.log(err));
  }, []); // no use effects, ele pede uma dependencia para ele renderizar os componentes, caso seja deixada vazia a dependencia ele renderiza apenas uma vez após a montagem inicial do componente, nesse caso se não utilizar useEffect ele vai ficar renderizando infinito e puxando os dados da api em loop... sendo q a gente só precisa renderizar  uma vez

  const submit = (e) => {
    e.preventDefault(); //pra não dar aquele reload quando envia o formulario
    handleSubmit(project);
    // console.log(project);
  };

  function handleChange(e) {
    setProject({ ...project, [e.target.name]: e.target.value }); //independente do input que eu preencher vai mudar alguma propiedade de texto do project
    // tentar entender melhor a linha de cima
  }

  function handleCategory(e) {
    setProject({
      ...project,
      category: {
        id: e.target.value,
        name: e.target.options[e.target.selectedIndex].text, // selectIndex ve pelo index qual foi a opcao selecionada
      },
    });
  }

  return (
    <form onSubmit={submit} className={styles.form}>
      <Input
        type="text"
        text="Nome do projeto"
        name="name"
        placeholder="Insira o nome do projeto"
        value={project.name ? project.name : ""}
        handleOnChange={handleChange}
      />
      <Input
        type="number"
        text="Orçamento do projeto"
        name="budget"
        placeholder="Insira o orçamento total"
        value={project.budget ? project.budget : ""}
        handleOnChange={handleChange}
      />
      <Select
        name="category_id"
        text="Selecione a categoria"
        options={categories}
        value={project.category ? project.category.id : ""} // se ele ja tiver um project category eu passo o id dessa categoria se não eu passo um valor vazio
        handleOnChange={handleCategory}
      />
      <SubmitButton text={btnText} />
    </form>
  );
}

export default ProjectForm;
