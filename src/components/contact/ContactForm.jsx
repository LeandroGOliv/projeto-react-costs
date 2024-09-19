import { useState } from "react";

import styles from "./ContactForm.module.css";
import Input from "../form/Input";
import SubmitButton from "../form/SubmitButton";

function ContactForm({ btnText, handleSubmit }) {
  // TERMIANAR
  const [contact, setContact] = useState({
    name: "",
    email: "",
    subject: "CONTATO SITE COSTS",
    honeypot: "", // if any value received in this field, form submission will be ignored.
    message: "",
    replyTo: "@",
    accessKey: "0a20357c-6e61-4925-a522-3020bb761f4e",
  });

  const handleChange = (e) =>
    setContact({ ...contact, [e.target.name]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    handleSubmit(contact);
  };

  return (
    <div>
      <form onSubmit={submit} className={styles.form}>
        <Input
          type="text"
          name="name"
          text="Seu nome"
          placeholder="Insira seu nome"
          handleOnChange={handleChange}
          value={contact.name}
        />
        <Input
          type="email"
          name="email"
          text="Seu email para contato"
          placeholder="Digite o email para contato"
          handleOnChange={handleChange}
          value={contact.email}
        />
        <Input
          type="text"
          name="message"
          text="Como podemos ajudar?"
          placeholder="Digite sua mensagem..."
          handleOnChange={handleChange}
          value={contact.message}
        />
        <div className={styles.central_btn}>
          <SubmitButton text={btnText} />
        </div>
      </form>
    </div>
  );
}

export default ContactForm;
