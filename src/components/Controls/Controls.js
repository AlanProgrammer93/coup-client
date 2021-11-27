import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import data from '../../cards.json';
import { emitAllow, emitBlockCard, emitTakeMoney, emitUseCard } from '../../utils/socket';
import Message from '../MessageFeedback/Message';
import SelectOponent from '../SelectOponent/SelectOponent';

import './Controls.css'

const Controls = () => {
    const { user, game, attacker } = useSelector((state) => ({ ...state }));
    const dispatch = useDispatch()

    const [showMenu, setShowMenu] = useState(false)
    const [error, setError] = useState('')
    const [selectOponent, setSelectOponent] = useState(false)
    const [cardSelected, setCardSelected] = useState('')

    const takeMoney = () => {
        if(game.turn !== user.username) {
            setError('No es tu turno')
            return
        }
        emitTakeMoney(game.idGame, user.username)
    }

    const playCard = (card) => {
        if (game.gamer.length === 1) {
            switch (card) {
                case 'capitan':
                    console.log("CAPITAN");
                    emitUseCard('capitan', game.idGame, game.gamer[0].user, user.username)
                    break;
            
                case 'embajador':
                    console.log("EMBAJADOR");
                    break;

                case 'asesina':
                    if(game.myUser.money.length > 2){
                        console.log("ASESINA");

                        emitUseCard('asesina', game.idGame, game.gamer[0].user, user.username)
                        return
                    }
                    console.log("no puedes usar, faltan monedas");
                    break;

                default:
                    break;
            }
        } else {
            setCardSelected(card)
            setSelectOponent(true)
        }
    }

    const blockCard = (card) => {
        switch (card) {
            case 'capitan':
                emitBlockCard('capitan', game.idGame, attacker.attackedBy, user.username)
                dispatch({
                    type: 'SET_ATTACKER',
                    payload: null
                });
                break;
        
            case 'embajador':
                emitBlockCard('embajador', game.idGame, attacker.attackedBy, user.username)
                dispatch({
                    type: 'SET_ATTACKER',
                    payload: null
                });
                break;
            case 'condesa':
                emitBlockCard('condesa', game.idGame, attacker.attackedBy, user.username)
                dispatch({
                    type: 'SET_ATTACKER',
                    payload: null
                });
                break;

            default:
                break;
        }
    }

    const allow = () => {
        if(attacker.card === 'asesina') {
            dispatch({
                type: 'SET_ATTACKER',
                payload: null
            });

            dispatch({
                type: 'LOST_CARD',
                payload: {
                    variable: 'lostCard'
                }
            });
            return
        }

        emitAllow(game.idGame, user.username, attacker.attackedBy, attacker.card)
        dispatch({
            type: 'SET_ATTACKER',
            payload: null
        });
    }

    return (
        <>
            {selectOponent && <SelectOponent gamers={game.gamer} />}
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
                                <button onClick={() => playCard('capitan')}>Tengo el Capitan</button>
                                <button onClick={() => playCard('embajador')}>Tengo el Embajador</button>
                                <button onClick={() => playCard('duque')}>Tengo el Duque</button>
                                <button onClick={() => playCard('asesina')}>Tengo la Asesina</button>
                                <button>COUP</button>
                            </div>
                        ) : (
                            <div className="optionGame">
                                {
                                    attacker 
                                        ? attacker.card === 'capitan' 
                                            ? (
                                                <>
                                                <button onClick={() => blockCard('capitan')}>Tengo el Capitan</button>
                                                <button onClick={() => blockCard('embajador')}>Tengo el Embajador</button>
                                                <button>Desconfio</button>
                                                <button onClick={allow}>Permitir</button>
                                                </>
                                            ) 
                                            : attacker.card === 'asesina' 
                                                ? (
                                                    <>
                                                    <button onClick={() => blockCard('condesa')}>Tengo la Condesa</button>
                                                    <button>Desconfio</button>
                                                    <button onClick={allow}>Permitir</button>
                                                    </>
                                                )
                                                : attacker.card === 'duque' 
                                                    ? (
                                                        <>
                                                        <button>Desconfio</button>
                                                        <button>Permitir</button>
                                                        </>
                                                    )
                                                    :  attacker.card === 'embajador' && (
                                                        <>
                                                        <button>Tengo el Duque</button>
                                                        <button>Desconfio</button>
                                                        <button>Permitir</button>
                                                        </>
                                                    )

                                        : (
                                            <>
                                            <button>Tengo el Capitan</button>
                                            <button>Tengo el Embajador</button>
                                            <button>Tengo la Condesa</button>
                                            <button>Tengo el Duque</button>
                                            <button>Desconfio</button>
                                            </>
                                        )
                                }
                            </div>
                        )
                    : ''
            }
        </>
    )
}

export default Controls
