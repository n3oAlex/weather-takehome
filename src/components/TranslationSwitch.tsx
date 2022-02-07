import {
  LANGUAGES,
  LANGUAGES_FULL_NAME,
  LANGUAGES_LS_LABEL,
  LanguageOptions,
} from "../translations/translate";
import { MenuItem, Select, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useRouter } from "next/router";
import { useState } from "react";
import dynamic from "next/dynamic";

const MenuItem_Translation = styled(MenuItem)((p) => ({
  color: p.theme.palette.primary.main,
  "&.Mui-selected": {
    fontWeight: p.theme.typography.fontWeightBold,
    borderLeft: "none",
  },
}));

const Select_Languages = styled(Select)((p) => ({
  paddingRight: p.theme.spacing(1),
  "&:before": {
    border: "none !important",
  },
  "& svg": {
    display: "none",
  },
  "&.Mui-focused .MuiSelect-select": {
    backgroundColor: "transparent",
  },
  "&:hover svg, &.Mui-focused svg": {
    display: "block",
    fill: p.theme.palette.primary.main,
  },
}));

const Typography_LanguageSelect = styled(Typography)((p) => ({
  color: p.theme.palette.primary.main,
}));

const _TranslationSwitch = () => {
  const router = useRouter();

  const [language, setLanguage] = useState(
    typeof window !== "undefined"
      ? window.localStorage.getItem(LANGUAGES_LS_LABEL) || LANGUAGES.en
      : LANGUAGES.en
  );

  const changeLanguageLocally = (language: LanguageOptions) => {
    if (typeof window !== "undefined") window.localStorage.setItem(LANGUAGES_LS_LABEL, language);
  };

  const handleLanguageChange = async (e) => {
    setLanguage(e.target.value);
    changeLanguageLocally(e.target.value);
    router.reload();
  };

  return (
    <Select_Languages
      color="primary"
      disableUnderline
      value={language}
      onChange={handleLanguageChange}
      variant="standard"
      MenuProps={{
        sx: {
          "& ul": {
            background: "#121728",
          },
        },
      }}
      renderValue={(s) => (
        <Typography_LanguageSelect>{LANGUAGES_FULL_NAME[s as string]}</Typography_LanguageSelect>
      )}
    >
      <MenuItem_Translation value={LANGUAGES.en}>
        {LANGUAGES_FULL_NAME[LANGUAGES.en]}
      </MenuItem_Translation>
      <MenuItem_Translation value={LANGUAGES.cs}>
        {LANGUAGES_FULL_NAME[LANGUAGES.cs]}
      </MenuItem_Translation>
    </Select_Languages>
  );
};

export const TranslationSwitch = dynamic(() => Promise.resolve(_TranslationSwitch), { ssr: false });
