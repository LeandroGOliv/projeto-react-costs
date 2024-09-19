import { useLocation } from "react-router-dom";
import styles from "./Projects.module.css";
import Message from "../layout/Message";
import Container from "../layout/Container";
import Loading from "../layout/Loading";
import LinkButton from "../layout/LinkButton";
import ProjectCard from "../project/ProjectCard";
import { useState, useEffect } from "react";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [removeLoading, setRemoveLoading] = useState(false); // false porque ele sempre iniciar, depois a gente vai dar true pra remover ele
  const [projectMessage, setProjectMessage] = useState("");

  const location = useLocation(); // pra localizar algo que ta dentro do navigate
  let message = "";
  if (location.state) {
    // if eu tiver algo no state da location...
    message = location.state.message;
  }

  useEffect(() => {
    setTimeout(() => {
      // esse timeout é só pra simular a demora da requisiçao dos dados, como aqui o servidor é local ele carrega quase instantaneamente e dai não conseguiriamos ver nosso loader
      fetch("http://localhost:5000/projects", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((resp) => resp.json())
        .then((data) => {
          console.log(data);
          setProjects(data);
          setRemoveLoading(true); //quando carregar os projetos eu removo o loader...
        })
        .catch((err) => console.log(err));
    }, 1000);
  }, []);

  function removeProject(id) {
    fetch(`http://localhost:5000/projects/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        setProjects(projects.filter((project) => project.id !== id)); // cria uma nova array com todos os projetos que tem o id diferente do que foi selecionado...
        setProjectMessage("Projeto removido com sucesso!");
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className={styles.project_container}>
      <div className={styles.tittle_container}>
        <h1>Meus Projetos</h1>
        <LinkButton to="/newproject" text="Criar Projeto" />
      </div>
      {message && <Message msg={message} type="success" />}
      {projectMessage && <Message msg={projectMessage} type="success" />}
      {/* teria formas melhores de fazer sem ser clonando a linha de cima mas assim funciona2*/}
      <Container customClass="start">
        {projects.length > 0 &&
          projects.map((project) => (
            <ProjectCard
              name={project.name}
              id={project.id}
              budget={project.budget}
              category={project.category.name}
              key={project.id}
              handleRemove={removeProject}
            />
          ))}
        {!removeLoading && <Loading />}
        {removeLoading &&
          projects.length === 0 && ( // situação pra quando não tem projetos, se não tem loader, no caso ele ta setado como true e eu tiver 0 projetos eu mostro esse paragrafo
            <p>Não há projetos cadastrados!</p>
          )}
      </Container>
    </div>
  );
}
export default Projects;
