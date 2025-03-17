import {
  startRegistration,
  startAuthentication,
} from "@simplewebauthn/browser";
import QRCode from "qrcode";
import { api } from "..";

export const webAuthnService = {
  register: async () => {
    const { data: options } = await api.get("/auth/webauthn/register");
    const credential = await startRegistration(options);
    return api.post("/auth/webauthn/register", credential);
  },

  login: async () => {
    const { data: options } = await api.get("/auth/webauthn/login");
    const credential = await startAuthentication(options);
    return api.post("/auth/webauthn/login", credential);
  },
};

export const qrService = {
  generateQR: async (userId: string) => {
    const { data: token } = await api.post("/auth/qr/generate", { userId });
    return QRCode.toDataURL(token);
  },

  verifyQR: async (token: string) => {
    return api.post("/auth/qr/verify", { token });
  },
};
