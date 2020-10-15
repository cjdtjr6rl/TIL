import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Editor from "../editor/editor";
import Footer from "../footer/footer";
import Header from "../header/header";
import Preview from "../preview/preview";
import styles from "./maker.module.css";

const Maker = ({ authService }) => {
  const [cards, setCards] = useState([
    {
      id: '1',
      name: 'Junnna',
      company: 'KNU',
      theme: 'light',
      title: 'Software Engineer',
      email: 'tnstnejddjfl@naver.com',
      message: 'Can do',
      fileName: 'jun',
      fileURL: null,
    },
    {
      id: '2',
      name: 'Test1',
      company: 'Korea',
      theme: 'dark',
      title: 'Manager',
      email: 'test123@gmail.com',
      message: 'I am hungry',
      fileName: 'test1',
      fileURL: null,
    },
    {
      id: '3',
      name: 'Test2',
      company: 'USA',
      theme: 'colorful',
      title: 'Singer',
      email: 'test3@hanmail.com',
      message: 'I am tired',
      fileName: 'test2',
      fileURL: null,
    }
  ]);
  const history = useHistory();
  const onLogout = () => {
    authService.logout();
  };

  useEffect(() => {
    authService.onAuthChange((user) => {
      if (!user) {
        history.push("/");
      }
    });
  });

  const addCard = (card) => {
    const updated = [...cards, card];
    setCards(updated);
  }

  return (
    <section className={styles.maker}>
      <Header onLogout={onLogout} />
      <div className={styles.container}>
        <Editor cards={cards} addCard={addCard} />
        <Preview cards={cards} />
      </div>
      <Footer />
    </section>
  );
};

export default Maker;
