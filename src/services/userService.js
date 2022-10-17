import axios from "../utils/axios";

const handleLogin = (username, password) => {
  return axios.post("/api/login", { username, password });
};

export { handleLogin };
