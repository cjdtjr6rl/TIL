import React from 'react';
import { useRef } from 'react';
import Button from '../button/button';

const CommentAddForm = ({ createComment }) => {
    const formRef = useRef();
    const nameRef = useRef();
    const commentRef = useRef();

    const onSubmit = (e) => {
        e.preventDefault();
        const comment = {
            id: Date.now(),
            name: nameRef.current.value || '',
            comment: commentRef.current.value || '',
        };
        formRef.current.reset();
        createComment(comment)
    }

    return (
        <form ref={formRef}>
            <input ref={nameRef} type="text" name="name" placeholder="Name" />
            <input ref={commentRef} type="text" name="comment" placeholder="Review" />
            <Button name="입력" onClick={onSubmit} />
        </form>
    );
};

export default CommentAddForm;