import {combineReducers} from 'redux';

import { attackerReducer } from './attackerReducer';
import { blockerReducer } from './blockerReducer';
import { gameReducer } from './gameReducer';
import { resultReducer } from './resultReducer';
import {userReducer} from './userReducer'
import { variableReducer } from './variableReducer';

const rootReducer = combineReducers({
    user: userReducer,
    game: gameReducer,
    attacker: attackerReducer,
    blocker: blockerReducer,
    variables: variableReducer,
    result: resultReducer,
});

export default rootReducer;
