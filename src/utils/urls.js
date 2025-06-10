import axios from "axios";
import { getItem } from "./storage";

export const EmailRegix = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

const instance = axios.create({
  baseURL: "https://vertically-welcome-mongrel.ngrok-free.app/api/",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;
