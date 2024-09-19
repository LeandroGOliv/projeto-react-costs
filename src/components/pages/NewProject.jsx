import { useNavigate } from "react-router-dom";
import ProjectForm from "../project/ProjectForm";
import styles from "./NewProject.module.css";

function NewProject() {
  const navigate = useNavigate(); //pesquisar melhor

  function createPost(project) {
    //initialize cost and services
    project.cost = 0;
    project.services = [];

    fetch("http://localhost:5000/projects", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(project), //mandando os dados do projeto pelo metodo post por aquela rota da API, adicionando la na array projects do db
    }) // o "fetch" pode buscar ou mandar dados para o arquivo "db.json", tudo depende do method que será passado (GET busca estes dados, enquanto o POST os envia). Em ambos os casos, além do method, é implantado o atributo headers que seria uma propriedade adicional para estes dados (no caso do projeto é indicar que os dados estão em JSON), e no caso do POST, tem também a propriedade body, que vai indicar com que corpo nós vamos enviar estes dados para a API (aqui no caso é indicado que o envio será pelo método JSON.stringify(), ou seja, transformar nossos dados em JSON antes de mandar pra API). Para o method: GET não é necessário este corpo pois nós só estamos buscando estes dados.
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        navigate("/projects", {
          state: { message: "Projeto criado com sucesso!" },
        }); // pra redirecionar o usuario
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className={styles.newproject_container}>
      <h1>Criar Projeto</h1>
      <p>Crie seu projeto para depois adicionar os serviços</p>
      <ProjectForm handleSubmit={createPost} btnText="Criar Projeto" />
    </div>
  );
}

export default NewProject;
