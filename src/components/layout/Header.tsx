import { IonActionSheet, IonButton, IonIcon } from "@ionic/react";
import { useTranslation } from "react-i18next";
import { useAuthStore } from "../../store/auth";

export default function MainHeader() {
  const { t, i18n } = useTranslation();
  const { logout, } = useAuthStore();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'ar' ? 'en' : 'ar';
    i18n.changeLanguage(newLang);
    document.dir = newLang === 'ar' ? 'rtl' : 'ltr';
  };
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
            text: t('common.language'),
            role: 'selected',
            data: {
              action: 'language',
            },
            handler: toggleLanguage,
          },
          {
            text: t("auth.logout"),
            role: 'destructive',
            data: {
              action: 'delete',
            },
            handler: logout,
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