import axios from "axios";

const instance = axios.create({
  baseURL: "http://mobe.publicvm.com:81/api",
  /* baseURL: "http://mobe.local/api", */
});

export default instance;
