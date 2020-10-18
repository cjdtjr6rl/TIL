import React, { useState, useEffect, useCallback } from "react";
import { useHistory } from "react-router-dom";
import Editor from "../editor/editor";
import Header from "../header/header";
import Select from "../select/select";
import Footer from "../footer/footer";
import Preview from "../preview/preview";
import styles from "./maker.module.css";

const Maker = ({ FileInput, authService, cardRepository }) => {
  const historyState = useHistory().state;
  const [cards, setCards] = useState({});
  const [userId, setUserId] = useState(historyState && historyState.id);

  const history = useHistory();

  useEffect(() => {
    if(!userId) {
      return;
    }
    const stopSync = cardRepository.syncCards(userId, cards => {
      setCards(cards);
    })
    // 컴포넌트가 언마운트 되었을 때 불필요한 네트워크 사용을 끔
    return () => stopSync();
  }, [cardRepository, userId]);
  
  // 로그인 관련 useEffect
  useEffect(() => {
    authService.onAuthChange((user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        history.push("/");
      }
    });
  }, [authService, userId, history]);

  const createOrUpdateCard = (card) => {
    setCards(cards => {
      const updated = {...cards};
      updated[card.id] = card;
      return updated;
    });
    cardRepository.saveCard(userId, card);
  }

  const deleteCard = (card) => {
    setCards(cards => {
      const updated = {...cards};
      delete updated[card.id];
      return updated;
    });
    cardRepository.removeCard(userId, card);
  }

  const onLogout = useCallback(() => {
    authService.logout();
}, [authService]);

  return (
    <section className={styles.maker}>
      <Header onLogout={onLogout} />
      <Select />
      <div className={styles.container}>
        <Editor FileInput={FileInput}
          cards={cards}
          addCard={createOrUpdateCard}
          updateCard={createOrUpdateCard}
          deleteCard={deleteCard} />
        <Preview cards={cards} />
      </div>
      <Footer />
    </section>
  );
};

export default Maker;
