
export const descartCardReducer = (state = null, action) => {
    switch(action.type) {
        case "DESCART_CARD":
            return action.payload;
        default:
            return state;
    }
}