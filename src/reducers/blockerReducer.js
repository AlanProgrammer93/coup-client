
export const blockerReducer = (state = null, action) => {
    switch(action.type) {
        case "SET_BLOCKER":
            return action.payload;
        default:
            return state;
    }
}