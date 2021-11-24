import React from 'react'
import { useSelector } from 'react-redux';

import data from '../../cards.json';

import './Controls.css'

const Controls = () => {
    const { game } = useSelector((state) => ({ ...state }));

    return (
        <div className="home__controls">
            {console.log(data['asesina'])}
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
                <button>Desconfio</button>
                <button>COOP</button>
            </div>
        </div>
    )
}

export default Controls
