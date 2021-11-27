export const resultReducer = (state = null, action) => {
    switch(action.type) {
        case "RESULT":
            return action.payload;
        
        default:
            return state;
    }
}