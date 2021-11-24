import React from 'react'
import { useSelector } from 'react-redux';

import { emitStartGame } from '../../utils/socket';

import './Starting.css'

const Starting = () => {
    const { game } = useSelector((state) => ({ ...state }));

    // SEGUIR AQUI: ESTILIZAR CARD, FUNCION COMENZAR JUEGO 
    const startGame = () => {
        emitStartGame(game.idGame)
    }

    return (
        <div className="starting">
            <h3>2 Jugadores</h3>
            <button onClick={startGame}>Comenzar Ahora</button>
        </div>
    )
}

export default Starting
