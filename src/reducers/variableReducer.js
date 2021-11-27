export const variableReducer = (state = null, action) => {
    switch(action.type) {
        case "LOST_CARD":
            return action.payload;
        default:
            return state;
    }
}
