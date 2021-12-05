import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';

import Controls from '../../components/Controls/Controls'
import DescartOneCard from '../../components/DescartOneCard/DescartOneCard';
import EndGameOption from '../../components/EndGameOption/EndGameOption';
import Instructions from '../../components/Instructions/Instructions';
import Main from '../../components/Main/Main'
import MessageAttacked from '../../components/MessageAttacked/MessageAttacked';
import MessageAttackedGlobal from '../../components/MessageAttackedGlobal/MessageAttackedGlobal';
import MessageBlocked from '../../components/MessageBlocked/MessageBlocked';
import MessageCoup from '../../components/MessageCoup/MessageCoup';
import MessageGame from '../../components/MessageGame/MessageGame';
import MessageLost from '../../components/MessageLost/MessageLost';
import MessageLostCard from '../../components/MessageLostCard/MessageLostCard';
import MessageWin from '../../components/MessageWin/MessageWin';
import Starting from '../../components/Starting/Starting';
import { emitGetGame, getSocket, init } from '../../utils/socket';

import "./Home.css"

const Home = () => {
    const param = useParams();
    const idGame = param.idGame;
    const history = useNavigate()

    const { 
        user, 
        game, 
        attacker, 
        attackerGlobal, 
        blocker, 
        variables, 
        result, 
        descart,
        coup 
    } = useSelector((state) => ({ ...state }));
    const dispatch = useDispatch()

    useEffect(() => {
        const token = localStorage.getItem('token');
        if(!token) {
            history('/login')
        }
        try {
            getSocket();
            
            emitGetGame(idGame, user?.username);
        } catch (error) {
            init(dispatch)
        }
        // eslint-disable-next-line
    }, [user])

    return (
        !result ? (
            <div className="home">
                {
                    game && game.state === 'initial' ? '' : game?.turn === user?.username ? (
                        <MessageGame msg="Tu Turno" />
                    ) : (
                        <MessageGame msg={`Turno de ${game && game?.turn}`} />
                    )
                }
                {
                    attacker && (<MessageAttacked />)
                }
                {
                    attackerGlobal && (<MessageAttackedGlobal />)
                }
                {
                    blocker && (<MessageBlocked />)
                }
                {
                    variables && (<MessageLostCard />)
                }
                {
                    coup && (<MessageCoup />)
                }
                {
                    descart && (<DescartOneCard />)
                }
                <EndGameOption />
                <Instructions position={'350px'} />
                <Main />
                <Controls />
                {
                    game && game.state === 'initial' && (
                        <Starting />
                    )
                }
            </div>
        ) : result === 'lost'
            ? (<MessageLost />)
            : (<MessageWin />)

    )
}

export default Home
