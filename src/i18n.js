import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";
import English from "../public/locales/en/translation.json";
import Ukrainian from "../public/locales/uk/translation.json";
import Polish from "../public/locales/pl/translation.json";
import * as dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    fallbackLng: "en",
    resources: {
      en: {
        translation: English,
      },
      uk: {
        translation: Ukrainian,
      },
      pl: {
        translation: Polish,
      },
    },
  });

 dayjs.extend(localizedFormat);

export default i18n;
