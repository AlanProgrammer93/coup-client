import React from 'react'
import { useNavigate } from 'react-router'

import './MessageLost.css'

const MessageLost = () => {
    const history = useNavigate()

    const goHome = () => {
        localStorage.removeItem('currentGame')
        history(`/`)
    }

    return (
        <div className="lost">
            <div className="container">
                <h1>PERDISTE EL JUEGO</h1>
                <button onClick={goHome}>Ir al Inicio</button>
            </div>
        </div>
    )
}

export default MessageLost
