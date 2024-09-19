import { useState, useEffect } from "react";
import styles from "./Message.module.css";

function Message({ type, msg }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!msg) {
      // se a mensagem não existe setar setInvisible como false
      setVisible(false);
      return;
    }

    setVisible(true); // se a mensagem existir ela vai ignorar o if... e vir pra ca

    const timer = setTimeout(() => {
      setVisible(false);
    }, 3000);

    return () => clearTimeout(timer); // só para finalizar pq o useEffect precisa dar um return
  }, [msg]);

  return (
    <>
      {visible && ( //if visible...
        <div className={`${styles.message} ${styles[type]}`}>{msg}</div>
      )}
    </>
  );
}

export default Message;
