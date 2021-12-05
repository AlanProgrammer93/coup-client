import React, { useState } from 'react'
import { useSelector } from 'react-redux';

import { emitLostGame } from '../../utils/socket';
import Message from '../MessageFeedback/Message';

import './EndGameOption.css';

const EndGameOption = () => {
    const [error, setError] = useState('')
    const { user, game } = useSelector((state) => ({ ...state }));

    const endGame = () => {
        console.log("Salir");
        if(game.turn !== user.username) {
            setError('No es tu turno. Puedes salir de la partida en tu turno.')
            return
        }
        emitLostGame(game.idGame, user.username)
    }

    return (
        <>
        {error && <Message msg={error} setError={setError} />}
        <div
            onClick={endGame}
            className="endGameOption"
        >
            X
        </div>
        </>
    )
}

export default EndGameOption
