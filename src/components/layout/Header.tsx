import { IonActionSheet, IonButton, IonIcon } from "@ionic/react";
import { useTranslation } from "react-i18next";
import { useAuthStore } from "../../store/auth";

export default function MainHeader() {
  const { t } = useTranslation();
  const { logout } = useAuthStore();
  return (
    <>
      <IonButton id="open-action-sheet" fill="clear">
        <IonIcon icon={"/assets/images/icons/gear.svg"} />
      </IonButton>
      <IonActionSheet
        trigger="open-action-sheet"
        header={t("auth.logoutHeader")}
        buttons={[
          {
            text: t("auth.logout"),
            role: 'destructive',
            data: {
              action: 'delete',
            },
            handler: async () => {
              await logout();
            },
          },
          {
            text: t("cancel"),
            role: 'cancel',
            data: {
              action: "cancel",
            },
          },
        ]}
      ></IonActionSheet>
    </>
  );
}