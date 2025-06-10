import { showNotification } from "../components/Helpers/notifierHelper";

export const catchFun = () =>
  showNotification("error", "Status 500", "Try again later");
