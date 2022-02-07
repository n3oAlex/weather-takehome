import { AlertsContext, AlertsContextProvider } from "../../contexts/AlertsContext";
import { DefaultTheme } from "@mui/private-theming";
import { IconButton, Stack } from "@mui/material";
import { NavItem } from "./NavItem";
import { TranslationSwitch } from "../TranslationSwitch";
import { WeatherContext } from "../../contexts/WeatherContext";
import { defineTranslations } from "../../translations/translate";
import { styled } from "@mui/material/styles";
import { useContext } from "react";
import { useLocalStorage } from "../../hooks/useLocalStorageHook";
import { withCtxProviders } from "../../utils/withCtxProviders";
import AlignVerticalBottomIcon from "@mui/icons-material/AlignVerticalBottom";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import DataObjectIcon from "@mui/icons-material/DataObject";
import DeviceThermostatIcon from "@mui/icons-material/DeviceThermostat";
import HomeIcon from "@mui/icons-material/Home";
import Image from "next/image";
import LogoutIcon from "@mui/icons-material/Logout";
import SettingsIcon from "@mui/icons-material/Settings";
import TableRowsIcon from "@mui/icons-material/TableRows";
import TranslateIcon from "@mui/icons-material/Translate";

const t = defineTranslations({
  home: {
    en: "Home",
    cs: "Domů",
  },
  temperature7day: {
    en: "7-day Temperature",
    cs: "7-denní Teploty",
  },
  highLow7day: {
    en: "7-day High/Low",
    cs: "7-denní High/Low",
  },
  temperature48hour: {
    en: "48-hour Temperature",
    cs: "48-hodin Teploty",
  },
  weatherDetails: {
    en: "Weather Details",
    cs: "Detailní info",
  },
  detailedData: {
    en: "Detailed Data",
    cs: "Detailní data",
  },
  settings: {
    en: "Settings",
    cs: "Nastavení",
  },
  logout: {
    en: "Logout",
    cs: "Odhlásit",
  },
  notImplemented: {
    en: "This functionality has not yet been implemented.",
    cs: "Tato funkcionality zatím nebyla implementována.",
  },
});

const Stack_navbar = styled(Stack)((p) => ({
  transition: "400ms ease",
  height: "100vh",
  backgroundColor: "#212635",
  padding: p.theme.spacing(1),
  position: "sticky",
  left: "0",
  top: "0",
  zIndex: 2,
}));

type IconButton_navBarToggleProps = {
  theme?: DefaultTheme;
  collapsed: boolean;
};

const IconButton_navBarToggle = styled(IconButton, {
  shouldForwardProp: (p) => p !== "collapsed",
})<IconButton_navBarToggleProps>((p) => ({
  width: p.theme.spacing(5),
  alignSelf: "end",
  marginLeft: p.collapsed ? 0 : p.theme.spacing(1),
}));

const Stack_navBarToggle = styled(Stack)((p) => ({
  width: "100%",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: p.theme.spacing(2),
}));

const _NavBar = () => {
  const { viewToken, setViewToken } = useContext(WeatherContext);
  const [collapsed, setCollapsed] = useLocalStorage("navbar-collapsed", true);
  const { showAlert } = useContext(AlertsContext);

  return (
    <Stack_navbar width={collapsed ? "3.5rem" : "15rem"}>
      <Stack_navBarToggle direction="row">
        <Image loading="lazy" width="160" height="32" src={"/logo.svg"} alt="logo" />
        <IconButton_navBarToggle
          color="primary"
          onClick={() => setCollapsed((p) => !p)}
          collapsed={collapsed}
        >
          {collapsed ? <ArrowForwardIosIcon /> : <ArrowBackIosNewIcon />}
        </IconButton_navBarToggle>
      </Stack_navBarToggle>
      <NavItem
        collapsed={collapsed}
        icon={HomeIcon}
        onClick={() => setViewToken(0)}
        active={viewToken === 0}
      >
        {t.translate.home()}
      </NavItem>
      <NavItem
        collapsed={collapsed}
        icon={DeviceThermostatIcon}
        onClick={() => setViewToken(1)}
        active={viewToken === 1}
      >
        {t.translate.temperature7day()}
      </NavItem>
      <NavItem
        collapsed={collapsed}
        icon={AlignVerticalBottomIcon}
        onClick={() => setViewToken(2)}
        active={viewToken === 2}
      >
        {t.translate.highLow7day()}
      </NavItem>
      <NavItem
        collapsed={collapsed}
        icon={DeviceThermostatIcon}
        onClick={() => setViewToken(3)}
        active={viewToken === 3}
      >
        {t.translate.temperature48hour()}
      </NavItem>
      <NavItem
        collapsed={collapsed}
        icon={TableRowsIcon}
        onClick={() => setViewToken(4)}
        active={viewToken === 4}
      >
        {t.translate.weatherDetails()}
      </NavItem>
      <NavItem
        collapsed={collapsed}
        icon={DataObjectIcon}
        onClick={() => setViewToken(5)}
        active={viewToken === 5}
      >
        {t.translate.detailedData()}
      </NavItem>
      <Stack mt="auto">
        <NavItem
          collapsed={collapsed}
          icon={TranslateIcon}
          onClick={() => {
            if (collapsed) setCollapsed(false);
          }}
        >
          <TranslationSwitch />
        </NavItem>
        <NavItem
          collapsed={collapsed}
          icon={SettingsIcon}
          onClick={() => {
            showAlert("info", t.translate.notImplemented());
          }}
        >
          {t.translate.settings()}
        </NavItem>
        <NavItem
          collapsed={collapsed}
          icon={LogoutIcon}
          onClick={() => {
            showAlert("info", t.translate.notImplemented());
          }}
        >
          {t.translate.logout()}
        </NavItem>
      </Stack>
    </Stack_navbar>
  );
};

const NavBar = withCtxProviders([AlertsContextProvider])(_NavBar);

export default NavBar;
