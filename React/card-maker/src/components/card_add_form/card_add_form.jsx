import React from 'react';
import { useState } from 'react';
import { memo } from 'react';
import { useRef } from 'react';
import Button from '../button/button';
import styles from './card_add_form.module.css';

const CardAddForm = memo(({ FileInput, onAdd }) => {
    const formRef = useRef();
    const nameRef = useRef();
    const companyRef = useRef();
    const themeRef = useRef();
    const shapeRef = useRef();
    const titleRef = useRef();
    const emailRef = useRef();
    const messageRef = useRef();
    const [file, setFile] = useState({ fileName: null, fileURL: null });

    const onFileChange = (file) => {
        setFile({
            fileName: file.name,
            fileURL: file.url,
        });
    }

    const onSubmit = (e) => {
        e.preventDefault();
        const card = {
            id: Date.now(),
            name: nameRef.current.value || '',
            company: companyRef.current.value || '',
            theme: themeRef.current.value,
            shape: shapeRef.current.value,
            title: titleRef.current.value || '',
            email: emailRef.current.value || '',
            message: messageRef.current.value || '',
            fileName: file.fileName || '',
            fileURL: file.fileURL || '',
        };

        formRef.current.reset();
        setFile({ fileName: null, fileURL: null })
        onAdd(card);
    }
    return (
        <form ref={formRef} className={styles.form}>
            <input ref={nameRef} className={styles.input} type="text" name="name" placeholder='Name' />
            <input ref={companyRef} className={styles.input} type="text" name="company" placeholder='Company' />
            <select ref={themeRef} className={styles.select} name="theme" placeholder="Theme">
                <option placeholder="light">light</option>
                <option placeholder="dark">dark</option>
                <option placeholder="colorful">colorful</option>
                <option placeholder="slamon">salmon</option>
                <option placeholder="blue">blue</option>
            </select>
            <select ref={shapeRef} className={styles.select} name="shape" placeholder="Shape">
                <option placeholder="modern">modern</option>
                <option placeholder="round">round</option>
                <option placeholder="stick">stick</option>
                <option placeholder="weird">weird</option>
            </select>
            <input ref={titleRef} className={styles.input} type="text" name="title" placeholder='Title' />
            <input ref={emailRef} className={styles.input} type="text" name="email" placeholder='Email' />
            <textarea ref={messageRef} className={styles.textarea} name="messgae" placeholder='Message' />
            <div className={styles.fileInput}>
                <FileInput name={file.fileName} onFileChange={onFileChange} />
            </div>
            <Button name="Add" onClick={onSubmit} />
        </form>
    );
});

export default CardAddForm;