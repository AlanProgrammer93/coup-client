import React from 'react'
import { useSelector } from 'react-redux';

import { emitStartGame } from '../../utils/socket';

import './Starting.css'

const Starting = () => {
    const { user, game } = useSelector((state) => ({ ...state }));

    const startGame = () => {
        emitStartGame(game.idGame)
    }

    return (
        <div className="starting">
            {
                game.createdBy === user.username ? (
                    <>
                    <h3>Son {game.gamer.length + 1} Jugadores en espera</h3>
                    <button onClick={startGame}>Comenzar Ahora</button>
                    </>
                ) : (
                    <h3>Son {game.gamer.length + 1} Jugadores en espera</h3>
                )
            }
        </div>
    )
}

export default Starting
