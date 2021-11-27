
export const attackerReducer = (state = null, action) => {
    switch(action.type) {
        case "SET_ATTACKER":
            return action.payload;
        default:
            return state;
    }
}