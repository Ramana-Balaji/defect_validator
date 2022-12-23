import axios from "axios";

const apiDomain = process.env.REACT_APP_SERVER_URL;
axios.defaults.baseURL = apiDomain;

export { apiDomain };
