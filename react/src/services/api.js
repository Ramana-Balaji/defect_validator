import axios from "axios";
import { get } from "lodash";
import {
  MSG_UNEXPECTED_ERROR,
  MSG_BAD_REQUEST,
} from "../config/constants";

const handleError = (error) => {
  let message = MSG_UNEXPECTED_ERROR;
  const errorMessage = get(error, "response.data.error", "");

  if (error.response) {
    // eslint-disable-next-line default-case
    switch (error.response.status) {
      case 400:
        message = MSG_BAD_REQUEST;
        break;

      case 500:
        message = errorMessage;
        break;
    }
  }
  return { code: get(error, "response.status", null), message };
};

export const sendPostRequest = (url, body, msg, headers = {}) => {
  return new Promise((resolve, reject) => {
    axios
      .post(url, body, { headers })
      .then((response) => {
        if (response.data.flag === "success") {
          resolve(response.data);
        } else if (response.data.flag === "error") {
          reject(msg);
        }
        resolve();
      })
      .catch((error) => {
        const message = handleError(error);
        reject(message);
      });
  });
};

export const sendGetRequest = (url, params, msg) => {
  return new Promise((resolve, reject) => {
    axios
      .get(url, { params })
      .then((response) => {
        if (response.data.flag === "success") {
          resolve(response.data);
        } else if (response.data.flag === "error") {
          reject(msg);
        }
        resolve();
      })
      .catch((error) => {
        const message = handleError(error);
        reject(message);
      });
  });
};

export const sendDeleteRequest = (url, msg) => {
  return new Promise((resolve, reject) => {
    axios
      .delete(url)
      .then((response) => {
        if (response.data.flag === "success") {
          resolve(response.data);
        } else if (response.data.flag === "error") {
          reject(msg);
        }
        resolve();
      })
      .catch((error) => {
        const message = handleError(error);
        reject(message);
      });
  });
};

export const sendPutRequest = (url, body, msg) => {
  return new Promise((resolve, reject) => {
    axios
      .put(url, body)
      .then((response) => {
        if (response.data.flag === "success") {
          resolve(response.data);
        } else if (response.data.flag === "error") {
          reject(msg);
        }
        resolve();
      })
      .catch((error, response) => {
        const message = handleError(error, response);
        reject(message);
      });
  });
};
