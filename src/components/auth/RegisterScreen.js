import React from 'react';
import validator from 'validator';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { useForm } from '../../hooks/useForm';
import { removeError, setError } from '../../actions/ui';
import { startRegisterWithEmailPasswordName } from '../../actions/auth';


const RegisterScreen = () => {

    const dispatch = useDispatch();
    const { msgError } = useSelector( state => state.ui );

    const [ formValues, handleInputChange ] = useForm({
        name: 'Hernando',
        email: 'nando@gmail.com',
        password: '123456',
        confirmPassword: '123456'
    });

    const { name, email, password, confirmPassword } = formValues;

    const handleRegister = (e) => {
        e.preventDefault();
        
        if( isFormValid() ) {
            // console.log('formulario correcto');
            dispatch(startRegisterWithEmailPasswordName( email, password, name ));
        }
            
    }

    const isFormValid = () => {

        if( name.trim().length === 0 ){
            dispatch( setError('Name is requerid') );
            return false;
        } else if ( !validator.isEmail(email) ) {
            dispatch( setError('Email is not value') );
            return false;
        } else if ( password !== confirmPassword || password.length < 5 ) {
            dispatch( setError('password should be at least characters and match each other') );
            return false;
        }

        dispatch( removeError() );

        return true;
    }

    return (
        <>
            <h3 className="auth__title">Regístrate</h3>

            <form 
                className="animate__animated animate__fadeIn"
                onSubmit={ handleRegister }
            >

                {
                    msgError &&
                    <div className="auth__alert-error">
                        { msgError }
                    </div>

                }


                <input 
                    type="text"
                    placeholder="Name"
                    name="name"
                    autoComplete="off"
                    className="auth__input"
                    value={ name }
                    onChange={ handleInputChange }
                />

                <input 
                    type="text"
                    placeholder="Email"
                    name="email"
                    autoComplete="off"
                    className="auth__input"
                    value={ email }
                    onChange={ handleInputChange }
                />

                <input 
                    type="password"
                    placeholder="Password"
                    name="password"
                    className="auth__input"
                    value={ password }
                    onChange={ handleInputChange }
                    />

                <input 
                    type="password"
                    placeholder="Confirm password"
                    name="password2"
                    className="auth__input"
                    value={ confirmPassword }
                    onChange={ handleInputChange }
                />

                <button
                    className="btn btn-primary btn-block mb-5"
                    type="submit"
                >
                    Registrarse
                </button>

                <Link className="link" to="/auth/login"> 
                    Already registered? Login
                </Link>
                
            </form>
        </>
    );
}

export default RegisterScreen;
