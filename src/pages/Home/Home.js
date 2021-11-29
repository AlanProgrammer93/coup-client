import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import Controls from '../../components/Controls/Controls'
import DescartOneCard from '../../components/DescartOneCard/DescartOneCard';
import Main from '../../components/Main/Main'
import MessageAttacked from '../../components/MessageAttacked/MessageAttacked';
import MessageAttackedGlobal from '../../components/MessageAttackedGlobal/MessageAttackedGlobal';
import MessageBlocked from '../../components/MessageBlocked/MessageBlocked';
import MessageGame from '../../components/MessageGame/MessageGame';
import MessageLost from '../../components/MessageLost/MessageLost';
import MessageLostCard from '../../components/MessageLostCard/MessageLostCard';
import MessageWin from '../../components/MessageWin/MessageWin';
import Starting from '../../components/Starting/Starting';
import { emitGetGame } from '../../utils/socket';

import "./Home.css"

const Home = () => {
    const param = useParams();
    const idGame = param.idGame;

    const { user, game, attacker, attackerGlobal, blocker, variables, result, descart } = useSelector((state) => ({ ...state }));

    useEffect(() => {
        emitGetGame(idGame, user.username);
    }, [])

    return (
        !result ? (
            <div className="home">
                {console.log(attacker)}
                {
                    game && game.state === 'initial' ? '' : game?.turn === user.username ? (
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
                    descart && (<DescartOneCard />)
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
        ) : result === 'lost'
            ? (<MessageLost />)
            : (<MessageWin />)

    )
}

export default Home
