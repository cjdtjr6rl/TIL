import React from 'react';
import { useRef } from 'react';
import Button from '../button/button';
import styles from './card_edit_form.module.css';

const CardEditForm = ({ FileInput, card, updateCard, deleteCard }) => {
    const nameRef = useRef();
    const companyRef = useRef();
    const themeRef = useRef();
    const shapeRef = useRef();
    const titleRef = useRef();
    const emailRef = useRef();
    const messageRef = useRef();
    const {name, company, title, email, message, theme, shape, fileName} = card;

    const onFileChange = (file) => {
        updateCard({
            ...card,
            fileName: file.name,
            fileURL: file.url,
        });
    };

    const onChange = (e) => {
        if (e.currentTarget === null) {
            return;
        }
        e.preventDefault();
        updateCard({
            ...card,
            [e.currentTarget.name]: e.currentTarget.value,
        })
    }

    const onSubmit = (e) => {
        e.preventDefault();
        deleteCard(card);
    }

    return (
        <form className={styles.form}>
            <input ref={nameRef} className={styles.input} type="text" name="name" value={name} onChange={onChange} />
            <input ref={companyRef} className={styles.input} type="text" name="company" value={company} onChange={onChange} />
            <select ref={themeRef} className={styles.select} name="theme" value={theme} onChange={onChange}>
                <option value="light">light</option>
                <option value="dark">dark</option>
                <option value="colorful">colorful</option>
                <option placeholder="slamon">salmon</option>
                <option placeholder="blue">blue</option>
            </select>
            <select ref={shapeRef} className={styles.select} name="shape" value={shape} onChange={onChange}>
                <option placeholder="modern">modern</option>
                <option placeholder="round">round</option>
                <option placeholder="stick">stick</option>
                <option placeholder="weird">weird</option>
            </select>
            <input ref={titleRef} className={styles.input} type="text" name="title" value={title} onChange={onChange} />
            <input ref={emailRef} className={styles.input} type="text" name="email" value={email} onChange={onChange} />
            <textarea ref={messageRef} className={styles.textarea} name="message" value={message} onChange={onChange} />
            <div className={styles.fileInput}>
                <FileInput name={fileName} onFileChange={onFileChange} />
            </div>
            <Button name="Delete" onClick={onSubmit} />
        </form>
    );
};

export default CardEditForm;