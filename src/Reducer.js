export const initialState = {
    user: null,
    predictions: [],
};

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "CREATE_USER":
            return { ...state, user: action.user };
        default:
            return state;
    }
};
