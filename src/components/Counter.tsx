import React, { useState } from 'react';
import './counter.scss'
const Counter = () => {
    const [count, setCount] = useState(0)
    const dec = () => {
        setCount(count - 1)
    }
    const inc = () => {
        setCount(count + 1)
    }
    return (
        <div>
            <h1>{count}</h1>
            <button onClick={inc}>+</button>
            <button onClick={dec}>-</button>
        </div>
    );
};

export default Counter;