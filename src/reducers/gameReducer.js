export const gameReducer = (state = null, action) => {
    switch(action.type) {
        case "GET_GAME":
            return action.payload;
        default:
            return state;
    }
}