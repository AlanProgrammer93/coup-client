import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import Controls from '../../components/Controls/Controls'
import Main from '../../components/Main/Main'
import MessageGame from '../../components/MessageGame/MessageGame';
import Starting from '../../components/Starting/Starting';
import { emitGetGame } from '../../utils/socket';

import "./Home.css"

const Home = () => {
    const param = useParams();
    const idGame = param.idGame;

    const { user, game } = useSelector((state) => ({ ...state }));

    useEffect(() => {
        emitGetGame(idGame, user.username);
    }, [])

    return (
        <div className="home">
            {
                game && game.state === 'initial' ? '' : game?.turn === user.username ? (
                    <MessageGame msg="Tu Turno" />
                ) : (
                    <MessageGame msg={`Turno de ${game && game?.turn}`} />
                )
            }
            <Main />
            {console.log(game)}
            <Controls />
            {
                game && game.state === 'initial' && (
                    <Starting />
                ) 
            }
        </div>
    )
}

export default Home
