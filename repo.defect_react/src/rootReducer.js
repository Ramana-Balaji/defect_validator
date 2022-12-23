import { combineReducers } from "redux";
import defectValidatorReducer from "../src/reducers/defectValidator.reducer";

const rootReducer = combineReducers({
  defectValidator: defectValidatorReducer,
});

export default rootReducer;