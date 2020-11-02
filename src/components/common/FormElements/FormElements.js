import React from 'react';
import style from './FormElements.module.css';

export let Input = ({input, ...restProps}) => {
    let isError = restProps.meta.touched && restProps.meta.error;
    return (
        <div className={style[restProps.wrapperclass]}>
            <input {...input}
                   {...restProps}
                   className={`${style[restProps.inputclass]} ${isError ? style.inputError : ''}`}
            />
            {
                isError
                    ?
                    <div className={style.errorMessage}>
                        {restProps.meta.error}
                    </div>
                    :
                    null
            }
        </div>
    );
}