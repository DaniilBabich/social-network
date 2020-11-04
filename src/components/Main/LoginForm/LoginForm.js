import React from 'react';
import {Field, reduxForm} from 'redux-form';
import {Input} from '../../common/FormElements/FormElements';
import {Redirect} from 'react-router-dom';
import {required} from '../../../utils/validators';
import style from './LoginForm.module.css';

const LoginForm = (props) => {
    if (props.isAuth) {
        return <Redirect to='profile'/>
    }

    return (
        <form className={style.loginForm} onSubmit={props.handleSubmit}>
            <Field component={Input}
                   validate={[required]}
                   name='email'
                   placeholder='Email'
                   inputclass={'defaultInput'}
                   wrapperclass={'defaultWrapper'}
            />
            <Field component={Input}
                   validate={[required]}
                   name='password'
                   placeholder='Password'
                   type='password'
                   autoComplete="off"
                   inputclass={'defaultInput'}
                   wrapperclass={'defaultWrapper'}
            />
            <label className={style.rememberMe}>
                <Field component='input' type='checkbox' name='rememberMe'/>
                Remember me
            </label>
            <button>Login</button>
            {
                props.error
                    ?
                    props.error.map((error) => {
                        return (
                            <div className={style.loginError} key={error}>{error}</div>
                        )
                    })
                    :
                    null
            }
            {
                props.captchaUrl
                    ?
                    <div>
                        <img src={props.captchaUrl} alt="captcha"/>
                        <Field component={Input}
                               validate={[required]}
                               name='captcha'
                               placeholder='Captcha'
                               inputclass={'defaultInput'}
                               wrapperclass={'defaultWrapper'}
                        />
                    </div>
                    :
                    null
            }
            <div>
                <div className={style.header}>Use for testing:</div>
                <div className={style.email}><span>Email: </span>free@samuraijs.com</div>
                <div className={style.password}><span>Password: </span>free</div>
            </div>
        </form>
    );
}

let LoginReduxForm = reduxForm({form: 'loginForm'})(LoginForm);

export default LoginReduxForm;