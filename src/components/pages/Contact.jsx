import Message from "../layout/Message";
import ContactForm from "../contact/ContactForm";
import styles from "./Contact.module.css";
import Container from "../layout/Container";
import { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { BsTelephone } from "react-icons/bs";

function Contact() {
  const [message, setMessage] = useState();
  const [type, setType] = useState();

  function sendEmail(contact) {
    setMessage("");
    fetch("https://api.staticforms.xyz/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(contact),
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        if (contact.message && contact.email && contact.name) {
          setMessage(
            "Mensagem enviada com sucesso, fique de olho em seu e-mail!"
          );
          setType("success");
        } else {
          setMessage("Verifique o formulário e preencha todos os campos.");
          setType("error");
        }
      })
      .catch((err) => {
        console.log(err);
        setMessage("Espere um tempo antes de tentar novamente.");
        setType("error");
      });
  }

  return (
    <Container customClass="column">
      <div className={styles.contact_span}>
        <p>
          <span>Envie uma mensagem ou registre problemas com o site.</span>
        </p>
      </div>
      <div>
        {<Message type={type} msg={message} />}
        <ContactForm btnText="Enviar mensagem" handleSubmit={sendEmail} />
      </div>
      <div className={styles.contact_area}>
        <h2>Contato</h2>

        <h3>ATENDIMENTO E ASSISTÊNCIA TÉCNICA</h3>
        <p>
          De segunda à sábado das 8:00 - 22:00 <br />e domingos ou feriados das
          9:00 - 15:00.
        </p>

        <h4>WHATSAPP</h4>
        <p>
          <FaWhatsapp /> (00) 99999 9999
        </p>

        <h4>TELEFONE</h4>
        <p>
          <BsTelephone /> 0800 000 0000
        </p>
      </div>
    </Container>
  );
}

export default Contact;
