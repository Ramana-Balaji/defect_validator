import {
  sendPostRequest,
  sendGetRequest,
} from "./api";
import { MSG_FAILED_SAVE } from "../config/constants";

export const sendDefectValidatorService = async (jsonData) => {
  const reqUrl = "http://localhost:3001/dashboard/defect-validator";
  await sendPostRequest(reqUrl, jsonData, MSG_FAILED_SAVE);
};
export const getDefectValidatorService = async () => {
  const reqUrl = "http://localhost:3001/dashboard/defect-validator";
  const params = {};
  const { data } = await sendGetRequest(reqUrl, params, MSG_FAILED_SAVE);
  return data;
};
