export const initialState = {
    user: null,
    predictions: [],
};

export const reducer = (state = initialState, action) => {
    console.log(action);
    switch (action.type) {
        case "CREATE_USER":
            return { ...state, user: action.user };
        case "REMOVE_USER":
            return { ...state, user: null };
        default:
            return state;
    }
};
