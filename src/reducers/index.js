import {combineReducers} from 'redux';
import { gameReducer } from './gameReducer';
import {userReducer} from './userReducer'

const rootReducer = combineReducers({
    user: userReducer,
    game: gameReducer,
});

export default rootReducer;
