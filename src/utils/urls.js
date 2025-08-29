import axios from "axios";

export const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

// const url = "https://vertically-welcome-mongrel.ngrok-free.app/";
const url = "https://returnbuddies-production.up.railway.app/";

const instance = axios.create({
  baseURL: `${url}api/`,
  timeout: 100000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;

export const imageURl = url;
