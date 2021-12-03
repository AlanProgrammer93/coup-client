import React from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { emitLostCardSelected } from '../../utils/socket';

import './MessageCoup.css'

const MessageCoup = () => {
    const { user, game, coup } = useSelector((state) => ({ ...state }));
    const dispatch = useDispatch()

    const deleteCard = (card) => {
        // aqui ver si tiene una carta, si es asi emitir endGame
        emitLostCardSelected(game.idGame, user.username, card)
        dispatch({
            type: 'SET_COUP',
            payload: null
        });
    }

    return (
        <div className="coup">
            <h3>{`${coup.attackedBy} esta usando COUP`}</h3>
            <p>Elimina una carta</p>
            <div className="cards">
                {
                    game && game.myUser.cards.map((card, index) => (
                        <button 
                            key={index} 
                            className="card"
                            onClick={() => deleteCard(card)}
                        >
                            {card}
                        </button>
                    ))
                }
            </div>
        </div>
    )
}

export default MessageCoup
