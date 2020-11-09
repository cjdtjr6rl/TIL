import React from 'react';
import { useRef } from 'react';
import Button from '../button/button';
import styles from './card_edit_form.module.css';

const CardEditForm = ({ FileInput, card, updateCard, deleteCard }) => {
    const designRef = useRef();
    const nameRef = useRef();
    const companyRef = useRef();
    const addressRef = useRef();
    const positionRef = useRef();
    const themeRef1 = useRef();
    const themeRef2 = useRef();
    const shapeRef = useRef();
    const comnumberRef = useRef();
    const numberRef = useRef();
    const emailRef = useRef();
    const faxRef = useRef();
    const messageRef = useRef();
    const {design, name, company, position, address, comnumber, number, fax, email, message, theme1, theme2, shape, fileName} = card;

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
            <select ref={designRef} className={styles.select} name="design" value={design} onChange={onChange}>
                <option placeholder="manyInfo">manyInfo</option>
                <option placeholder="simple">simple</option>
                <option placeholder="static">static</option>
            </select>
            <select ref={shapeRef} className={styles.select} name="shape" value={shape} onChange={onChange}>
                <option placeholder="modern">modern</option>
                <option placeholder="round">round</option>
                <option placeholder="stick">stick</option>
            </select>
            <select ref={themeRef1} className={styles.select} name="theme1" value={theme1} onChange={onChange}>
                <option placeholder="light">light</option>
                <option placeholder="dark">dark</option>
                <option placeholder="colorful">colorful</option>
                <option placeholder="slamon">salmon</option>
                <option placeholder="blue">blue</option>
                <option placeholder="gold">gold</option>
                <option placeholder="wood">wood</option>
            </select>
            <select ref={themeRef2} className={styles.select} name="theme2" value={theme2} onChange={onChange}>
                <option placeholder="light">light</option>
                <option placeholder="dark">dark</option>
                <option placeholder="colorful">colorful</option>
                <option placeholder="slamon">salmon</option>
                <option placeholder="blue">blue</option>
                <option placeholder="gold">gold</option>
                <option placeholder="wood">wood</option>
            </select>
            <input ref={nameRef} className={styles.input} type="text" name="name" value={name} onChange={onChange} />
            <input ref={companyRef} className={styles.input} type="text" name="company" value={company} onChange={onChange} />
            <input ref={positionRef} className={styles.input} type="text" name="position" value={position} onChange={onChange} />
            <input ref={addressRef} className={styles.input} type="text" name="address" value={address} onChange={onChange} />
            <input ref={comnumberRef} className={styles.input} type="text" name="comnumber" value={comnumber} onChange={onChange} />
            <input ref={numberRef} className={styles.input} type="text" name="number" value={number} onChange={onChange} />
            <input ref={faxRef} className={styles.input} type="text" name="fax" value={fax} onChange={onChange} />
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