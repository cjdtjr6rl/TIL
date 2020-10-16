import React, { useState, useRef } from 'react';
import styles from './image_file_input.module.css';

const ImageFileInput = ({ imageUploader, name, onFileChange }) => {
    const [loading, setLoading] = useState(false);
    const inputRef = useRef();
    const onButtonClick = (e) => {
        e.preventDefault();
        inputRef.current.click();
    };
    const onChange = async (e) => {
        setLoading(true);
        // imageUploader.upload(e.target.files[0]);
        const uploaded = await imageUploader.upload(e.target.files[0]);
        setLoading(false);
        onFileChange({
            name: uploaded.original_filename,
            url: uploaded.url,
        });
    }

    return (
        <div className={styles.container}>
            <input
                ref={inputRef}
                className={styles.input}
                type="file"
                accept="image/*"
                name="file"
                onChange={onChange}
            />
            { !loading && (
                <button className={`${styles.button} ${name ? styles.pink : styles.grey}`} onClick={onButtonClick}>
                    {name || 'No File'}
                </button>
            )}
            { loading && <div className={styles.loading}></div> }
        </div>
    );
};

export default ImageFileInput;