import axios from "axios";

const server = axios.create({
  baseURL: "https://courier-server.onrender.com",
});

export default server;
