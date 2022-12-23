import { put, takeLatest, all, call } from "redux-saga/effects";
import defectValidatorActions from "../actions/defectValidator.actions";
import {
  SAVE_DEFECT_VALIDATOR_DATA,
  FETCH_DEFECT_VALIDATOR,
} from "../actions/types";
import {
  sendDefectValidatorService,
  getDefectValidatorService,
} from "../services/defectValidator.service";

function* saveDefectValidator({ data }) {
  try {
    yield put(defectValidatorActions.requestSaveDefectValidatorSheet());
    yield call(() => sendDefectValidatorService(data));
    yield put(defectValidatorActions.successSaveDefectValidatorSheet());
  } catch (error) {
    yield put(defectValidatorActions.failureSaveDefectValidatorSheet(error));
  }
}

function* getDefectValidator() {
  try {
    yield put(defectValidatorActions.requestFetchDefectValidator());
    const listDefectValidatorData = yield call(() => getDefectValidatorService());
    yield put(defectValidatorActions.successFetchDefectValidator(listDefectValidatorData));
  } catch (error) {
    yield put(defectValidatorActions.failureFetchDefectValidator(error));
  }
}

export default function* actionWatcher() {
  yield all([
    yield takeLatest(SAVE_DEFECT_VALIDATOR_DATA.SAVE_DEFECT_VALIDATOR, saveDefectValidator),
    yield takeLatest(
      FETCH_DEFECT_VALIDATOR.FETCH_DEFECT_VALIDATOR,
      getDefectValidator
    ),
  ]);
}
