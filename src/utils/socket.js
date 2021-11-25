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
        console.log("juego creado ", data);
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

    // Listening Event
    /* socket.on("inform_others_about_me", function (data) {
       
       setNewConnection(data.connectionId, SDP_function);
       setUsers(values => [...values, data])
   }); */
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

export const emitTakeMoney = (idGame, username) => {
    socket.emit('takeMoney', { idGame, username });
}