import { UpdateUser } from "./SignInReducer";
import { UpdateCart } from "./cartReducer";

import { combineReducers } from "redux";

const rootReducer = combineReducers({
    UpdateUser: UpdateUser,
    UpdateCart: UpdateCart
})

export default rootReducer;