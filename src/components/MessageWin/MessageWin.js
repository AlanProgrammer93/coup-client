import React from 'react'
import { useNavigate } from 'react-router'

import './MessageWin.css'

const MessageWin = () => {
    const history = useNavigate()

    const goHome = () => {
        localStorage.removeItem('currentGame')
        history(`/`)
    }

    return (
        <div className="win">
            <div className="container">
                <h1>GANASTE EL JUEGO!</h1>
                <button onClick={goHome}>Ir al Inicio</button>
            </div>
        </div>
    )
}

export default MessageWin
