import { get } from "lodash";
import { createSelector } from "reselect";

const defectValidatorDetails = (state) => state.defectValidator;

const isLoading = createSelector(defectValidatorDetails, (props) =>
  get(props, "loading", false)
);
const getError = createSelector(defectValidatorDetails, (props) =>
  get(props, "error", "")
);
const getSuccessMessage = createSelector(defectValidatorDetails, (props) =>
  get(props, "successMessage", "")
);
const getDefectValidatorRows = createSelector(defectValidatorDetails, (props) =>
  get(props, "rowsDatas", [])
);

export { isLoading, getError, getSuccessMessage, getDefectValidatorRows };
