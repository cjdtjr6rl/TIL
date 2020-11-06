import React from 'react';
import { useState } from 'react';
import { memo } from 'react';
import { useRef } from 'react';
import Button from '../button/button';
import styles from './card_add_form.module.css';

const CardAddForm = memo(({ FileInput, onAdd }) => {
    const designRef = useRef();
    const formRef = useRef();
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
            address: addressRef.current.value || '',
            position: positionRef.current.value || '',
            theme1: themeRef1.current.value,
            theme2: themeRef2.current.value,
            shape: shapeRef.current.value,
            design: designRef.current.value,
            comnumber: comnumberRef.current.value || '',
            number: numberRef.current.value || '',
            email: emailRef.current.value || '',
            fax: faxRef.current.value || '',
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
            <select ref={designRef} className={styles.select} name="design" placeholder="Design">
                <option placeholder="static">static</option>
                <option placeholder="simple">simple</option>
                <option placeholder="manyInfo">manyInfo</option>
            </select>
            <select ref={shapeRef} className={styles.select} name="shape" placeholder="Shape">
                <option placeholder="modern">modern</option>
                <option placeholder="round">round</option>
                <option placeholder="stick">stick</option>
            </select>
            <select ref={themeRef1} className={styles.select} name="theme1" placeholder="Theme1">
                <option placeholder="light">light</option>
                <option placeholder="dark">dark</option>
                <option placeholder="colorful">colorful</option>
                <option placeholder="slamon">salmon</option>
                <option placeholder="blue">blue</option>
                <option placeholder="gold">gold</option>
            </select>
            <select ref={themeRef2} className={styles.select} name="theme2" placeholder="Theme2">
                <option placeholder="light">light</option>
                <option placeholder="dark">dark</option>
                <option placeholder="colorful">colorful</option>
                <option placeholder="slamon">salmon</option>
                <option placeholder="blue">blue</option>
                <option placeholder="gold">gold</option>
            </select>
            <input ref={nameRef} className={styles.input} type="text" name="name" placeholder='Name' />
            <input ref={companyRef} className={styles.input} type="text" name="company" placeholder='Company' />
            <input ref={positionRef} className={styles.input} type="text" name="position" placeholder='Position' />
            <input ref={addressRef} className={styles.input} type="text" name="address" placeholder='Address' />
            <input ref={comnumberRef} className={styles.input} type="text" name="comnumber" placeholder='Company Number' />
            <input ref={numberRef} className={styles.input} type="text" name="number" placeholder='Phone Number' />
            <input ref={faxRef} className={styles.input} type="text" name="fax" placeholder='Fax' />
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