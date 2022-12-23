import {
  SAVE_DEFECT_VALIDATOR_DATA,
  FETCH_DEFECT_VALIDATOR,
} from "./types";

const saveDefectValidatorSheet = (data) => ({
  type: SAVE_DEFECT_VALIDATOR_DATA.SAVE_DEFECT_VALIDATOR, data
});
const requestSaveDefectValidatorSheet = () => ({
  type: SAVE_DEFECT_VALIDATOR_DATA.REQUEST_SAVE_DEFECT_VALIDATOR
});
const successSaveDefectValidatorSheet = () => ({
  type: SAVE_DEFECT_VALIDATOR_DATA.SUCCESS_SAVE_DEFECT_VALIDATOR,
});
const failureSaveDefectValidatorSheet = () => ({
  type: SAVE_DEFECT_VALIDATOR_DATA.FAILURE_SAVE_DEFECT_VALIDATOR,
});

const fetchDefectValidator = () => ({
  type: FETCH_DEFECT_VALIDATOR.FETCH_DEFECT_VALIDATOR
});
const requestFetchDefectValidator = () => ({
  type: FETCH_DEFECT_VALIDATOR.REQUEST_FETCH_DEFECT_VALIDATOR
});
const successFetchDefectValidator = (allData) => ({
  type: FETCH_DEFECT_VALIDATOR.SUCCESS_FETCH_DEFECT_VALIDATOR,
  allData,
});
const failureFetchDefectValidator = () => ({
  type: FETCH_DEFECT_VALIDATOR.FAILURE_FETCH_DEFECT_VALIDATOR,
});

export default {
  saveDefectValidatorSheet,
  requestSaveDefectValidatorSheet,
  successSaveDefectValidatorSheet,
  failureSaveDefectValidatorSheet,
  fetchDefectValidator,
  requestFetchDefectValidator,
  successFetchDefectValidator,
  failureFetchDefectValidator,
};
