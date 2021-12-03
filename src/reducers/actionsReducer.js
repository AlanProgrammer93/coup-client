
export const actionsReducer = (state = null, action) => {
    switch(action.type) {
        case "SET_ACTION":
            return action.payload;
        default:
            return state;
    }
}