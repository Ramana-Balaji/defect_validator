import {
  SAVE_DEFECT_VALIDATOR_DATA,
  FETCH_DEFECT_VALIDATOR,
} from "../actions/types";

const initialState = {
  loading: false,
  error: "",
  successMessage: "",
  rowsDatas: [],
};

const defectValidatorReducer = (state = initialState, action) => {
  switch (action.type) {

    case SAVE_DEFECT_VALIDATOR_DATA.SAVE_DEFECT_VALIDATOR:
      return {
        ...state,
        loading: true,
        error: "",
        successMessage: "",
      };
    case SAVE_DEFECT_VALIDATOR_DATA.REQUEST_SAVE_DEFECT_VALIDATOR:
      return { ...state, loading: true, error: "" };
    case SAVE_DEFECT_VALIDATOR_DATA.SUCCESS_SAVE_DEFECT_VALIDATOR:
      return {
        ...state,
        loading: false,
        successMessage: action.successMessage,
      };
    case SAVE_DEFECT_VALIDATOR_DATA.FAILURE_SAVE_DEFECT_VALIDATOR:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    case FETCH_DEFECT_VALIDATOR.FETCH_DEFECT_VALIDATOR:
      return {
        ...state,
        loading: true,
        error: "",
        successMessage: "",
        rowsDatas: [],
      };
    case FETCH_DEFECT_VALIDATOR.REQUEST_FETCH_DEFECT_VALIDATOR:
      return { ...state, loading: true, error: "", rowsDatas: [] };
    case FETCH_DEFECT_VALIDATOR.SUCCESS_FETCH_DEFECT_VALIDATOR:
      return {
        ...state,
        loading: false,
        successMessage: action.successMessage,
        rowsDatas: action.allData,
      };
    case FETCH_DEFECT_VALIDATOR.FAILURE_FETCH_DEFECT_VALIDATOR:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    default:
      return state;
  }
};

export default defectValidatorReducer;
