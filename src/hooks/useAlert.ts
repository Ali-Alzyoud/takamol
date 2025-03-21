import { useIonAlert } from "@ionic/react";
import { AxiosError } from "axios";
import { useTranslation } from "react-i18next";
import { ApiError } from "../types/api";

export const useAlert = () => {
  const [presentAlert] = useIonAlert();
  const { t } = useTranslation();

  const showAlert = (
    error: unknown,
    message = t("genericError"),
    header = t("genericErrorTitle")
  ) => {
    if (
      error instanceof AxiosError &&
      (error as AxiosError<ApiError>)?.response?.data?.errors?.[0]?.detail
    ) {
      message =
        (error as AxiosError<ApiError>)?.response?.data?.errors?.[0]?.detail ||
        message;
    }
    presentAlert({
      header,
      message,
      buttons: [{ text: t("cancel"), role: "cancel" }],
    });
  };

  return { showAlert };
};
