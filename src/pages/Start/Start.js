import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { emitDeleteGame, emitGetGames, emitJoinGame, emitOpenGame, init } from '../../utils/socket'

import './Start.css'

const Start = () => {
    const history = useNavigate()

    const [myGame, setMyGame] = useState('')

    const { user, games } = useSelector((state) => ({ ...state }));

    const dispatch = useDispatch()

    useEffect(() => {
        init(dispatch);
        emitGetGames()
        // obtener games
        const currentGame = localStorage.getItem('currentGame');
        if (currentGame) {
            setMyGame(currentGame);
        }
        // eslint-disable-next-line
    }, [])

    const openGame = () => {
        const idGame = Math.floor(Math.random() * 100000000);
        setMyGame(idGame);
        localStorage.setItem('currentGame', idGame)
        emitOpenGame(user.username, idGame);
    }

    const endGame = () => {
        localStorage.removeItem('currentGame')
        emitDeleteGame(user.username, myGame)
        setMyGame('');
    }

    const startGame = (idGame) => {
        history(`/${idGame}`)
    }

    const joinGame = (idGame) => {
        emitJoinGame(user.username, idGame);
        setMyGame(localStorage.setItem('currentGame', idGame));
        localStorage.setItem('state', 'playing')
        history(`/${idGame}`)
    }

    return (
        <div className="start">

            <button
                onClick={openGame}
                className="openButton"
                disabled={myGame}
            >
                Abrir Partida
            </button>
            {console.log(games)}
            <div className="start__list">
                {
                    myGame ? (
                        <div key={myGame} className="container-games" style={{ borderBottom: '1px solid #2b2b2b' }}>
                            <div className="container__info">
                                <h2>Tu Juego</h2>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <button onClick={() => startGame(myGame)} className="btn-start">Iniciar</button>
                                <button onClick={endGame} className="btn-end">Cancelar</button>
                            </div>
                        </div>
                    ) : (
                        ''
                    )
                }

                {
                    games && games.filter(game => game.idGame !== myGame).map((game, index) => (
                        <div className="container-games" key={index}>
                            <div className="container__info">
                                <h2>{game.createdBy}</h2>
                            </div>
                            {
                                !myGame ? (
                                    <button 
                                        onClick={() => joinGame(game.idGame)} 
                                        className="btn-start"
                                    >
                                        Unirse
                                    </button>
                                ) : ''
                            }
                        </div>
                    ))
                }

            </div>
        </div>
    )
}

export default Start
