
export const attackerGlobalReducer = (state = null, action) => {
    switch(action.type) {
        case "SET_ATTACKER_GLOBAL":
            return action.payload;
        default:
            return state;
    }
}