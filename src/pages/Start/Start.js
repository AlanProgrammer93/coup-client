import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { emitJoinGame, emitOpenGame, init } from '../../utils/socket'

import './Start.css'

const Start = () => {
    const history = useNavigate()

    const [myGame, setMyGame] = useState('')
    const [games, setGames] = useState([]);

    const { user } = useSelector((state) => ({ ...state }));

    const dispatch = useDispatch()

    useEffect(() => {
        init(setGames, dispatch);
        // obtener games
        const currentGame = localStorage.getItem('currentGame');
        if (currentGame) {
            setMyGame(currentGame);
        }
    }, [])

    const openGame = () => {
        const idGame = Math.floor(Math.random() * 100000000);
        setMyGame(idGame);
        localStorage.setItem('currentGame', idGame)
        emitOpenGame(user.username, idGame);
    }

    const endGame = () => {
        localStorage.removeItem('currentGame')
        // falta eliminar idGame del server
        setMyGame('');
    }

    const startGame = (idGame) => {
        history(`/${idGame}`)
    }

    const joinGame = (idGame) => {
        emitJoinGame(user.username, idGame);
        setMyGame(localStorage.setItem('currentGame', idGame));
        // PROBAR SI ANDA PLAYING
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

            <div className="start__list">
                {
                    myGame ? (
                        <div key={myGame} className="container" style={{ borderBottom: '1px solid #2b2b2b' }}>
                            <div className="container__info">
                                <h2>{myGame}</h2>
                                {games && games.filter(game => game.idGame == myGame).map(g => <p>{g.gamer.length}</p>)}
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
                    games && games.filter(game => game.idGame != myGame).map((game, index) => (
                        <div className="container" key={index}>
                            <div className="container__info">
                                <h2>{game.idGame}</h2>
                                <p>({game.gamer.length})</p>
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
