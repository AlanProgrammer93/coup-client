import {combineReducers} from 'redux';

import { attackerGlobalReducer } from './attackerGlobalReducer';
import { attackerReducer } from './attackerReducer';
import { blockerReducer } from './blockerReducer';
import { descartCardReducer } from './descartCardReducer';
import { gameReducer } from './gameReducer';
import { resultReducer } from './resultReducer';
import {userReducer} from './userReducer'
import { variableReducer } from './variableReducer';

const rootReducer = combineReducers({
    user: userReducer,
    game: gameReducer,
    attacker: attackerReducer,
    attackerGlobal: attackerGlobalReducer,
    blocker: blockerReducer,
    variables: variableReducer,
    result: resultReducer,
    descart: descartCardReducer,
});

export default rootReducer;
