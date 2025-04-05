import { useIonAlert } from "@ionic/react";
import { useTranslation } from "react-i18next";
import { ApiError } from "../api";

export const useAlert = () => {
  const [presentAlert] = useIonAlert();
  const { t } = useTranslation();

  const showAlert = (
    error: unknown,
    message = t("genericError"),
    header = t("genericErrorTitle")
  ) => {

   if (error instanceof ApiError)
      message = error.message;
   
    presentAlert({
      header,
      message,
      buttons: [{ text: t("cancel"), role: "cancel" }],
    });
  };

  return { showAlert };
};
