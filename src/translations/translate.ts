import { mapObjectValues } from "../utils/record";

// original author https://github.com/Svehla

export const LANGUAGES = Object.freeze({
  cs: "cs",
  en: "en",
});

export const LANGUAGES_LS_LABEL = "language";

export const LANGUAGES_FULL_NAME = Object.freeze({
  cs: "Čeština",
  en: "English",
});

export const LANGUAGES_SELECT_DISPLAY = Object.freeze({
  cs: "CZ",
  en: "EN",
});

export type LanguageOptions = keyof typeof LANGUAGES;

export const DEFAULT_LANGUAGE = "en" as LanguageOptions;

const globalMessages: Record<string, { cs: string; en: string }> = {};
/**
 * Match all variables wrapped with double curly bracket like:
 * {{variableName}}
 */
const VARIABLE_REGEX = /{{(\w+)}}/g;

type TranslateVariablesType = string | null | number | undefined;

/**
 * interpolate takes template and replace variables wrapped in {{VARIABLE_REGEX}}
 * null and undefined args values are resolved as empty empty string
 */
export const interpolate = (str: string, data?: Record<string, TranslateVariablesType>) =>
  //@ts-expect-error
  str.replace(VARIABLE_REGEX, (_match, content: string) => data[content]?.toString() ?? "");

export const defineTranslations = <T extends Record<string, { cs: string; en: string }>>(
  translations: T,
  translatePrefixNamespace = ""
) => {
  const language =
    typeof window !== "undefined"
      ? window.localStorage.getItem(LANGUAGES_LS_LABEL) || LANGUAGES.en
      : LANGUAGES.en;
  // register translations into global messages object
  Object.entries(translations).forEach(([k, v]) => {
    const key = [translatePrefixNamespace, k].join(",");
    const oldValue = globalMessages[key];
    if (oldValue) {
      throw new Error(`duplicated translation: { ${key} : ${oldValue} }`);
    }
    globalMessages[key] = v;
  });

  return {
    translate: mapObjectValues(
      (_val, id) =>
        (...args: any[]) => {
          const messageFullId = [translatePrefixNamespace, id].join(",");
          const message = globalMessages[messageFullId][language];
          const data = args[0];
          if (!message) throw new Error(`message ${id} is not implemented`);
          return interpolate(message, data);
        },
      translations
    ) as { [K in keyof T]: (variables?: Record<string, TranslateVariablesType>) => string },
  };
};
