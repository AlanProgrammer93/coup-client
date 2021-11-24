import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import {useDispatch} from 'react-redux';

import clientAxios from '../../utils/axios'
import Message from '../../components/MessageFeedback/Message'

import "./Login.css"

const Login = () => {
    const [error, setError] = useState('')
    const [data, setData] = useState({
        username: '',
        password: ''
    })

    const history = useNavigate()

    const dispatch = useDispatch();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if(token) {
            history('/')
        }
    }, [])

    const onChange = (e) => {
        setData(prev => ({ ...prev, [e.target.name]: e.target.value}))
    }

    const signIn = (e) => {
        e.preventDefault();
        if (!data.username || !data.password) {
            setError("Debes Completar Todos Los Campos")
            return
        }
        
        clientAxios.post('/auth/login', data)
            .then(res => {
                localStorage.setItem('token', res.data.token)

                dispatch({
                    type: 'LOGGED_IN_USER',
                    payload: {
                        username: res.data.username
                    }
                });
                history('/')
            })
            .catch(err => console.log(err))
    }

    const register = (e) => {
        e.preventDefault();
        if (!data.username || !data.password) {
            setError("Debes Completar Todos Los Campos")
            return
        }
        if (data.username.length < 4) {
            setError("Nombre De Usuario Demasiado Corto")
            return
        }
        if (data.password.length < 6) {
            setError("La Contraseña Debe Ser Mayor A 6 Caracteres")
            return
        }
        
        clientAxios.post('/auth/register', data)
            .then(res => {
                localStorage.setItem('token', res.data.token)

                dispatch({
                    type: 'LOGGED_IN_USER',
                    payload: {
                        username: res.data.username
                    }
                });
                history('/')
            })
            .catch(err => console.log(err))
        
    }

    return (
        <div className="login">
            <div className="login__card">
                <h2>Coop</h2>
                <input 
                    type="text" 
                    placeholder="Nombre de usuario"
                    value={data.username}
                    name="username"
                    onChange={onChange}
                />
                <input 
                    type="password" 
                    placeholder="Contraseña"
                    value={data.password}
                    name="password"
                    onChange={onChange}
                />
                <br />
                <button onClick={signIn}>Iniciar Sesion</button>
                <p>o</p>
                <button onClick={register}>Registrarse</button>
            </div>
            {error && <Message msg={error} setError={setError} />}
        </div>
    )
}

export default Login
