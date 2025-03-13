// src/i18n.ts
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      welcome: "Welcome to Workouts!",
      switch_language: "Switch Language",
    },
  },
  ar: {
    translation: {
      welcome: "مرحبًا بك في التدريبات!",
      switch_language: "تغيير اللغة",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

export default i18n;
