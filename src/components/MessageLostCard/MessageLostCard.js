import React from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { emitLostCardSelected } from '../../utils/socket';

import './MessageLostCard.css'

const MessageLostCard = () => {
    const { user, game, attacker } = useSelector((state) => ({ ...state }));
    const dispatch = useDispatch()

    const deleteCard = (card) => {
        /* if(attacker.card === 'asesina') {
            emitLostCardSelected(game.idGame, user.username, card)
            dispatch({
                type: 'LOST_CARD',
                payload: null
            });
        } */
        console.log("Eliminste a ", card);
        emitLostCardSelected(game.idGame, user.username, card)
        dispatch({
            type: 'LOST_CARD',
            payload: null
        });
    }

    return (
        <div className="lostCard">
            <p>Elimina una carta</p>
            <div className="cards">
                {
                    game && game.myUser.cards.map(card => (
                        <button className="card" onClick={() => deleteCard(card)}>
                            {card}
                        </button>
                    ))
                }
            </div>
        </div>
    )
}

export default MessageLostCard
