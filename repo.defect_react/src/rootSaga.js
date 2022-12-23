import { all } from "redux-saga/effects";
import defectValidatorSaga from "../src/sagas/defectValidator.saga";
export default function* rootSaga() {
  yield all([defectValidatorSaga()]);
}
