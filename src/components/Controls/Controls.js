import React, { useState } from 'react'
import { useSelector } from 'react-redux';

import data from '../../cards.json';
import { emitTakeMoney } from '../../utils/socket';
import Message from '../MessageFeedback/Message';

import './Controls.css'

const Controls = () => {
    const { user, game } = useSelector((state) => ({ ...state }));
    const [showMenu, setShowMenu] = useState(false)
    const [error, setError] = useState('')

    const takeMoney = () => {
        console.log("ejecutando");
        if(game.turn !== user.username) {
            setError('No es tu turno')
            return
        }
        emitTakeMoney(game.idGame, user.username)
        game.myUser.money.push(1)
        console.log(game);
    }

    return (
        <>
            {error && <Message msg={error} setError={setError} />}
            <div className="home__controls">
                <div className="home__controls-money">
                    {
                        game && game.myUser.money.map(mon => (
                            <div className="money"></div>
                        ))
                    }
                </div>
                <div className="home__controls-cards">
                    {
                        game && game.myUser.cards.map(card => (
                            <div className="home__controls-card">
                                <img src={`/cards/${card}.png`} />
                                <div className="detail-card">
                                    <p>{card}</p>
                                    <span>{data[card]}</span>
                                </div>

                            </div>
                        ))
                    }

                </div>
                <div className="home__controls-bottons">
                    <button onClick={takeMoney}>Tomar Moneda</button>
                    <button onClick={() => setShowMenu(!showMenu)}>Jugar</button>
                </div>
            </div>
            {
                showMenu 
                    ? game.turn === user.username ? (
                            <div className="optionGame">
                                <button>Tengo el Capitan</button>
                                <button>Tengo el Embajador</button>
                                <button>Tengo la Condesa</button>
                                <button>Tengo el Duque</button>
                                <button>Tengo la Asesina</button>
                                <button>COUP</button>
                            </div>
                        ) : (
                            <div className="optionGame">
                                <button>Tengo el Capitan</button>
                                <button>Tengo el Embajador</button>
                                <button>Tengo la Condesa</button>
                                <button>Tengo el Duque</button>
                            </div>
                        )
                    : ''
            }
        </>
    )
}

export default Controls
