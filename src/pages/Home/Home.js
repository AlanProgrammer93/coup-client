import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import Controls from '../../components/Controls/Controls'
import Main from '../../components/Main/Main'
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
            {game && console.log(game)}
            <Main />
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
