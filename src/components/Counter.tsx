import React, { useState } from 'react';
import counterus from './Counter.module.scss'
const Counter = () => {
    const [count, setCount] = useState(0)
    const dec = () => {
        setCount(count - 1)
    }
    const inc = () => {
        setCount(count + 1)
    }
    return (
        <div className={counterus.divus}>
            <h1>{count}</h1>
            <button className={counterus.btn} onClick={inc}>+</button>
            <button className={counterus.btn} onClick={dec}>-</button>
            dasdsadsaasdsa
        </div>
    );
};

export default Counter;