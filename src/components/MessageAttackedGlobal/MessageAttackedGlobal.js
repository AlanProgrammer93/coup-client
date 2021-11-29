import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { emitAllow, emitBlockCard, emitLostCard } from '../../utils/socket';

import './MessageAttackedGlobal.css'

const MessageAttackedGlobal = () => {
    const { game, user, attackerGlobal } = useSelector((state) => ({ ...state }));
    const [time, setTime] = useState(8)

    const dispatch = useDispatch()

    useEffect(() => {
        if(time > 0) {
            setTimeout(() => setTime(time - 1), 1000)
        } else {
            dispatch({
                type: 'SET_ATTACKER_GLOBAL',
                payload: null
            });
            emitAllow(game.idGame, user.username, attackerGlobal.attackedBy, attackerGlobal.card)
        }
    }, [time])

    const distrust = () => {
        var userAttacker = game.gamer.filter(
            (u) => u.user == attackerGlobal.attackedBy
        );
        var cardExist = userAttacker[0].cards.filter(
            (c) => c == attackerGlobal.card
        );
        
        if(!cardExist[0]) {
            emitLostCard(game.idGame, attackerGlobal.attackedBy)
            dispatch({
                type: 'SET_ATTACKER_GLOBAL',
                payload: null
            });
        } else {
            //emitLostCard(game.idGame, user.username)
            dispatch({
                type: 'SET_ATTACKER_GLOBAL',
                payload: null
            });
            dispatch({
                type: 'LOST_CARD',
                payload: {
                    variable: 'lostCard'
                }
            });
        }
    }

    const block = () => {
        emitBlockCard('duque', game.idGame, attackerGlobal.attackedBy, user.username)
        dispatch({
            type: 'SET_ATTACKER_GLOBAL',
            payload: null
        });
    }

    return (
        <div className="attackedGlobal">
            <span>Permitir en {time}</span>
            {`${attackerGlobal.attackedBy} esta usando ${attackerGlobal.card}`}
            <div style={{ display: 'flex'}}>
                <button onClick={distrust}>Desconfio</button>
                {
                    attackerGlobal.card === 'embajador'
                     && <button onClick={block}>Tengo el Duque</button>
                }
            </div>
        </div>
    )
}

export default MessageAttackedGlobal
