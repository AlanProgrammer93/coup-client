import socketClient from 'socket.io-client';

let socket;

const SERVER = 'http://localhost:5000';

export const init = (setGames, dispatch) => {
    socket = socketClient(SERVER);

    /* socket.emit('mostrarID'); 
    socket.on('mostrando', (data) => {
        console.log(data);
    });  */

    socket.on('gameCreated', (data) => {
        setGames(data)
    });

    // emitGetGame
    socket.on('getGame', (data) => {
        let dataGame = data;
        const myUser = data.gamer.filter(
            (g) => g.connectionId == socket.id
        );
        const otherUsers = data.gamer.filter(
            (g) => g.connectionId != socket.id
        );
        dataGame.gamer = otherUsers
        dataGame.myUser = myUser[0]

        dispatch({
            type: 'GET_GAME',
            payload: dataGame
        });
    });

    socket.on('attacked', (data) => {
        dispatch({
            type: 'SET_ATTACKER',
            payload: data
        });
    });

    socket.on('attackedGlobal', (data) => {
        dispatch({
            type: 'SET_ATTACKER_GLOBAL',
            payload: data
        });
    });

    socket.on('blocked', (data) => {
        switch (data.card) {
            case 'capitan':
                console.log("BLOQUEADO POR CAPITAN DE ", data.blockedBy);
                dispatch({
                    type: 'SET_BLOCKER',
                    payload: data
                });
                break;
        
            case 'embajador':
                console.log("BLOQUEADO POR EMBAJADOR DE ", data.blockedBy);
                break;

            case 'condesa':
                console.log("BLOQUEADO POR CONDESA DE ", data.blockedBy);
                dispatch({
                    type: 'SET_BLOCKER',
                    payload: data
                });
                break;

            case 'duque':
                console.log("BLOQUEADO POR DUQUE DE ", data.blockedBy);
                dispatch({
                    type: 'SET_BLOCKER',
                    payload: data
                });
                break;

            default:
                break;
        }
    });

    socket.on('lostCard', () => {
        dispatch({
            type: 'LOST_CARD',
            payload: {
                variable: 'lostCard'
            }
        });
    });

    socket.on('descartOneCard', (data) => {
        dispatch({
            type: 'DESCART_CARD',
            payload: data
        });
    });

    socket.on('lostGame', (data) => {
        dispatch({
            type: 'RESULT',
            payload: 'lost'
        });
    });

    socket.on('win', (data) => {
        dispatch({
            type: 'RESULT',
            payload: 'win'
        });
    });
    
}

export const emitOpenGame = (username, idGame) => {
    socket.emit('createGame', { username, idGame });
}

export const emitGetGame = (idGame, username) => {
    socket.emit('getGame', { idGame, username });
}

export const emitJoinGame = (username, idGame) => {
    socket.emit('joinGame', { username, idGame });
}

export const emitStartGame = (idGame) => {
    socket.emit('startGame', { idGame });
}

// FUNTIONS GAME
export const emitTakeMoney = (idGame, username) => {
    socket.emit('takeMoney', { idGame, username });
}

export const emitUseCard = (card, idGame, username, attacker) => {
    socket.emit('useCard', { card, idGame, username, attacker});
}
// Embajador y Duque
export const emitUseCardGlobal = (card, idGame, attacker) => {
    socket.emit('useCardGlobal', { card, idGame, attacker});
}
export const emitReturnCardAmbassador = (data) => {
    socket.emit('useReturnCardAmbassador',  data );
}


export const emitBlockCard = (card, idGame, attacker, blocker) => {
    socket.emit('blockCard', { card, idGame, attacker, blocker});
}
export const emitAllow = (idGame, attacked, attackedBy, card) => {
    socket.emit('allow', { idGame, attacked, attackedBy, card});
}

export const emitAllowBlock = (idGame, attacked, attackedBy, card) => {
    socket.emit('allowBlock', { idGame, attacked, attackedBy, card});
}
export const emitLostCard = (idGame, loser) => {
    socket.emit('lostCard', { idGame, loser});
}
export const emitLostCardSelected = (idGame, loser, card) => {
    socket.emit('lostCardSelected', { idGame, loser, card});
}


export const emitLostGame = (idGame, loser) => {
    socket.emit('endGame', { idGame, loser });
}
