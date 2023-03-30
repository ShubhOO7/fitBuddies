const initialState = {
    comment: [],
    login: false,
    // name:"Arpit",
    email: "Arpit@gmail.com",
    image: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
};


export const rootReducer = (state = initialState, action) => {
    console.log(action.payload)
    switch (action.type) {
        case "addcomment":
            return {
                ...state,
                comment: action.payload
            };
        case "signin":
            return {
                ...state,
                login: true,
                name: action.payload.name,
                email: action.payload.email
            }
        default:
            return state;
    }
}
