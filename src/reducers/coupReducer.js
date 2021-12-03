
export const coupReducer = (state = null, action) => {
    switch(action.type) {
        case "SET_COUP":
            return action.payload;
        default:
            return state;
    }
}