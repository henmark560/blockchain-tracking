import axios from "axios";

const server = axios.create({
  baseURL: "https://courier-server.onrender.com:8000",
});

export default server;
