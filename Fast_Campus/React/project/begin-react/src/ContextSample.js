import React, { createContext, useContext, useState } from 'react';

const MyContext = createContext('defaultValue');

function Child() {
    const text = useContext(MyContext);
    return <div>안녕하세요? {text}</div>
}

function Parent({ text }) {
    return <Child text={text} />
}

function GrandParent({ text }) {
    return <Parent text={text} />
}

function ContextSample() {
    const [value, setValue] = useState(true);
    return (
        <MyContext.Provider value={value ? 'Junnna' : 'Jun Hyoung'}>
            <GrandParent />
            <button onClick={() => setValue(!value)}>Click me!</button>
        </MyContext.Provider>
    );
}

export default ContextSample;