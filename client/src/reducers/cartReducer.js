const initialState =
{
    id: 0,
    price: 0,
    count: 0,
    name: "Arpit",
    email: "Arpit@gmail.com",
    image: "https://picsum.photos/200/300",
    description: "NONE"
};


const UpdateCart = (state = initialState, action) => {
    console.log("In Update Cart ");
    console.log(action.payload);
    switch (action.type) {
        case "addproduct":
            return {
                ...state,
                name: action.payload.name,
                price: action.payload.price,
                count: state.count + 1,
                email: action.payload.email,
                image: action.payload.image,
                description: action.payload.description
            };
        case "minusproduct":
            return {
                ...state,
                name: action.payload.name,
                price: action.payload.price,
                count: state.count - 1,
                email: action.payload.email,
                image: action.payload.image,
                description: action.payload.description
            }
        default:
            return state;
    }
}

export { UpdateCart };