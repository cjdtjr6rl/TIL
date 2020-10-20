import React from 'react';

const Talk = ({ comments }) => {
    const {name, comment} = comments;
    return (
        <li>
            <h1>{name}</h1>
            <h2>{comment}</h2>
        </li>
    );
};

export default Talk;